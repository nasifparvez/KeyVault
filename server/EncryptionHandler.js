const crypto = require('crypto')
const secret = 'namenamenamenamenamenamenamename'

const encrypt = (password)=>{
    //IV or Initialization Vector serves as an identified for encryption
    const iv = Buffer.from(crypto.randomBytes(16))

    //Cipher decides how the algorithm is encrypted
    const cipher = crypto.createCipheriv('aes-256-ctr',Buffer.from(secret), iv)

    //Result of Encryption
    const encryptedPassword = Buffer.concat([
        cipher.update(password),
        cipher.final(),
    ]);


    //Returns as hex value for added security
    return {
        iv: iv.toString("hex"),
        password: encryptedPassword.toString("hex"),
      };

}

const decrypt = (encryptedPassword)=>{
    const decipher = crypto.createDecipheriv(
        "aes-256-ctr",
        Buffer.from(secret),
        Buffer.from(encryption.iv, "hex")
      );
    
      const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.password, "hex")),
        decipher.final(),
      ]);
    
      return decryptedPassword.toString();
}

module.exports={encrypt,decrypt}