var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('mensajes', { title: 'Mensajes' });
});

router.post('/', async (req, res, next) => {


  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'maralmer@gmail.com',
    subject: 'Contacto Web',
    html: nombre + "se contactó a través de la WEB y quiere más información a este correo: " + email + ". <br> Además hizo este comentario; " + mensaje + ". <br> su teléfono es: " + telefono
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('mensajes', {
    message: 'Mensaje enviado correctamente'
  });

});





module.exports = router;