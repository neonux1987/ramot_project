class CustomError extends Error {

  constructor(message, fileName, originalError) {
    super(message)
    this.fileName = fileName;
    this.orginalError = originalError;
  }

  toString = () => {
    const printStack = this.originalError ? this.originalError : this.stack;
    return `${this.name} 
  happened in file: ${this.fileName}
  error: ${this.message}
  stack: {
    ${printStack}
  }`
  }

}

module.exports = CustomError;