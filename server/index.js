const express = require('express')
const app = express()
const mysql=require('mysql')
const cors = require("cors");
const PORT = 3001
const {encrypt,decrypt} = require("./EncryptionHandler")

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "passwordmanager",
});
console.log(decrypt({
    password:"b6574faa",
    iv:"95f502b4b9bb0a18821b217f298bb292",
  }))
app.post("/addpassword",(req,res)=>{
    console.log(74)
    const {password , title}=req.body;
    const hashedPassword= encrypt(password);
    console.log(hashedPassword);
    db.query(
        "INSERT INTO passwords (password,title,iv) VALUES (?,?,?)",
        [hashedPassword.password, title, hashedPassword.iv],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Success");
            }
        }
    )
})

app.get("/showpasswords", (req, res) => {
    db.query("SELECT * FROM passwords;", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/decryptpassword", (req, res) => {
    res.send(decrypt(req.body));
});

app.get('/',(req,res)=>{
    res.send("hello wworld")
})
app.listen(PORT, ()=>{
    console.log("server is running")
})