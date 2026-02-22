import UserProfile from "../models/UserProfile.js";

export const getProfile = async (req, res) => {
  try {
    // GUARD: Prevent 500 error if middleware fails to provide user data
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Not authorized, missing user session." });
    }

    let profile = await UserProfile.findOne({
      email: req.user.email,
    });

    // auto create profile first time
    if (!profile) {
      profile = await UserProfile.create({
        email: req.user.email,
        username: req.user.name || req.user.email.split("@")[0],
      });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    // GUARD: Ensure user is authenticated before updating
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Not authorized to update profile." });
    }

    const updated = await UserProfile.findOneAndUpdate(
      { email: req.user.email },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};