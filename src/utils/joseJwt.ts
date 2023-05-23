// Import necessary functions and types from 'jose' library
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

/**
 * Function to sign a JWT.
 *
 * @param {string} payload - Payload to be included in the JWT.
 * @param {string} secret - Secret used to sign the JWT.
 * @return {Promise<string>} - Returns a promise which resolves to the signed JWT string.
 */
export async function sign(payload: string, secret: string): Promise<string> {
  const iat = Math.floor(Date.now() / 1000) // Issued at time
  const exp = iat + 60 * 60 // Expiration time is one hour later

  // Use SignJWT to construct the JWT with the payload, set the header, expiration time, issued at time,
  // not before time and sign it with the secret
  return new SignJWT({ payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret))
}

/**
 * Function to verify a JWT.
 *
 * @param {string} token - JWT to be verified.
 * @return {Promise<JWTPayload>} - Returns a promise which resolves to the payload of the JWT if verification is successful.
 * @throws {Error} If there is no JWT secret in environment variables.
 */
export async function verify(token: string): Promise<JWTPayload> {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No JWT secret seed - Check environment variables')
  }

  // Verify the token using jwtVerify, if successful the payload is returned
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET_SEED),
  )

  // Run some checks on the returned payload, perhaps you expect some specific values

  // If it's all good, return it, or perhaps just return a boolean
  return payload
}
