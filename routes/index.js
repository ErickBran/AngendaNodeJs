var express = require('express');
var router = express.Router();
var categoria = require('../model/categoria')
var contacto = require('../model/contacto')
var Autenticacion = require("../helper/autenticacion")
var auth = new Autenticacion();
var lista = [
    {"nombre": "Javier"},
    {"nombre": "Hola"},
    {"nombre": "XD"}
];

/* GET home page. */
router.get('/', function(req, res, next) {
auth.autorizar(req);
res.render(auth.getPath() + 'index')
});

router.get('/cookie/clear', function(req, res) {
  res.clearCookie('nombre');
  res.clearCookie('idUsuario');
  res.end("se eliminaron las cookies");
});

router.get('/cookie/all', function(req, res) {
  res.status(200).send(req.cookies);
});

/*Categoria*/
router.get('/api/categoria/', function(rq, res){
  categoria.selectAll(function (error, resultados) {
    if (typeof resultados != undefined) {
      res.json(resultados);
    }else {
      res.json({"Mensaje": "No hay categorias"});
    }
  });
});

router.post('/api/categoria', function (req, res) {
var data = {
  idCategoria : null,
  nombre : req.body.nombre
}

  categoria.insert(data, function (err, resultado) {
    if (resultado && resultado.insertId > 0) {
      res.redirect('/api/categoria');
    }else {
      res.json({"Mensaje": "no se ingreso el categoria"});
    }
  });
});

/*Contacto*/
router.get('/api/contacto/', function(rq, res){
  contacto.selectAll(function (error, resultados) {
    if (typeof resultados != undefined) {
      res.json(resultados);
    }else {
      res.json({"Mensaje": "No hay Contacto"});
    }
  });
});

router.post('/api/contacto', function (req, res) {
var data = {
  idContacto : null,
  nombre : req.body.nombre,
  apellido : req.body.apellido,
  direccion : req.body.direccion,
  telefono : req.body.telefono,
  correo : req.body.correo,
  idCategoria : req.body.idCategoria
}

  contacto.insert(data, function (err, resultado) {
    if (resultado && resultado.insertId > 0) {
      res.redirect('/api/contacto');
    }else {
      res.json({"Mensaje": "no se ingreso el Contacto"});
    }
  });
});


router.put('/api/contacto/:idContacto', function(req, res) {
  var idContacto = req.params.idContacto;
  var data = {
    idContacto : req.body.idContacto,
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    direccion : req.body.direccion,
    telefono : req.body.telefono,
    correo : req.body.correo,
    idCategoria : req.body.idCategoria
  }

  if(idContacto === data.idContacto) {
    contacto.edit(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la Contacto"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.get('/autenticar', function(req, res, next) {
  res.render("default/autenticar",{title: "Autenticar"});
});

router.get('/registrar', function(req, res, next) {
  res.render("default/registrar",{title: "Registrar"});
});

router.get('/nombres', function(req, res) {
  res.render('lista', {lista});
});

router.post('/nombre/nuevo', function(req, res) {
  res.render('lista', {lista});
});

module.exports = router;
