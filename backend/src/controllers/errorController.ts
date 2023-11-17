export = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === "development") {
        res.status(err.statusCode).json({ status: false, message: err.message, stack: err.stack })
    } else {
      res.status(err.statusCode).json({ status: false, message: err.message})
    }
}