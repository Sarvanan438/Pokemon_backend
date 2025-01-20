import  jwt from 'jsonwebtoken';
import TokenExpired from '../../errors/TokenExpired';
import InvalidToken from '../../errors/InvalidToken';

class JWTService {
    private secret: string;
    private expiry: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || 'defaultSecret';
        this.expiry = process.env.JWT_EXPIRY || '1h';
    }

    // Function to encrypt user information
    public sign(payload: object): string {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiry });
    }

    // Function to verify the token
    public verify(token: string): object | string {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            throw new InvalidToken();
        }
    }

    // Function to resign a token with extended expiry
    public resign(token: string, newExpiry: string): string {
        try {
            const payload = jwt.verify(token, this.secret) as object;
            return jwt.sign(payload, this.secret, { expiresIn: newExpiry });
        } catch (error) {
            throw new InvalidToken();
        }
    }
}

export default new JWTService();