var Autenticacion = function(){
  var path = "default/";
  var acceso = false;
  var idUsuario = 0;

  this.getPath = function () {
    return path;
  }

  this.getAcceso = function(){
    return acceso;
  }

  this.getIdUsuario =function () {
    return idUsuario;
  }

  this.autorizar = function(peticion){
    var cookie = peticion.cookies;
    if(cookie.nombre !== undefined && cookie.idUsuario !== undefined){
      path = "dashboard/";
      acceso = true;
      idUsuario = cookie.idUsuario;
      console.log("Path: " + path);
      console.log("acceso: " + acceso);
      console.log("idUsuario: " + idUsuario);
    } else{
      path = "default/";
      acceso = false;
      idUsuario = 0;
    }
  }
}

module.exports = Autenticacion;
