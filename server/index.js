const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3001;

const {encrypt,decrypt} = require('./EncryptionHandler')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "PasswordManager",
  });

  app.post("/storepassword", (req, res) => {
    const { password, passwordPlace } = req.body;
    const encryptedPass = encrypt(password);

    //SQL Insert Statement
    db.query(
      "INSERT INTO passwords (password, passwordplace, iv) VALUES (?,?,?)",
      [encryptedPass.password, passwordPlace, encryptedPass.iv],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Success");
        }
      }
    );
  });

  //Shows array of passwords made by the user
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
  

app.listen(PORT, () => {
    console.log("Server is running");
  });