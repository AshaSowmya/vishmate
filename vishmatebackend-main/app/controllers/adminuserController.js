const Adminuser = require("../models/Adminuser");

exports.Adminuser = (req, res) => {
    const newAdminuser = new Adminuser({
        user_name: req.body.user_name,
        admin_email: req.body.admin_email,
        password: req.body.password,
        category: req.body.category,
    });

    Adminuser.createAdminuser(newAdminuser, (err, adminuserId) => {
        if (err) {
            return res.status(500).json({ message: "Failed to create user" });
        }
        res.status(201).json({ message: "User created successfully", adminuserId });
    });
};

exports.getAllAdminuser = (req, res) => {
    Adminuser.getAllAdminuser((err, adminusers) => {
        if (err) {
            return res.status(500).json({ message: "Failed to retrieve users" });
        }
        res.status(200).json({ adminusers });
    });
};

exports.updateAdminuser = async (req, res) => {
    const adminuserId = req.params.adminuserId;
    const { user_name, admin_email, password, category } = req.body;

    try {
        let hashedPassword;
        if (password) {
            hashedPassword = await bcryptjs.hash(password, 10);
        }

        const updatedData = {
            user_name: user_name || null,
            admin_email: admin_email || null,
            password: hashedPassword || null,
            category: category || null
        };

        await Adminuser.updateAdminuser(adminuserId, updatedData);
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Failed to update user: ", error);
        res.status(500).json({ message: "Failed to update user" });
    }
};

exports.deleteAdminuser = (req, res) => {
    const AdminuserId = req.params.adminuserId;
  
    Adminuser.deleteAdminuserById(AdminuserId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Adminuser with id ${AdminuserId}.`,
          });
        } else {
          res.status(500).send({
            message: `Could not delete Adminuser with id ${AdminuserId}`,
          });
        }
      } else res.send({ message: `Adminuser was deleted successfully!` });
    });
};
