/**
 * Proyecto: Buscaminas
 * 
 * Fichero: index.js
 * 
 * Fecha: 23/01/2018 (v. 201801230925-index.js)
 * 
 * Autor/es: 
 *  + Juangu
 * 
 */



/**
 * Configuramos los procedimientos que deben ejecutarse 
 * al cargar la página completamente.
 */


$(document).ready(
    function(){ // esto es una función anónima

        /* El selector de jQuery es el dólar.
           guardamos en la variable mi_tabla
           el objeto "nodo con id=tablero" */
        var mi_tabla = $("#tablero");

        var n_filas = 10;
        var n_columnas = 10;
        var fila;
        var celda;

        var timer;

        // vamos a generar una tabla de n_filas por n_columnas
        for (var i=0; i<n_filas; i++){
            // cada iteración de la i, se añade una fila
            fila = $("<tr></tr>");
            for (var j=0; j<n_columnas; j++){
                // cada iteración de la j, se añade una celda
                celda = $("<td>i="+i+", j="+j+"</td>");
                celda.addClass("vacio");
                fila.append(celda);
            }
            mi_tabla.append(fila);
        }

        // Arranca una nueva partida
        $("#carita").on("click",function(){
            // Quitamos el atributo CLASS de la caja
            $("#carita").removeAttr("class");
            // Añadimos la clase "caraFeliz"
            $("#carita").addClass("caraFeliz");
            // Ponemos el contenido de la caja "tiempo" a 0
            $("#tiempo").html("0");
            
            clearInterval(timer);
            timer = setInterval(function(){
                $("#tiempo").html( +($("#tiempo").html())+ 1);
            }, 1000);
        });


        
    });

















