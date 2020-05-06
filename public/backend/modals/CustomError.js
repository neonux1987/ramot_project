class CustomError extends Error {

  constructor(fileName, error) {
    if (!fileName && !error && !(error instanceof Error))
      throw new Error("you must pass fileName as first argument and an Error object as second");

    this.message = error.message;
    this.stack = error.stack;
    this.fileName = fileName;
    this.lineNumber = error.lineNumber;
  }

  toString() {
    return `{
      error message: ${this.message}
      happened at line: ${this.lineNumber}
      in file: ${this.fileName}
      full stack: ${this.stack}
    }
    `
  }

}

module.exports = CustomError;