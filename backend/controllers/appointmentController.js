const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try { const appointment = await Appointment.create(req.body); res.status(201).json(appointment); }
  catch (error) { res.status(400).json({ message: error.message }); }
};

exports.getAppointments = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) query.status = status;
    const appointments = await Appointment.find(query).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updateStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(appointment);
  } catch (error) { res.status(400).json({ message: error.message }); }
};
