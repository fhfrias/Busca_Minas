/**
 * Librería JavaScript para el manejo de Matrices 2D
 * Ejemplo de uso: 
 * let mi_matriz = new Matriz(10, 10);
 * mi_matriz.inicializa();
 * mi_matriz.ponMinas(20);
 * mi_matriz.ponContadores();
 * 
 * 
 */

class Matriz {
    
    /**
     * Constructor, aloja espacio en memoria para 
     * una matriz de filas * columnas.
     * 
     * @param {number} filas número de filas de la matriz. 
     * Si no se pasa valor (undefined) por defecto es 20.
     * @param {number} columnas número de columnas de la matriz.
     * Si no se pasa valor (undefined) por defecto es 20.
     */
    constructor(filas=20, columnas=20){
        this.filas = filas;
        this.columnas = columnas;
        // Una matriz es un array de arrays
        this.data = []; // asignamos un array vacío a data
        for (let i=0; i< filas; i++){
            this.data.push(new Array(columnas)); // en cada iteración añadimos un array 
        };
    }

    /**
     * Método para (re)inicializar la matriz con un valor determinado.
     * Para el Buscaminas debe ser 0. Si no le pasamos nada por defecto 
     * será 0.
     * 
     * @param {*} valor 
     */
    incializa(valor=0){
        for(let i=0; i<this.filas; i++) {
            for (let j=0; j<this.columnas; j++) {
                this.data[i][j] = valor;
            }
        }
    }
    
    /**
     * Coloca n_minas (con valor -1) en la matriz.
     * 
     * @param {number} n_minas número de minas a colocar. 
     */
    ponMinas(n_minas){
        // Definimos las variables con ámbito sólo este método.
        // let pos_fil;
        // let pos_col;
        // Inicializamos la matriz con ceros
        this.incializa(0);
        // Como mínimo que tengamos que poner una mina
        if (n_minas >= 1 && (this.columnas*this.filas/3)<=n_minas) {
            do {
                // Definimos las variables con ámbito sólo este bucle.
                let pos_fil = this.dado(this.filas);
                let pos_col = this.dado(this.columnas);
                // compruebo si no había mina previa
                if (this.data[pos_fil][pos_col]!=-1){
                    this.data[pos_fil][pos_col]=-1;
                    --n_minas;
                }
            } while (n_minas>0);
        } else {
            // enviar mensaje de error
            throw new Error("Matriz::ponMinas:: número de minas no válido");
        }
    }

    /**
     * Este método genera un aleatorio entre 0 y valor-1
     * 
     * @param {number} valor genera un aleatorio entre 0 y valor-1
     */
    dado(valor) {
        let tmp;
        tmp = Math.floor(Math.random()*valor);
        return tmp;
    }

    /**
     * Métodos para hacer las comprobaciones acerca de las minas
     */
    miraNorte(i,j){
        return this.data[i-1][j]==-1?1:0;
    }
    miraNO(i,j){
        return this.data[i-1][j-1]==-1?1:0;
    }
    miraNE(i,j){
        return this.data[i-1][j+1]==-1?1:0;
    }
    miraEste(i,j){
        return this.data[i][j+1]==-1?1:0;
    }
    miraSE(i,j){
        return this.data[i+1][j+1]==-1?1:0;
    }
    miraSur(i,j){
        return this.data[i+1][j]==-1?1:0;
    }
    miraSO(i,j){
        return this.data[i+1][j-1]==-1?1:0;
    }
    miraOeste(i,j){
        return this.data[i][j-1]==-1?1:0;
    }

    /**
     * Este método pone los contadores de las minas 
     * que hay alrededor de cada casilla.
     */
    ponContadores(){
        for (let i=0; i<this.filas;i++){
            for(let j=0; j<this.columnas; j++){
                if (this.data[i][j]!=-1) { // sólo si no hay mina hacemos las cuentas...
                    if (i==0) { // estamos en la primera fila
                        if (j==0) { // estamos en la primera columna
                            // miramos sólo a la derecha y abajo
                            this.data+=this.miraEste(i,j);
                            this.data+=this.miraSE(i,j);
                            this.data+=this.miraSur(i,j);
                        } else {
                            if (j==(this.columnas-1)) { // estamos en la última columna
                                // miramos abajo y a izquierda
                                this.data+=this.miraOeste(i,j);
                                this.data+=this.miraSO(i,j);
                                this.data+=this.miraSur(i,j);
                            } else { // estamos en las columnas centrales
                                // miramos a derecha, izquierda y abajo
                                this.data+=this.miraOeste(i,j);
                                this.data+=this.miraEste(i,j);
                                this.data+=this.miraSO(i,j);
                                this.data+=this.miraSE(i,j);
                                this.data+=this.miraSur(i,j);
                            }
                        }
                    } else {
                        if (i==(this.filas-1)) { // estamos en la última fila
                            if (j==0) { // estamos en la primera columna
                                // miramos sólo arriba y derecha
                                this.data+=this.miraNorte(i,j);
                                this.data+=this.miraNE(i,j);
                                this.data+=this.miraEste(i,j);
                            } else {
                                if (j==(this.columnas-1)) { // estamos en la última columna
                                    // miramos a la izquierda y arriba
                                    this.data+=this.miraNorte(i,j);
                                    this.data+=this.miraNO(i,j);
                                    this.data+=this.miraOeste(i,j);
                                } else { // estamos en las columnas centrales
                                    // miramos a derecha, izquierda y arriba
                                    this.data+=this.miraNorte(i,j);
                                    this.data+=this.miraNO(i,j);
                                    this.data+=this.miraOeste(i,j);
                                    this.data+=this.miraEste(i,j);
                                    this.data+=this.miraNE(i,j);
                                }
                            }
                        } else { // estamos en las filas centrales
                            if (j==0) { // estamos en la primera columna
                                // arriba, abajo y a la derecha
                                this.data+=this.miraNorte(i,j);
                                this.data+=this.miraSur(i,j);
                                this.data+=this.miraSE(i,j);
                                this.data+=this.miraEste(i,j);
                                this.data+=this.miraNE(i,j);
                            } else {
                                if (j==(this.columnas-1)) { // estamos en la última columna
                                    // arriba, abajo y a la izquierda
                                    this.data+=this.miraNorte(i,j);
                                    this.data+=this.miraNO(i,j);
                                    this.data+=this.miraOeste(i,j);
                                    this.data+=this.miraSO(i,j);
                                    this.data+=this.miraSur(i,j);

                                } else { // estamos en las columnas centrales
                                    // arriba, abajo, derecha e izquierda
                                    this.data+=this.miraNorte(i,j);
                                    this.data+=this.miraNO(i,j);
                                    this.data+=this.miraOeste(i,j);
                                    this.data+=this.miraSO(i,j);
                                    this.data+=this.miraSur(i,j);
                                    this.data+=this.miraSE(i,j);
                                    this.data+=this.miraEste(i,j);
                                    this.data+=this.miraNE(i,j);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Método para consultar la posición [i,j]
     * de la matriz del tablero del Buscaminas.
     * @param {number} i Posición de la fila en el tablero.
     * @param {number} j Posición de la columna en el tablero.
     */
    get(i,j){
        if (i>=0 && i<this.filas && j>=0 && j<this.columnas) {
            return this.data[i][j];
        } else {
            throw new Error("Matriz::get: Ha intentado acceder a una posición no válida.");
        }
    }

    /**
     * Método para almacenar un dato en la posición [i,j]
     * de la matriz del tablero del Buscaminas. Si no se 
     * pasa el parámetro dato por defecto será 0.
     * @param {number} i posición (fila)
     * @param {number} j posición (columna)
     * @param {number} dato Si no se indica, por defecto será 0.
     */
    set(i,j,dato=0) {
        if (i>=0 && i<this.filas && j>=0 && j<this.columnas) {
            this.data[i][j]=dato;
        } else {
            throw new Error("Matriz::set: Ha intentado acceder a una posición no válida.");
        }
    }

};
