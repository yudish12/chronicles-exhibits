import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET; // Your secret key

if (!SECRET_KEY) {
  throw new Error(
    "Please define the JWT_SECRET environment variable in .env.local"
  );
}

/**
 * Sign a JWT
 * @param payload - The payload to include in the JWT
 * @param expiresIn - The expiration time (e.g., "1h" for 1 hour)
 * @returns The signed JWT
 */
export const signJWT = (payload, expiresIn = "2d") => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

/**
 * Verify a JWT
 * @param token - The JWT to verify
 * @returns The decoded payload
 */
export const verifyJWT = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
