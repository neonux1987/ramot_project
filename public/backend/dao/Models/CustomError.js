class CustomError extends Error {
  constructor(...args) {
    super(...args);
  }

  getMessage() {
    return super.message;
  }
}