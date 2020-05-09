class CustomError extends Error {

  constructor(message, fileName, originalError) {
    super(message)
    this.fileName = fileName;
    this.originalError = originalError;

  }

  toString() {
    const originalError = this.originalError ?
      `original error: {
    ${this.originalError}
  }` : "";
    return `${this.name} 
  happened in file: ${this.fileName}
  error: ${this.message}
  stack: {
    ${this.stack}
  }
  ${originalError}`
  }

}

module.exports = CustomError;