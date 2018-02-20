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
        var mi_juego = new Juego();
        // mi_juego.partida(10,10,30);
        $("#menu_inicio").on("click", function(){
            mi_juego.limpiaTablero();
        });
        $("#menu_facil").on("click", function(){
            mi_juego.partida(5,5,6);
        });   
        $("#menu_dificil").on("click", function(){
            mi_juego.partida(11,11,30);
        });   
        $("#menu_medio").on("click", function(){
            mi_juego.partida(8,8,12);
        });   
    });

















