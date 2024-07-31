const crypto = require("crypto");
const symkey = "spvrpptppgppwppeppyprpppxxxppppg";

const encrypt = (password) =>{
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv("aes-256-gcm",Buffer.from(symkey),iv);

    const encryptedPassword = Buffer.concat([
        cipher.update(password),
        cipher.final(),
    ])
    return {
        iv: iv.toString("hex"),
        password: encryptedPassword.toString("hex"),
    }
}

const decrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv(
        "aes-256-gcm",
        Buffer.from(symkey),
        Buffer.from(encrypted.iv,"hex")
    );
    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encrypted.password, "hex")),
        decipher.final(),
    ]
    )

    return decryptedPassword.toString();
}

module.exports = {encrypt,decrypt};
