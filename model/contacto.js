var database = require('./database');
var contacto = {};

contacto.selectAll = function(cualquierFuncion){
    if(database){
        database.query("SELECT * FROM Contacto",
                      function(error, resultados){
           if(error){
               throw error;
           } else{
               cualquierFuncion(null, resultados);
           }
        });
    }
}

contacto.select = function(idCategoria){
    if(database){
        database.query("SELECT * FROM Contacto WHERE idContacto = ?", idCategoria,
                      function(error, resultado){
           if(error){
               throw error;
           } else{
               cualquierFuncion(null, resultado);
           }
        });
    }
}

contacto.insert = function(data, callbalck){
  if (database) {
    database.query("CALL addContacto(?,?,?,?,?,?)", [data.nombre, data.apellido, data.direccion, data.telefono, data.correo, data.idCategoria], function(error, resultado){
      if (error) {
        throw error;
      }else {
        callbalck(null, {"insertId": resultado.insertId});
      }
    });
  }
}


contacto.edit = function(data, callbalck){
  if (database) {
    database.query("CALL editContacto(?,?,?,?,?,?,?)", [data.nombre, data.apellido, data.direccion, data.telefono, data.correo, data.idCategoria], function(error, resultado){
      if (error) {
        throw error;
      }else {
        callbalck(null, data);
      }
    });
  }
}



module.exports = contacto;
