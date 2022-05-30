function llamarNivel(){
    if(nivel<maxNivel){
        if(vidas>0){
            nivel+=1; 
        }else{
            nivel=1
        }
        switch(nivel){
            case 1:
                /*aceleracion=2;
                margen=3;
                estrellas_para_vida=5;
                cant_bloques_para_estrella=3;
                vidas=3;
                puntos=0;*/
				setColor("rojo");
                sonar_game_over=true;
                contador_estrellas_blancas=0;
                cant_max_estrellas_blancas=5;
                cant_estrellas=0;
                cant_estrellas_azul=0;
                cant_estrellas_amarillo=0;
                cant_estrellas_gris=0;
                cant_estrellas_naranja=0;
                cant_estrellas_verde=0;
                cant_estrellas_violeta=0;
                setNivel();
                break;
            case 2:
                aceleracion+=aceleracion*0.5;//1
                margen+=margen/2;//1
                desplazamiento+=desplazamiento*0.4;//2
                estrellas_para_vida+=1;
                cant_max_estrellas_blancas+=1;
                setColor("rojo");
                setNivel();
                break;
            case 3:
                setColor("verde");
                setNivel();
                break;
            case 4:
                cant_max_estrellas_blancas+=1;
                setColor("morado");
                setNivel();
                break;
            case 5:
                estrellas_para_vida+=1;
                setColor("negro");
                setNivel();
                break;
            case 6:
                setColor("verde");
                setNivel();
                break;
            case 7:
                cant_bloques_para_estrella+=1;
                setColor("rojo");
                setNivel();
                break;
            case 8:
                cant_max_estrellas_blancas+=1;
                setColor("morado");
                setNivel();
                break;
            case 9:
                punto_rotura+=1;
                aceleracion_estrella+=aceleracion_estrella/3;//1
                setColor("azul");
                setNivel();
                break;
            case 10:
                setColor("negro");
                setNivel();
                break;
            
        }
    }
    
}
function setColor(str_color){
    switch(str_color){
        case "azul":
            colorFondo="#0B0719";
            colorClaro="#5F04B4";
            colorOscuro="#0B0719";
            break;
        case "rojo":
            colorFondo="#610B21";
            colorClaro="#B404AE";
            colorOscuro="#610B21";
            break;
        case "verde":
            colorFondo="#0B3B0B";
            colorClaro="#088A08";
            colorOscuro="#0B3B0B";
             break;
        case "negro":
            colorFondo="#000000";
            colorClaro="#585858";
            colorOscuro="#000000";
            break;
        case "morado":
            colorFondo="#190710";
            colorClaro="#3B0B24";
            colorOscuro="#190710";
            break;
    }
}
function reposicionarBarra(){
	barra.x=(anchoCanvas/2)-(barra.width/2);
	pelota.x=(anchoCanvas/2)-(ladoPelota/2);
	pelota.y=barra.y-ladoPelota;
    direccion=0;
}
function setNivel(){
    reposicionarBarra()
    cargarTablero();
    resetearEstrellas();
    updateGameArea();
}
