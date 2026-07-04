const nodemailer = require("nodemailer");
const fs = require("fs");

const hoy = new Date();
const mes = hoy.getMonth() + 1;
const dia = hoy.getDate();

const data = JSON.parse(fs.readFileSync("cumpleanos.json"));

const hoyCumples = data.filter(p => p.mes === mes && p.dia === dia);

if (hoyCumples.length === 0) {
  console.log("No hay cumpleaños hoy");
  process.exit(0);
}

const lista = hoyCumples.map(p => p.nombre).join(", ");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: "gregoria.mendoza.r28@gmail.com",
  subject: "🎉 Cumpleaños del día",
  text: `Hoy están de cumpleaños: ${lista}`
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Email enviado:", info.response);
  }
});
