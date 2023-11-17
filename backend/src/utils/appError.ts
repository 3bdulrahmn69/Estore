export default class AppError extends Error {
  statusCode;
  status;
  isOpertional;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOpertional = true
    
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
