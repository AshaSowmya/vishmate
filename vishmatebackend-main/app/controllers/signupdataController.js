const Signupdata = require('../models/Signupdata');

exports.Signupdata = (req, res) => {
  const newSignupdata = new Signupdata({
    name: req.body.name,
    mobilenumber: req.body.mobilenumber,
    email: req.body.email,
  });


  Signupdata.createSignupdata(newSignupdata, (err, signupdataId) => {
    if (err) {
      console.error("Failed to create signupdata:", err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: "Failed to create signupdata" });
    }
    res.status(201).json({ message: "signupdata created successfully", signupdataId });
  });
};

exports.getAllSignupdata = (req, res) => {
  Signupdata.getAllSignupdata((err, signupdata) => {
    if (err) {
      console.error('Error retrieving signupdata:', err);
      return res.status(500).json({ error: 'Failed to retrieve signupdata' });
    }
    res.status(200).json({ signupdata });
  });
};

exports.updateSignupdata = (req, res) => {
  const signupdataId = req.params.id;
  const updatedSignupdata = req.body;

  // Remove the room_id property from the updatedCustomer object
  delete updatedSignupdata.signupdata_id ;

  Signupdata.updateSignupdataById(signupdataId, updatedSignupdata, (err, data) => {
    if (err) {
      console.error("Error updating Signupdata:", err);
      return res.status(500).json({ error: "Failed to update Signupdata" });
    }

    res.status(200).json({ message: "Signupdata updated successfully" });
  });
};


exports.deleteSignupdata = (req, res) => {
  const signupdataId = req.params.id;

  Signupdata.deleteSignupdataById(signupdataId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Signupdata with id ${signupdataId}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete Signupdata with id ${signupdataId}`,
        });
      }
    } else res.send({ message: `Signupdata was deleted successfully!` });
  });
};
