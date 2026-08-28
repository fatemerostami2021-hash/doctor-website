const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ published: true }).sort({ order: 1 });
    res.json(services);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, published: true });
    if (!service) return res.status(404).json({ message: 'Not found' });
    res.json(service);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createService = async (req, res) => {
  try { const service = await Service.create(req.body); res.status(201).json(service); }
  catch (error) { res.status(400).json({ message: error.message }); }
};

exports.updateService = async (req, res) => {
  try { const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(service); }
  catch (error) { res.status(400).json({ message: error.message }); }
};

exports.deleteService = async (req, res) => {
  try { await Service.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (error) { res.status(500).json({ message: error.message }); }
};
