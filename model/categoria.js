var database = require('./database');
var categoria = {};

categoria.selectAll = function(cualquierFuncion){
    if(database){
        database.query("SELECT * FROM Categoria",
                      function(error, resultados){
           if(error){
               throw error;
           } else{
               cualquierFuncion(null, resultados);
           }
        });
    }
}

categoria.select = function(idCategoria){
    if(database){
        database.query("SELECT * FROM Categoria WHERE idCategoria = ?", idCategoria,
                      function(error, resultado){
           if(error){
               throw error;
           } else{
               cualquierFuncion(null, resultado);
           }
        });
    }
}

categoria.insert = function(data, callbalck){
  if (database) {
    database.query("CALL addCategoria(?)", [data.nombre], function(error, resultado){
      if (error) {
        throw error;
      }else {
        callbalck(null, {"insertId": resultado.insertId});
      }
    });
  }
}




module.exports = categoria;
