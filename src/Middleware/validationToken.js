const validation = validator => async (req, res, next) => {
  try {
    if (validator) {
      await validator.validateAsync(req.body);
    }
    return next();
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = validation;
