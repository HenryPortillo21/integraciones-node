require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());


/* ------------------------------------------------------- */
var port = process.env.PORT || 3000;
/*app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
 ------------------------------------------------------- */


app.listen(port, () => {
  console.log("The server started on port 3000 !!!!!");
});


app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Bienvenidos a mi Iguana SV <br><br>🦎</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password,
      cuerpo: details.cuerpo,
      tipoMail: details.tipo,
      telefono: details.telefono
    }
  });

  if( this.tipo === 'informacion') {

    let mailOptions = {
      from: '"Mi Iguana SV Información"<example.gimail.com>', // sender address
      to: `${user.email},${'miiguanasv@gmail.com'}`, // list of receivers
      subject: "Requiero información sobre Mi Iguana SV", // Subject line
      html: `${user.cuerpo}</h4>`
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    callback(info);
  }

  else {

    let mailOptions = {
      from: '"Mi Iguana SV"<example.gimail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Bienvendio a nuestro directorio de Emprendedores", // Subject line
      html: `<h1>Hola ${user.name}</h1><br>
      <h4>Gracias por unirte a nuestra gran red de emprendedores tus credenciales son las siguientes </h4>`
    };

  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    callback(info);
  }

  client.messages.create({
    to: `+503${user.telefono}`,
    from: +19145561919,
    body: `Hola ${user.name}, Bienvenido a nuestro directorio de Emprendedores`
  }).then(message => console.log(message.sid));

  
}

// main().catch(console.error);





