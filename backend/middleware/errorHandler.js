const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'خطای سرور رخ داد'
  });
};

module.exports = errorHandler;
