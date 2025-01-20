class CustomError extends Error {
    errorType: string;

    constructor(errorType: string, message: string) {
        super(message);
        this.errorType = errorType;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;