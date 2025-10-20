import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { welcomeTemplate } from "../utils/mailTemplates/welcome_mail.js";
import { otpPasswordTemplate } from "../utils/mailTemplates/otpPassword_mail.js";
import { passwordChangedTemplate } from "../utils/mailTemplates/passwordChanged.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, email, password, confirmPassword, gender } =
			req.body;

		if (
			!fullName ||
			!username ||
			!email ||
			!password ||
			!confirmPassword ||
			!gender
		) {
			return res.status(400).json({ error: "All fields are required" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

    // Check for existing username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username)
        return res.status(400).json({ error: "Username already exists" });
      if (email && existingUser.email === email)
        return res.status(400).json({ error: "Email already exists" });
      return res.status(400).json({ error: "User already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      email,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT token here
      generateTokenAndSetCookie(newUser._id, res);
      const savedUser = await newUser.save();

      try {
        const sendmail = await sendEmail(
          newUser.email,
          "Welcome to ChitChat! 🎉",
          welcomeTemplate(newUser.fullName, newUser.username)
        );
      } catch (mailErr) {
        console.error("Email send failed:", mailErr.message);
      }

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ... the rest of the file (login, requestOtp, etc.) remains the same
export const login = async (req, res) => {
	try {
		const { loginInputs, password } = req.body;
    const isEmail = loginInputs.includes("@")

		const user = await User.findOne(
      isEmail? {email: loginInputs} : {username: loginInputs}
    );
		const isPasswordCorrect = await bcrypt.compare(
			password,
			user?.password || ""
		);

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP and expiry (5 min)
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    // Send OTP email
    try {
      await sendEmail(
        email,
        "Your ChitChat OTP 🔑",
        otpPasswordTemplate(user.fullName, otp)
      );
    } catch (mailErr) {
      console.error("Email send failed:", mailErr.message);
    }

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Request OTP error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const resetPasswordWithOtp = async (req, res) => {
	try {
		const { email, otp, newPassword, confirmPassword } = req.body;

		if (newPassword !== confirmPassword) {
			return res.status(400).json({ error: "Passwords do not match" });
		}

    const user = await User.findOne({
      email,
      otp,
      otpExpire: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ error: "Invalid or expired OTP" });

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(newPassword, salt);
		user.otp = undefined;
		user.otpExpire = undefined;

		await user.save();

    // Send email
    try {
      await sendEmail(
        email,
        "Password Changed Successfully ✅",
        passwordChangedTemplate(user.fullName, "http://localhost:3000/login")
      );
    } catch (mailErr) {
      console.error("Email send failed:", mailErr.message);
    }

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password OTP error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};