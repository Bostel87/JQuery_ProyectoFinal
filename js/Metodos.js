//Funcion para editar Estudiante ya Ingresado
    function editarEstudiante(codigo){
          var estudiante;
          for (var i = 0; i < localStorage.length; i++) {
            var clave = localStorage.key(i);
            if (clave == codigo) {
              estudiante = $.parseJSON(localStorage.getItem(clave));

              $("#Codigo").val(estudiante.codigo);
              $("#Nombre").val(estudiante.nombre);
              $("#Nota").val(estudiante.nota);

            }
        }
      }
//Funcion para listar a cada Estudiante que se va registrando
function listarEstudiantes(){
        var tabla = "";
        var parrafo1 = $("#p1");

        tabla += '<table border="1" class="table table-hover text-center">';
        tabla += '<tr class="text-center">';
        tabla += '<th>CODIGO</th>';
        tabla += '<th>NOMBRE</th>';
        tabla += '<th>NOTA</th>';
        tabla += '<th>EDITAR</th>';
        tabla += '<th>ESTADO</th>';
        tabla += '<th>ELIMINAR</th>';
        tabla += '</tr>';

        for (var i = 0; i < localStorage.length; i++) {
          var clave = localStorage.key(i);
          var estudiante = $.parseJSON(localStorage.getItem(clave));

          tabla += '<tr>';
          tabla += '<td>' + estudiante.codigo + '</td>';
          tabla += '<td>' + estudiante.nombre + '</td>';
          tabla += '<td>' + estudiante.nota + '</td>';
          // concatenando cuando le de click al boton dispare las funciones
          tabla += '<td><button onclick="editarEstudiante(\''+estudiante.codigo+'\');" class="btn btn-info">Editar</button></td>';
          tabla += '<td><button onclick="estudianteEstado(\''+estudiante.codigo+'\');" class="btn btn-info">Estado</button></td>';
          tabla += '<td><button onclick="eliminarEstudiante(\''+estudiante.codigo+'\');" class="btn btn-info">Eliminar</button></td>';
          tabla += '</tr>';
        }
        tabla += '</table>';
        $(parrafo1).html(tabla);
      }
//Funcion para Eliminar al estudiante segun su codigo
      function eliminarEstudiante(codigo){
        localStorage.removeItem(codigo);
        listarEstudiantes();
      }

//Funcion para saber si el estudiante esta aprobado o reprobado
      function estudianteEstado(codigo){
        var estado = "";
        var nota = 0;

        for (var i = 0; i < localStorage.length; i++) {
          var clave = localStorage.key(i);
          var estudiante = $.parseJSON(localStorage.getItem(clave));
          if (clave == codigo) {
            nota = parseFloat(estudiante.nota);

            if(nota >= 70 ){
              estado = "El Estudiante Esta Aprobado"
            }else{
              estado = "El Estudiante esta Reprobado"
            }
          }
        }
        alert(estado)
      }

//Funcion para restablecer las cajas y dejarlas vacias
      function restablecer(){
        $("#Codigo").val("");
        $("#Nombre").val("");
        $("#Nota").val("");
      }

      $(document).ready(function(){
//Boton para registrar al estudiante
        $("#botonRegistrar").click(function(){
          var codigo = $("#Codigo").val();
          var nombre = $("#Nombre").val();
          var nota = $("#Nota").val();
//Objeto de tipo Estudiante  con codigo, nombre y nota
          var estudiante = {
            codigo:codigo,
            nombre:nombre,
            nota:nota
          };

          localStorage.setItem(codigo,JSON.stringify(estudiante));

          listarEstudiantes();
          restablecer();
        });

//Boton para mostrar el Promedio General de todos los estudiantes
        $("#botonMostrarPromedio").click(function(){
          var sumaNotas = 0;
          var resultado = 0;


          for (var i = 0; i < localStorage.length; i++) {
            var clave = localStorage.key(i);
            var estudiante = $.parseJSON(localStorage.getItem(clave));

            sumaNotas =  sumaNotas + parseFloat(estudiante.nota);
          }
          resultado = sumaNotas / localStorage.length;
          resultado = Math.round(resultado);
          alert("El Promedio General es: "+ resultado);
        });

//Boton para mostrar la nota mayor de todos los estudiantes
        $("#botonMostarMayor").click(function(){
          var numero1 = 0;
          var numero2 = 0;

          for (var i = 0; i < localStorage.length; i++) {
            var clave = localStorage.key(i);
            var estudiante = $.parseJSON(localStorage.getItem(clave));
            numero1 = parseFloat(estudiante.nota);
            if (numero2 < numero1) {
              numero2 = numero1
            }
          }
           alert("La nota Mayor es: "+ numero2);
        });

//Boton para mostrar la nota menor de todos los estudiantes
        $("#botonMostrarMenor").click(function(){
          var clave1 = localStorage.key(0);
          var numero1 = $.parseJSON(localStorage.getItem(clave1));
          var n1 = parseFloat(numero1.nota);

          for (var i = 0; i < localStorage.length; i++) {
            var clave = localStorage.key(i);
            var estudiante = $.parseJSON(localStorage.getItem(clave));
            numero1 = parseFloat(estudiante.nota);

            if (numero1 < n1) {
              n1 = numero1
            }
          }
          alert("La nota Menor es: "+ n1);

        });

      });
