import crypto from "crypto"

const algorithm = 'aes-256-ctr'; // Encryption algorithm
const secretKey = crypto.randomBytes(32); // Generate a 32-byte (256-bit) key
const iv = crypto.randomBytes(16); // Initialization vector

export const encrypt = (text:string) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  
    return {
      iv: iv.toString('hex'), // Convert the IV to a string
      content: encrypted.toString('hex') // Convert the encrypted text to a string
    };
}

export const decrypt = (hash:{iv: string, content: string}) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
  
    return decrypted.toString(); // Return the original text
}