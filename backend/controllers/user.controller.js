import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		// Load current user's block list to filter
		const me = await User.findById(loggedInUserId).select("blockedUsers");

		// getting the limit and cursor from the req.query object if they are defined the defaults for limit and cursor are 20 and null respectively
		const limit = parseInt(req.query.limit) || 20
		const cursor = req.query.cursor ? new mongoose.Types.ObjectId(req.query.cursor) : null;


		// build filter using $and to compose conditions
		const andFilter = [
			{ _id: { $ne: loggedInUserId } },
			{ blockedUsers: { $ne: loggedInUserId } },
		];
		if (me?.blockedUsers?.length) {
			andFilter.push({ _id: { $nin: me.blockedUsers } });
		}
		if (cursor) {
			andFilter.push({ _id: { $gt: cursor } });
		}
		const filter = { $and: andFilter };

		const filteredUsers = await User.find(filter)
										.select("-password")
										.sort({_id:1})
										.limit(limit+1)// an extra user is fetched to check if more users are available to be fetched or if this is the last batch of avaiable users

		const hasNextPage = filteredUsers.length > limit 
		const slicedusers = hasNextPage ? filteredUsers.slice(0,-1) : filteredUsers // remove the extra fetched user

		// Normalize/augment returned users so frontend always has fullName and profilePic
		const users = slicedusers.map((u) => {
			const user = u.toObject();
			// Prefer existing fullName, then name, then fallback to part of the email
			user.fullName = user.fullName || user.name || (user.email ? user.email.split("@")[0] : "User");

			// If profilePic missing or empty string, provide a generated avatar (UI Avatars)
			if (!user.profilePic) {
				const initials = encodeURIComponent(user.fullName);
				user.profilePic = `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff&rounded=true&size=128`;
			}

			return user;
		});

		// updated the response structure
		res.status(200).json({
			users,
			nextCursor: hasNextPage ? slicedusers[slicedusers.length - 1]._id : null,
			hasNextPage
		});
		
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const getProfile = async (req, res) => {
  try {
    // req.user is populated by authMiddleware
    const { fullName, email, username, profilePic } = req.user;

	console.log(fullName)

    res.status(200).json({
      name: fullName,
      email,
      avatar: profilePic,
      username
    });
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT in protectRoute
    const { name, bio, avatar } = req.body;

    // Validate at least one field
    if (!name && !bio && !avatar) {
      return res.status(400).json({ message: "At least one field is required." });
    }

    // Only allow updating specific fields
    const updateData = {};
    if (name) updateData.fullName = name;
    if (bio) updateData.bio = bio;
    if (avatar) updateData.profilePic = avatar;

    // Update in DB and return the updated document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password -__v'); // Exclude sensitive fields

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Block a user
export const blockUser = async (req, res) => {
	try {
		const blockerId = req.user._id;
		const { id: blockeeId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(blockeeId)) {
			return res.status(400).json({ error: "Invalid user id" });
		}
		if (String(blockerId) === String(blockeeId)) {
			return res.status(400).json({ error: "You cannot block yourself" });
		}

		const blockee = await User.findById(blockeeId).select("_id");
		if (!blockee) return res.status(404).json({ error: "User not found" });

		await User.findByIdAndUpdate(
			blockerId,
			{ $addToSet: { blockedUsers: blockeeId } },
			{ new: true }
		);

		return res.status(200).json({ message: "User blocked" });
	} catch (error) {
		console.error("Error blocking user:", error.message);
		return res.status(500).json({ error: "Internal server error" });
	}
};

// Unblock a user
export const unblockUser = async (req, res) => {
	try {
		const blockerId = req.user._id;
		const { id: blockeeId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(blockeeId)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		await User.findByIdAndUpdate(
			blockerId,
			{ $pull: { blockedUsers: blockeeId } },
			{ new: true }
		);

		return res.status(200).json({ message: "User unblocked" });
	} catch (error) {
		console.error("Error unblocking user:", error.message);
		return res.status(500).json({ error: "Internal server error" });
	}
};

// List all blocked users
export const getBlockedUsers = async (req, res) => {
	try {
		const me = await User.findById(req.user._id).populate({
			path: "blockedUsers",
			select: "fullName username email profilePic",
		});
		const users = (me?.blockedUsers || []).map((u) => ({
			_id: u._id,
			fullName: u.fullName,
			username: u.username,
			email: u.email,
			profilePic: u.profilePic,
		}));
		return res.status(200).json({ users });
	} catch (error) {
		console.error("Error getting blocked users:", error.message);
		return res.status(500).json({ error: "Internal server error" });
	}
};
