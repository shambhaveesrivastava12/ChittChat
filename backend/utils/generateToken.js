import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });

  // Detect environment
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,                           // JS can’t access the cookie
    secure: isProduction,                     // true only on HTTPS
    sameSite: isProduction ? "none" : "lax",  // allow cross-origin only in prod
    maxAge: 365 * 24 * 60 * 60 * 1000,        // 1 year
    // ↓↓↓ Optional: add Partitioned attribute for Chrome future-proofing
    partitioned: true,
  });

  return token;
};

export default generateTokenAndSetCookie;
