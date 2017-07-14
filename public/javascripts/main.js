var ViewModel = function () {
  console.log("cargo correctamente");
  var main = this;
  var categoriaUri = "http://localhost:3000/api/categoria/";
  var contactoUri = "http://localhost:3000/api/contacto/";
  main.contactoCargado = ko.observable();
  main.categorias = ko.observableArray([]);
  main.contactos = ko.observableArray([]);

  main.categoriaNueva = {
    nombre: ko.observable()
  }

  main.contactoNuevo = {
    nombre: ko.observable(),
    apellido: ko.observable(),
    direccion: ko.observable(),
    telefono: ko.observable(),
    correo: ko.observable(),
    idCategoria: ko.observable()
  }


  main.cargarContacto = function (item) {
       console.log(JSON.stringify(item));
       main.contactoCargado(item);
   }
/*CRUD CATEGORIA*/
  main.agregarCategoria = function (formElement) {
        var nuevaCategoria = {
            nombre: main.categoriaNueva.nombre(),
          }
        ajaxHelper(categoriaUri, 'POST', nuevaCategoria).done(function (data) {
            main.getAllCategorias();
        });

    }



    main.getAllCategorias = function () {
      ajaxHelper(categoriaUri, 'GET').done(function(data){
        main.categorias(data);
      });
    }

/*CRUD CONTACTO*/
main.agregarContacto = function (formElement) {
      var nuevoContacto = {
          nombre: main.contactoNuevo.nombre(),
          apellido: main.contactoNuevo.apellido(),
          direccion: main.contactoNuevo.direccion(),
          telefono: main.contactoNuevo.telefono(),
          correo: main.contactoNuevo.correo(),
          idCategoria: main.contactoNuevo.idCategoria()
        }
      ajaxHelper(contactoUri, 'POST', nuevoContacto).done(function (data) {
          main.getAllContactos();
      });

  }

  main.editar = function (formElement) {
      var editarContacto = {
          idContacto: main.cargarContacto().idContacto,
          nombre: main.cargarContacto().nombre,
          apellido: main.cargarContacto().apellido,
          direccion: main.cargarContacto().direccion,
          telefono: main.cargarContacto().telefono,
          correo: main.cargarContacto().correo(),
          idCategoria: main.cargarContacto().idCategoria
      }
      ajaxHelper(contactoUri + editarContacto.idContacto, 'PUT', editarContacto)
          .done(function (item) {
              main.getAllContactos();
          });
  }

  main.getAllContactos = function () {
    ajaxHelper(contactoUri, 'GET').done(function(data){
      main.contactos(data);
    });
  }


  function ajaxHelper(uri, method, data) {
    return $.ajax({
      url: uri,
      type: method,
      dataType: 'json',
      contentType: 'application/json',
      data: data ? JSON.stringify(data) : null
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown);
    });
  }


  main.getAllCategorias();
  main.getAllContactos();
}

var UsuarioCliente = {
    init: function () {
        $(document).ready(function () {
            $("#formularioUsuario").hide();
            console.log("Pagina Cargada!");
        });
    },
    mostrarForm: function () {
        $("#tablaUsuario").hide(1000);
        $("#formularioUsuario").show(1000);
    }
}


var EditTabla = {

    mostrarForm: function () {
        $("#tablaUsuario").show(1000);
        $("#formularioUsuario").hide(1000);
    }
}

$(document).ready(function () {
  console.log("Se cargo la pagina correctamente");
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);
});
