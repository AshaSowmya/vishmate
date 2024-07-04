const Goldrate = require('../models/Goldrate');

exports.Goldrate = (req, res) => {
  const newGoldrate = new Goldrate({
    time: req.body.time,
    location: req.body.location,
    goldrate: req.body.goldrate,
    silverrate: req.body.silverrate,
  });

  Goldrate.createGoldrate(newGoldrate, (err, signupdata_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create goldrate' });
    }

    res.status(201).json({ message: 'goldrate created successfully', signupdata_id });
  });
};

exports.getAllGoldrate = (req, res) => {
  Goldrate.getAllGoldrate((err, goldrate) => {
    if (err) {
      console.error('Error retrieving Goldrate:', err);
      return res.status(500).json({ error: 'Failed to retrieve Goldrate' });
    }
    res.status(200).json({ goldrate });
  });
};


exports.updateGoldrate = (req, res) => {
  const goldrateId = req.params.id;
  const updatedGoldrate = req.body;
  // Remove the room_id property from the updatedCustomer object
  delete updatedGoldrate.goldrate_id ;
  Goldrate.updateGoldrateById(goldrateId, updatedGoldrate, (err, data) => {
    if (err) {
      console.error("Error updating Goldrate:", err);
      return res.status(500).json({ error: "Failed to update Goldrate" });
    }
    res.status(200).json({ message: "Goldrate updated successfully" });
  });
};


exports.deleteGoldrate = (req, res) => {
  const goldrateId = req.params.id;
  Goldrate.deleteGoldrateById(goldrateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Goldrate with id ${goldrateId}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete Goldrate with id ${goldrateId}`,
        });
      }
    } else res.send({ message: `Goldrate was deleted successfully!` });
  });
};