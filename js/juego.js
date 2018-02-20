// var $ = require('jQuery');

/**
 * Esta clase gestiona la partida de Buscaminas
 */
class Juego {
    
    /**
     * Constructor, crea el objeto encargado del gestionar el juego y las partidas
     * 
     * @param {string} id_tiempo El identificador de la caja que va a contener 
     * el tiempo en segundos de la partida 
     * @param {string} id_minas El identificador donde está la caja que 
     * contiene el número de minas
     * @param {string} id_carita El identificador donde está el *smiley* que
     * va cambiando conforme evoluciona la partida
     * @param {string} id_tablero El identificador de la caja que va a contener la tabla
     * de las minas donde hacer clic
     */
    constructor(id_tiempo="#tiempo", id_minas="#minas", id_carita="#carita", id_tablero="#tablero"){
        
        this.caja_tiempo=$(id_tiempo);
        this.caja_minas=$(id_minas);
        this.caja_carita=$(id_carita);
        this.caja_tablero=$(id_tablero);
        this.timer=null;

        // Arranca una nueva partida al hacer clic sobre el smiley
        this.caja_carita.on("click", this, function(event){
            // Quitamos el atributo CLASS de la caja
            event.data.caja_carita.removeAttr("class");
            // Añadimos la clase "caraFeliz"
            event.data.caja_carita.addClass("caraFeliz");
            // Ponemos el contenido de la caja "tiempo" a 0
            event.data.caja_tiempo.html("0");
            // Inicializamos la partida
            event.data.partida();

            clearInterval(event.data.timer);
            event.data.timer = setInterval(function(caja){
                caja.html( +(caja.html())+ 1);
            }, 1000, event.data.caja_tiempo);
        });

        

    }

    pintaTablero(){
        
        this.caja_tablero.empty();

        let mi_tabla = $("<table/>");
        
        // vamos a generar una tabla de n_filas por n_columnas
        for (var i=0; i<this.matriz.getFilas(); i++){
            // cada iteración de la i, se añade una fila
            let fila = $("<tr></tr>");
            for (var j=0; j<this.matriz.getColumnas(); j++){
                // cada iteración de la j, se añade una celda
                let celda = $("<td id=\"celda_"+i+"_"+j+"\">"+"</td>");
                celda.addClass("vacio");
                // celda.attr("onclick","alert(\'disparo en: "+i+","+j+"\')");
                fila.append(celda);
            }
            mi_tabla.append(fila);
        }
        this.caja_tablero.append(mi_tabla);

        $("td").each(
            function(){
                $(this).on("click",        
                  function (event){
                    if ($(event.target).hasClass( "vacio" )) {
                        let n_minas = (+$("#minas").html());
                        if (n_minas>0) {
                            $(event.target).removeAttr( "class");
                            $(event.target).addClass( "bandera" );
                            $("#minas").html( n_minas-1 );
                        }
                    }else if($(event.target).hasClass( "bandera" )) {
                        $(event.target).removeAttr( "class" );
                        $(event.target).addClass( "vacio" );
                        $("#minas").html( (+$("#minas").html())+1 );
                    }
                    
                  });
            });
    }

    partida(filas=10, columnas=10, minas=20){

        this.matriz = new Matriz(filas, columnas);
        this.matriz.ponMinas(minas);
        this.matriz.ponContadores();

        this.caja_minas.html(minas);
        this.caja_tiempo.html(0);

        this.pintaTablero();
        this.resuelve();

    }

    resuelve(){
        if (this.matriz!=undefined) {
            for (let i=0; i<this.matriz.getFilas();i++) {
                for (let j=0; j<this.matriz.getColumnas();j++){
                    this.resuelveCelda(i,j);
                }
            }
        }
    }

    resuelveCelda(i,j){
        let td = $("#celda_"+i+"_"+j);
        td.removeAttr("class");
        switch(this.matriz.get(i,j)){
            case -1:
                td.addClass("bomba");
                break;
            case 1:
                td.addClass("oneCell");
                break;
            case 2:
                td.addClass("twoCell");
                break;
            case 3:
                td.addClass("threeCell");
                break;
            case 4:
                td.addClass("fourCell");
                break;
            case 5:
                td.addClass("fiveCell");
                break;
            case 6:
                td.addClass("sixCell");
                break;
            case 7:
                td.addClass("sevenCell");
                break;
            case 8:
                td.addClass("eigthCell");
                break;
            default:
                td.addClass("nothingCell");
        }

    }

    disparo(fila, celda, caja) {

    }

    limpiaTablero() {
        if(this.caja_tablero!=undefined) {
            this.caja_tablero.empty();
            clearInterval(this.timer);
            this.caja_minas.html(this.matriz.getMinas());
        }
    }
}