class LoggerError {

  constructor({ name = "", message = "", fileName = "", originalError = "" }) {
    this.name = name;
    this.message = message;
    this.fileName = fileName;
    this.originalError = originalError;
  }

  toString() {
    return `
    Name: ${this.name}
    Filename: ${this.fileName}
    Message: ${this.message}
    Original error stack: ${this.originalError ? this.originalError.stack : ""}
    `
  }

}

module.exports = LoggerError;