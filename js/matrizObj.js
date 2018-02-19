/**
 * Librería JavaScript para el manejo de Matrices 2D
 */


function Matriz(filas, columnas){
    this.filas = filas;
    this.columnas = columnas;
    // Una matriz es un array de arrays
    this.data = new Array(filas);

    for (var i=0; i< filas; i++){
        this.data[i] = new Array(columnas);
    }

};