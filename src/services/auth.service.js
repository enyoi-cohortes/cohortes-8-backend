import jwt from 'jsonwebtoken';
import { genSalt, hash, compare, } from 'bcrypt';

async function hashPassword(plain, length = 16) {
  const salt = await genSalt(length);
  const encrypt = await hash(plain, salt);
  return encrypt;
}

async function verifyPassword(plain, hash) {
  const valid = await compare(plain, hash);
  return valid;
}

async function jwtEncode(payload) {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(
    payload, 
    secretKey, 
    { 
      algorithm: 'HS256', 
    }
  );

  return token;
}

async function jwtVerify(encoded) {
  try {
    const secretKey = process.env.JWT_SECRET;
  
    const payload  = jwt.verify(encoded, secretKey);
    return payload;
  } catch (err) {
    return null;
  }
}

export {
  jwtEncode,
  jwtVerify,
  hashPassword,
  verifyPassword,
}