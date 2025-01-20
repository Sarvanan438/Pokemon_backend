import CustomError from './CustomError';
import { ILLEGALARGUMENTERROR } from '../constants/errors';

export class IllegalArgumentException extends CustomError {
     static type = ILLEGALARGUMENTERROR;

    constructor(message: string) {
        super(IllegalArgumentException.type,message);
        Object.setPrototypeOf(this, IllegalArgumentException.prototype);
    }
}