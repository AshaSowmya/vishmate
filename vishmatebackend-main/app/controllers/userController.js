const User = require("../models/User");

exports.signup = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password,
    privacy_status: req.body.privacy_status,
    select_plan: req.body.select_plan,
    plan_price: req.body.plan_price,
    subscription_id: req.body.subscription_id,
    userstatus: req.body.userstatus,
  });

 
  User.createUser(newUser, (err, userId) => {
    if (err) {
      console.error("Failed to create user:", err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: "Failed to create user" });
    }
    res.status(201).json({ message: "User created successfully", userId });
  });
};


exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ message: "Failed to retrieve users" });
    }
    res.status(200).json({ users });
  });
};

exports.getUserById = (req, res) => {
  const UserId = req.params.id;

  User.getUserById(UserId, (err, User) => {
    if (err) {
      console.error("Error retrieving User Id:", err);
      return res.status(500).json({  error: "Failed to retrieve User Id" });
    }

    if (!User || User.length === 0) {
      return res.status(404).json({ message: "User Id not found" });
    }
    
    res.status(200).json({ User });
  });
};

exports.updatePassword = async (req, res) => {
  const userId = req.params.userId; // Assuming the user ID is passed as a parameter
  const newPassword = req.body.newPassword;
  try {
    await User.updatePassword(userId, newPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Failed to update password: ", error);
    res.status(500).json({ message: "Failed to update password" });
  }
};
