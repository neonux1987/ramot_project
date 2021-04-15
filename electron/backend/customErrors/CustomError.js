class CustomError extends Error {

  constructor(message, fileName, originalError) {
    super(message)
    this.fileName = fileName;
    this.originalError = originalError;
  }

  toString() {
    const error = {};
    error.name = this.name;
    error.fileName = this.fileName;
    error.message = this.message;
    error.stack = this.stack;
    if (this.originalError)
      error.original = this.originalError.toString();

    return error;
  }

}

module.exports = CustomError;