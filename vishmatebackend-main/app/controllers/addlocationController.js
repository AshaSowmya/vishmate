const Addlocation = require('../models/Addlocation');

exports.Addlocation = (req, res) => {
  const newAddlocation = new Addlocation({
    addlocation: req.body.addlocation,
  });

  Addlocation.createAddlocation(newAddlocation, (err, addlocation_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create addlocation' });
    }
    res.status(201).json({ message: 'addlocation created successfully', addlocation_id });
  });
};

exports.getAllAddlocation = (req, res) => {
    Addlocation.getAllAddlocation((err, addlocation) => {
    if (err) {
      console.error('Error retrieving addlocation:', err);
      return res.status(500).json({ error: 'Failed to retrieve addlocation' });
    }
    res.status(200).json({ addlocation });
  });
};


exports.updateAddlocation = (req, res) => {
  const addlocationId = req.params.id;
  const updatedAddlocation = req.body;
  // Remove the addlocation_id property from the updatedlocation object
  delete updatedAddlocation.addlocation_id ;
  Addlocation.updateAddlocationById(addlocationId, updatedAddlocation, (err, data) => {
    if (err) {
      console.error("Error updating addlocation:", err);
      return res.status(500).json({ error: "Failed to update addlocation" });
    }
    res.status(200).json({ message: "addlocation updated successfully" });
  });
};


exports.deleteAddlocation = (req, res) => {
  const addlocationId = req.params.id;
  Addlocation.deleteAddlocationById(addlocationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found addlocation with id ${addlocationId}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete addlocation with id ${addlocationId}`,
        });
      }
    } else res.send({ message: `addlocation was deleted successfully!` });
  });
};