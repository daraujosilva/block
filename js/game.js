
var w = 700;
var h = 500;
var cuadro=[];
var filas=2; //4
var columnas=15;
var comenzar=false;
var pausar=false;
var puntos=0;
var vidas=3;
var totalBloques=filas*columnas;
var reinicia=false;
var estrellas=[];
var topeEstrella=0;//ARREGLO CON TOPE
var ultimaEstrella=-5;
var cant_estrellas=0;// para las vidas, cuando toca la barra
var cant_estrellas_azul=0;
var cant_estrellas_amarillo=0;
var cant_estrellas_gris=0;
var cant_estrellas_naranja=0;
var cant_estrellas_verde=0;
var cant_estrellas_violeta=0;
//para estrellas blancas
var contador_estrellas_blancas=0;
var cant_max_estrellas_blancas=5;
//---SONIDOS-----
var sonido_rebote;
var sonido_metal;
var sonido_vida;
var sonido_estrella;
var sonido_estrella_blanca;
var sonido_pelota_fuera;
var sonido_crece;// se va a pisar con estrella blanca
var sonido_game_over;
var sonar_game_over=true;
var sonido_rebote_barra;
var sonido_activado=true;
//------------------
var barra;
var pelota;
var muro_h=[];
var muro_v_1=[];
var muro_v_2=[];

var direccion=0; //0 arriba, 1 a los 6 min, 2 a los 12, 3 a los 18, 4 a los 24, 5 a los 30, 6 a los 36, 7 a los 42, 8 a los 48, 9 a los 54
//--PARAMETROS --- NIVEL
var nivel=1;
var maxNivel=10;
var aceleracion=2;
var punto_rotura=1;//para contar veces para romper
var aceleracion_estrella=2;
var margen=3;
var desplazamiento=5; // desplazamiento barra
var estrellas_para_vida=5;
var colorFondo="#0B0719";
var colorClaro="#5F04B4";
var colorOscuro="#0B0719";
var cant_bloques_para_estrella=3;
//--------------------------
var margen_p=4;
var ancho_muro=10;
var encontre=false; //para colision bloques
//var msg="";
//-------variables dimensiones------
var largo_muro_v;
var largo_muro_h;
var altoCanvas;
var anchoCanvas;
var altoArea;
var altoArea;
var anchoBarra;
var altoBarra;
var ladoPelota;
var anchoPiezaMuro;
var altoPiezaMuro;
var altoBloque;
var anchoBloque;
var separacionBloques;
//-------fin variables dimensiones------
//---- movimiento ------------
var efectoPelota=0; //0: sin efecto, 1:izquierda, 2:derecha
var movimientoBarra=0; //0: quieto, 1:izquierda, 2:derecha
var lado;

function touchHandlerDummy(e){
    e.preventDefault();
    return false;
}

function startGame() {
	//sonido = new sound("sound/sfx_coin_double7.wav",1);
	document.addEventListener("touchstart", touchHandlerDummy, false);
	document.addEventListener("touchmove", touchHandlerDummy, false);
	document.addEventListener("touchend", touchHandlerDummy, false);
	document.addEventListener("touchcancel", touchHandlerDummy, false);
	
	dimensionarElementos();
	sonido_rebote = new sound("sound/sfx_menu_move4_rebote.wav",0.7);
	sonido_metal = new sound("sound/sfx_damage_hit3_metal.wav",0.8);
	sonido_estrella = new sound("sound/sfx_menu_select1_estrella.wav",0.5);
	sonido_estrella_blanca = new sound("sound/sfx_menu_select4_estrella_blanca.wav",0.8);
	sonido_pelota_fuera = new sound("sound/sfx_sounds_falling1_pelota_fuera.wav",0.8);
	sonido_vida = new sound("sound/sfx_sounds_powerup2_vida.wav",0.8);
	sonido_game_over = new sound("sound/sfx_sound_shutdown2_game_over.wav",0.8);
	sonido_rebote_barra = new sound("sound/sfx_movement_ladder3a_rebote_barra.wav",0.6);
	myGameArea.start();
	barra= new componente(anchoBarra, altoBarra, "barra", (anchoCanvas/2)-(anchoBarra/2), (altoCanvas/18)*17);
	pelota= new componente(ladoPelota, ladoPelota, "pelota", (anchoCanvas/2)-(ladoPelota/2), ((altoCanvas/18)*17)-ladoPelota);
	cargarMuro();
	cargarTablero();
	
	$("#menuPausa").hide();
	$("#cabecera").hide();
	$("#juego").hide();
	$("#botonera").hide();
	$("#instrucciones").hide();
	$("#gameOver").hide();
	$("#guardar").hide();
	$("#transparente").hide();
	$("#menuInicio").show();
	actualizarDatos();
	
	/*$(".botonDireccion").touchstart(function(event){
		event.stopPropagation();
	});
	$(".botonDireccion").touchend(function(event){
		event.stopPropagation();
	});*/
	
	document.getElementById("preload").style.display = "none";
  	document.getElementById("contenedor").style.display = "block";
}

function dimensionarElementos(){
	w=window.innerWidth;
	h=window.innerHeight;
	
	if(w<=h){
		//es mas alto que ancho --> celular
		anchoArea=w*0.99;
		altoArea=h*0.75;
		anchoCanvas=parseInt(anchoArea);
		lado=parseInt(anchoCanvas/35);
		altoCanvas=parseInt(altoArea);
	}else{
		//es mas ancho que alto --> pc o horizontal	
		altoArea=h*0.75;
		anchoArea=w*0.35;
		altoCanvas=parseInt(altoArea);
		lado=parseInt(altoCanvas/50);
		anchoCanvas=parseInt(anchoArea);
	}
	anchoBarra=parseInt(anchoCanvas/6);
	altoBarra=parseInt(anchoBarra/6);
	ladoPelota=parseInt(anchoCanvas/35);
	anchoPiezaMuro=anchoCanvas/70;
	altoPiezaMuro=anchoPiezaMuro*2;
	aceleracion=(anchoCanvas/350)*1.1;
	aceleracion_estrella=aceleracion;
	margen=anchoCanvas/233;
	separacionBloques=anchoCanvas/175;
	anchoBloque=(anchoCanvas-(separacionBloques*(columnas+1)+(anchoPiezaMuro*2)))/columnas;
	altoBloque=parseInt(anchoBloque/2);
	desplazamiento=parseInt(anchoCanvas/140);
	
	largo_muro_v=parseInt(altoCanvas/altoPiezaMuro);
	largo_muro_h=parseInt(anchoCanvas/altoPiezaMuro);
		
	$("#contenedor").css("height",""+h*0.95+"");
	$("#contenedor").css("width",""+anchoArea+"");
	$("#cabecera").css("width",""+anchoArea+"");
	$("#cabecera").css("height",""+h*0.05+"");
	$("#tablaCabecera").css("width",""+anchoArea+"");
	$("#tablaCabecera td").css("width",""+anchoArea/3+"");
	$("#tablaCabecera").css("height",""+h*0.05+"");
	$("#tablaCabecera").css("text-align","center");
	$(".tituloChico").css("padding-top",""+h*0.05*0.1+"px");
	$("#areaJuego").css("width",""+anchoArea+"");
	$("#areaJuego").css("height",""+altoArea+"");
	$("#areaJuego").css("text-align","center");
	$("#menuInicio").css("width",""+anchoArea+"");
	$("#menuInicio").css("height",""+altoArea+"");
	$("#menuPausa").css("width",""+anchoArea+"");
	$("#menuPausa").css("height",""+altoArea+"");
	$("#textoMenu").css("width",""+anchoArea+"");
	$("#textoMenu").css("height",""+altoArea*0.2+"");
	$("#textoMenu").css("padding-top",""+altoArea*0.2+"px");
	$(".boton").css("height",altoArea*0.3*0.2+"");
	$(".boton").css("padding-top",altoArea*0.3*0.2*0.5+"px");
	$("#instrucciones").css("width",""+anchoArea+"");
	$("#instrucciones").css("height",""+altoArea+"");
	$("#gameOver").css("width",""+anchoArea+"");
	$("#gameOver").css("height",""+altoArea+"");
	$("#guardar").css("width",""+anchoArea+"");
	$("#guardar").css("height",""+altoArea+"");
	$("#juego").css("width",""+anchoCanvas+"");
	$("#juego").css("height",""+altoCanvas+"");
	
	$("#botonera").css("width",""+anchoArea+"");
	$("#botonera").css("height",""+h*0.15+"");
	
	$("#tablaBotones").css("width",""+anchoArea+"");
	$("#tablaBotones").css("height",""+h*0.1+"");
	//$("#tablaBotones").css("background","rgb(255,0,0)");
	//$("#tablaBotones td").css("border","2px solid rgb(20,20,20)");
	$("#contenedorBotonera").css("text-align","center");	
	$("#contenedorBotonera").css("text-align","-webkit-center");	
	$("#tablaBotones").css("text-align","center");	
	//$("#tablaBotones").css("text-align","-webkit-center");		
	$("#tablaBotones td").css("text-align","center");	
	//$("#tablaBotones td").css("text-align","-webkit-center");	
	$(".botonDireccion").css("height",""+(h*0.1)+"");
	//$(".botonDireccion").css("padding-top",""+(h*0.1)*0.2+"px");
	$(".botonDireccion").css("width",""+anchoArea/2+"");
	//$(".botonDireccion").css("border","2px solid rgb(20,20,20)");
	//$(".botonDireccion").css("background-image","linear-gradient(rgb(120,120,120), rgb(20,20,20))");
	$("#botonIzquierda").css("background-image","url('img/botonIzq.png')");
	$("#botonIzquierda").css("background-size","100% 100%");
	$("#botonDerecha").css("background-image","url('img/botonDer.png')");
	$("#botonDerecha").css("background-size","100% 100%");
	//$(".botonDireccion").css("border-radius","15px");
	$("#tablaInstrucciones").css("padding-bottom",anchoCanvas/20+"px");
	$("#tablaInstrucciones td").css("height",anchoCanvas/20+"px");
	$("#imgPunto").css("width",anchoCanvas/35+"");
	$("#imgPunto").css("height",anchoCanvas/35+"");
	$("#imgHuevo").css("width",anchoCanvas/35+"");
	$("#imgHuevo").css("height",anchoCanvas/35+"");
	$("#imgHole").css("min-width",(anchoCanvas/35)*3+"");
	$("#imgHole").css("max-height",(anchoCanvas/35)*3+"");
	$("#imgPad").css("min-width",(anchoCanvas/35)*3+"");
	$("#imgPad").css("max-height",(anchoCanvas/35)*3+"");
	
	$("#logoInicio").css("height",""+h/2.5+"");
	$("#logoInicio").css("padding-top",""+h/6+"px");
}

function actualizarDatos(){
	$("#txtPuntos").text(""+puntos);
	$("#txtEstrellas").text(cant_estrellas+"/"+estrellas_para_vida);
	$("#txtVidas").text(""+vidas);
}

var myGameArea = {
    canvas : document.getElementById("juego"),
    start : function() {
		this.canvas=document.getElementById("juego");
        this.canvas.width = anchoCanvas;
		this.canvas.height = altoCanvas;
		this.canvas.style.cursor="none";
		this.context = this.canvas.getContext("2d");
		this.contador=0;
		this.mostrado=false;
		this.intervalo=14;
		this.interval = setInterval(updateGameArea, this.intervalo);
		window.addEventListener('keydown', function (e) {
			myGameArea.key = e.keyCode;
		})
		window.addEventListener('keyup', function (e) {
			myGameArea.key = false;
			movimientoBarra=0;
		})
    },
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		/*var background = new Image();
		background.src = "./img/fondo_gris.png";
		this.context.drawImage(background,0,0);*/
		this.context.fillStyle = colorFondo;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		var grd1 = this.context.createLinearGradient(0, 0, 0, h-100);
		grd1.addColorStop(0, colorClaro);
		grd1.addColorStop(1, colorOscuro);

		veces=anchoCanvas/20;
		c=20;
			for(i=0;i<veces;i++){
				this.context.beginPath();
				this.context.strokeStyle = grd1;
				this.context.lineWidth = 0.8;
				this.context.moveTo(c, 0);
				this.context.lineTo(c, altoCanvas);
				this.context.stroke();
				c=c+20;
			}
		veces=altoCanvas/20;
		c=10;
			for(i=0;i<veces;i++){
				this.context.beginPath();
				this.context.strokeStyle = grd1;
				this.context.lineWidth = 0.8;
				this.context.moveTo(0, c);
				this.context.lineTo(anchoCanvas, c);
				this.context.stroke();
				c=c+20;
			}
			//pintar nivel
			this.context.fillStyle = colorFondo;
			this.context.fillRect(this.canvas.width/3, this.canvas.height/10-(this.canvas.height/10)/2, this.canvas.width/3, this.canvas.height/12);
			this.context.strokeStyle = colorClaro;
			this.context.strokeRect(this.canvas.width/3, this.canvas.height/10-(this.canvas.height/10)/2, this.canvas.width/3, this.canvas.height/12);
			this.context.fillStyle = colorClaro;
			//texto nivel
			var textoNivel= "Nivel "+nivel;
			this.context.font = "1em myPrStart";
			this.context.textAlign = 'center';
			this.context.fillText(textoNivel, this.canvas.width/3+((this.canvas.width/3)/2), this.canvas.height/10);
			
			
		},
	mensaje : function() {//cuando no empezo todavia
		
		},
		pausado: function(){
			/*this.context.fillStyle = colorFondo;
			this.context.fillRect((w/2)-90, (h/2)-80, 180, 50);
			this.context.strokeStyle = "#585858";
			this.context.strokeRect((w/2)-80, (h/2)-70, 160, 30);
			this.context.font = "16px myBitFont";
			this.context.fillStyle = "#585858";
			this.context.fillText("PAUSADO", (w/2)-55, (h/2)-48);*/
		},
		terminado: function(){
			if(vidas==0){
				if(sonar_game_over==true){
					sonido_game_over.play();
					sonar_game_over=false;
				}
				$("#menuPausa").hide();
				$("#juego").hide();
				$("#transparente").hide();
				$("#botonera").hide();
				$("#menuInicio").hide();
				$("#gameOver").css("color","rgb(255,0,0)");
				$("#gameOver").show();
			}else{
				if((nivel+1)<=maxNivel){
					if(this.contador<parseInt(3000/this.intervalo)){
						rutinaJuego(false);
						//imprimir aviso ---> DIVs
						this.context.fillStyle = "rgba(0,0,0,0.3)";
						//this.context.fillRect(anchoCanvas/6, altoCanvas/3,2*(anchoCanvas/3), altoCanvas/3);
						this.context.fillRect(anchoCanvas/11, altoCanvas/3,(anchoCanvas/11)*9, altoCanvas/3);
						this.context.fillStyle = "rgb(0,255,0)"
						this.context.font = "2em myPrStart";
						this.context.textAlign = "center";
						this.context.fillText("¡Excelente!",anchoCanvas/2, (altoCanvas/3)+(altoCanvas/3)/3);
						this.context.fillStyle = "rgb(255,255,255)"
						this.context.font = "0.5em myPrStart";
						this.context.fillText("Presiona <ENTER> para continuar", anchoCanvas/2, altoCanvas/2);
						this.contador++;
						console.log("dentro de cambio de nivel");
						//mostrar DIV fin
						}else {
							llamarNivel();
							this.contador=0;
						}
				}else{//gano
					if(this.mostrado==false){
						$("#gameOver").css("color","rgb(0,255,0)");
						$("#textoGameOver").text("¡Felicitaciones!");
						$("#subTextoGameOver").text("llegaste al final");
						$("#menuPausa").hide();
						$("#juego").hide();
						$("#transparente").hide();
						$("#botonera").hide();
						$("#menuInicio").hide();
						$("#gameOver").show();
						mostrado=true;
					} 
				}
		
			}
		}
}

var placard = {
	/*canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = w;
        this.canvas.height = h/8;
		this.context = this.canvas.getContext("2d");
		var container=document.getElementById("contenedor");
		this.canvas.className="placard";
		container.appendChild(this.canvas);
		this.canvas.setAttribute("style", "top: "+(h+10)+"px;");
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fillStyle = "black";
		this.context.fillRect(10, 10, this.canvas.width-10, this.canvas.height-10);
		this.context.font = "14px myBitFont";
		this.context.fillStyle = "yellow";
		this.context.fillText("NIVEL: "+nivel, 20, (this.canvas.height/2)-5);
		this.context.fillStyle = "white";
		this.context.font = "12px myBitFont";
		this.context.fillText("VIDAS: "+vidas, (((this.canvas.width-5)/10)*2)+40, (this.canvas.height/2)-5);
		this.context.font = "14px myBitFont";
		this.context.fillText("PUNTOS: "+puntos, (((this.canvas.width-5)/10)*5)-25, (this.canvas.height/2)-5);
		this.context.font = "12px myBitFont";
		this.context.fillText("ESTRELLAS: "+cant_estrellas, (((this.canvas.width-5)/10)*7)+50, (this.canvas.height/2)-5);

		this.context.fillStyle = "#585858";
		this.context.font = "8px myBitFont";
		this.context.fillText("PAUSA: <SPACE> | REANUDAR: <ENTER>", 20, (this.canvas.height/2)+18);
		//this.context.fillStyle = "white";
		this.context.font = "9px myBitFont";
		this.context.fillText("Az:"+cant_estrellas_azul+" /Am:"+cant_estrellas_amarillo+" /Gr:"+cant_estrellas_gris+" /Nj:"+cant_estrellas_naranja+" /Vd:"+cant_estrellas_verde+" /Va:"+cant_estrellas_violeta, this.canvas.width/2, (this.canvas.height/2)+18);

	}*/
}
function sound(src,vol) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.volume = vol;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		if(sonido_activado==true){
			this.sound.play();
		}
	}
	this.stop = function(){
	  this.sound.pause();
	}
  }

function activarSonido(){
	if(sonido_activado==true){
		sonido_activado=false;
		imagen=document.getElementById("sonido");
		imagen.src="../img/sonido_off.png";
	}else{
		sonido_activado=true;
		imagen=document.getElementById("sonido");
		imagen.src="../img/sonido_on.png";
	}
 }

function componente(width, height, tipo, x, y) {
    this.width = width;
    this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.tipo=tipo;
	this.img=document.getElementById(this.tipo+"");
	this.contador=1;
	this.golpes=0;
	this.estado="activo"; //activo, seleccionado, borrado, explota
    this.x = x;
    this.y = y;	
	this.update = function(){
		this.img=document.getElementById(this.tipo+"");
		ctx = myGameArea.context;
		if(this.estado=="activo"){
			ctx.drawImage(this.img, this.x, this.y,this.width,this.height);
			if(this.tipo=="estrella_explota"){
				this.img=document.getElementById("estrella_explota");
			}
		}else if(this.estado!="borrado"){
			if(this.tipo=="estrella_explota"){
				this.img=document.getElementById("estrella_explota");
			}else{
				this.img=document.getElementById("explota");
			}
			ctx.drawImage(this.img, this.x, this.y,this.width,this.height);
		}
	}
	this.newPos = function() {
		
	}
}

function updateGameArea() {
	if (comenzar==true){
		if(vidas>0 && totalBloques>0){
			if(pausar==false){
				rutinaJuego(true);
				if (myGameArea.key && myGameArea.key == 37) {movimientoBarra=1;} //izquierda
				if (myGameArea.key && myGameArea.key == 39) {movimientoBarra=2;} //derecha
				if (myGameArea.key && myGameArea.key == 32) {pausa();} //barra espaciadora --> pausa
				controlMovimiento();
			}
			if (myGameArea.key && myGameArea.key == 13) {reanudar();} //ENTER --> reanudar - >> 16 ES SHIFT
		}else{
			myGameArea.terminado();
			if (myGameArea.key && myGameArea.key == 13) {llamarNivel();} //ENTER --> nievl o reiniciar
		}
	}else{
		if (myGameArea.key && myGameArea.key == 13) {empezar();} //enter --> empezar
	}	
}

function rutinaJuego(controlPelota){
	myGameArea.clear();
	barra.update();
	pelota.update();
	moverPelota();
	colisionMuros();
	colisionBarra();
	colisionBloques();
	eliminarExplotados();
	for(i=0;i<=largo_muro_h;i++){
		muro_h[i].update();
	}
	for(i=0;i<largo_muro_v;i++){
		muro_v_1[i].update();
		muro_v_2[i].update();
	}
	for(i=0;i<filas;i++){
		for(j=0;j<columnas;j++){
			cuadro[i][j].update();
		}
	}
	for(i=0;i<estrellas.length;i++){
		estrellas[i].update();
	}
	moverEstrellas();
	colisionEstrellas();
	eliminarEstrellas();
	reposicionar(controlPelota);
}

function empezar(){
	if (comenzar==false){
		comenzar=true;
		resetearValores();
		actualizarDatos();
		$("#menuPausa").hide();
		$("#juego").show();
		$("#transparente").show();
		$("#botonera").show();
		$("#instrucciones").hide();
		$("#gameOver").hide();
		$("#guardar").hide();
		$("#menuInicio").hide();
		$("#cabecera").show();
	}
}

function reanudar(){
	$("#menuPausa").hide();
	$("#transparente").show();
	$("#juego").show();
	$("#botonera").show();
	$("#cabecera").show();
	pausar=false;
}
function pausa(){
	$("#menuPausa").show();
	$("#juego").hide();
	$("#transparente").hide();
	$("#botonera").hide();
	$("#cabecera").hide();
	pausar=true;
}
function reiniciar(){
	pausar=false;
	resetearValores();
	actualizarDatos();
	$("#menuPausa").hide();
	$("#transparente").show();
	$("#juego").show();
	$("#botonera").show();
	$("#instrucciones").hide();
	$("#gameOver").hide();
	$("#guardar").hide();
	$("#menuInicio").hide();
	$("#cabecera").show();
}

function resetearValores(){
	vidas=3;
	nivel=1;
	myGameArea.mostrado=false;
	filas=2;
	columnas=15;
	totalBloques=filas*columnas;
	puntos=0;
	setNivel();
	setColor("azul");
	topeEstrella=0;//ARREGLO CON TOPE
	ultimaEstrella=-5;
	cant_estrellas=0;// para las vidas, cuando toca la barra
	cant_estrellas_azul=0;
	cant_estrellas_amarillo=0;
	cant_estrellas_gris=0;
	cant_estrellas_naranja=0;
	cant_estrellas_verde=0;
	cant_estrellas_violeta=0;
	estrellas_para_vida=5;
	totalBloques=filas*columnas;
	contador_estrellas_blancas=0;
	cant_max_estrellas_blancas=5;
	punto_rotura=1;
	cant_bloques_para_estrella=3;
	movimientoBarra=0
	aceleracion=(anchoCanvas/350)*1.1;
	aceleracion_estrella=aceleracion;
	margen=anchoCanvas/233;
	desplazamiento=parseInt(anchoCanvas/140);
	efectoPelota=0;
}

function inicio(){
	pausar=false;
	comenzar=false;
	//otras variables
	$("#menuPausa").hide();
	$("#juego").hide();
	$("#transparente").hide();
	$("#botonera").hide();
	$("#gameOver").hide();
	$("#menuInicio").show();
	$("#cabecera").hide();
}

function mostrarInstrucciones(){
	$("#menuPausa").hide();
	$("#menuInicio").hide();
	$("#juego").hide();
	$("#transparente").hide();
	$("#botonera").hide();
	$("#instrucciones").show();
	$("#cabecera").hide();
}
//vuelve de las instrucciones al menu
function volver(){
	$("#instrucciones").hide();
	if(comenzar==false){
		$("#menuInicio").show();
		$("#cabecera").hide();
	}else{
		$("#menuPausa").show();
		$("#cabecera").show();
	}
}

function controlMovimiento(){
	if (movimientoBarra==1){
		if (barra.x>anchoPiezaMuro){
			barra.x=barra.x-desplazamiento;
		}
	}else if(movimientoBarra==2){
		if (barra.x+barra.width<anchoCanvas-anchoPiezaMuro){
			barra.x=barra.x+desplazamiento;
		}
	}
}

function moverIzquierda(event){
	movimientoBarra=1;
	event.stopPropagation();
}
function moverDerecha(event){
	movimientoBarra=2;
	event.stopPropagation();
}

function parar(event){
	movimientoBarra=0;
	event.stopPropagation();
}

function moverPelota(){
	switch(direccion){
		case 0:
			pelota.y=pelota.y-aceleracion-2;
			break;
		case 1:
			pelota.y=pelota.y-(2*aceleracion);
			pelota.x=pelota.x+aceleracion;
			break;
		case 2:
			pelota.y=pelota.y-aceleracion;
			pelota.x=pelota.x+(2*aceleracion);
			break;
		case 3:
			pelota.y=pelota.y+aceleracion;
			pelota.x=pelota.x+(2*aceleracion);
			break;
		case 4:
			pelota.y=pelota.y+(2*aceleracion);
			pelota.x=pelota.x+aceleracion;
			break;
		case 5:
			pelota.y=pelota.y+aceleracion+2;
			break;
		case 6:
			pelota.y=pelota.y+(2*aceleracion);
			pelota.x=pelota.x-aceleracion;
			break;
		case 7:
			pelota.y=pelota.y+aceleracion;
			pelota.x=pelota.x-(2*aceleracion);
			break;
		case 8:
			pelota.y=pelota.y-aceleracion;
			pelota.x=pelota.x-(2*aceleracion);
			break;
		case 9:
			pelota.y=pelota.y-(2*aceleracion);
			pelota.x=pelota.x-aceleracion;
			break;
	}
}

function moverEstrellas(){
	for(i=0;i<estrellas.length;i++){
		if(estrellas[i].tipo=="estrella_gris"){
			estrellas[i].y=estrellas[i].y+aceleracion_estrella+1;
		}else{
			estrellas[i].y=estrellas[i].y+aceleracion_estrella;
		}
		
	}
}
function eliminarEstrellas(){
	for(i=0;i<estrellas.length;i++){
		if(estrellas[i].y>h){
			estrellas[i].estado="ninguno";
			estrellas.splice(i,0);
		}
	}
}

function resetearEstrellas(){
	for(i=0;i<estrellas.length;i++){
		estrellas[i].tipo="ninguno";
		estrellas[i].estado="borrado";
	}
}

function colisionEstrellas(){
	for(i=0;i<estrellas.length;i++){
		if(estrellas[i].y+estrellas[i].height>= barra.y-margen && estrellas[i].y+estrellas[i].height<= barra.y+(barra.height/2) &&(estrellas[i].x+estrellas[i].width>barra.x && estrellas[i].x<barra.x+barra.width) && estrellas[i].estado=="activo" ){
			if (i!=ultimaEstrella){
				if(estrellas[i].tipo!="estrella_explota"){
					if(estrellas[i].tipo=="estrella_gris"){
						puntos=puntos+35;
						sonido_estrella.play();
					}else if(estrellas[i].tipo=="estrella_blanca"){
						puntos=puntos+50;
						sonido_estrella_blanca.play();
						agrandarBarra();
					}else{
						puntos=puntos+25;
						sonido_estrella.play();
					}
					cant_estrellas++;
					actualizarDatos();
					if(cant_estrellas==estrellas_para_vida){
						vidas=vidas+1;
						cant_estrellas=0;
						sonido_vida.play();
						actualizarDatos();
					}
					estrellas[i].tipo="estrella_explota";
					ultimaEstrella=i;
				}
				
			}
		}
	}
}
function agrandarBarra(){
	if (barra.tipo=="barra"){
		barra.tipo="barra_larga";
		barra.width+=anchoBarra/4;
	}else if(barra.tipo=="barra_corta"){
		barra.tipo="barra";
		barra.width=anchoBarra;
	}else{
		puntos=puntos+500;
		actualizarDatos();
	}
}

function achicarBarra(){
	if (barra.tipo=="barra_larga"){
		barra.tipo="barra";
		barra.width=anchoBarra;
	}else if(barra.tipo=="barra"){
		barra.tipo="barra_corta";
		barra.width-=anchoBarra/4;
	}else{
		puntos=puntos-500;
		actualizarDatos();
	}
}

function reposicionar(controlarPelota){
	if(controlarPelota==true){
		if(pelota.y>altoCanvas && pelota.y<altoCanvas+anchoPiezaMuro){
			sonido_pelota_fuera.play();
		}else if(pelota.y>altoCanvas+150){
			if(vidas>0){
				vidas--;
				actualizarDatos();
				barra.x=(anchoCanvas/2)-(barra.width/2);
				pelota.x=(anchoCanvas/2)-(ladoPelota/2);
				pelota.y=barra.y-ladoPelota;
				direccion=0;
				if(barra.tipo=="barra_larga"){
					barra.tipo="barra";
					barra.width=anchoBarra;
				}
			}
		}
	}
}

function colisionMuros(){
	if (pelota.x<=anchoPiezaMuro){//muro izquierdo
		switch(direccion){
			case 6:
				direccion=4;
				break;
			case 7:
				direccion=3;
				break;
			case 8:
				if(efectoPelota<=1){
					direccion=2;
				}else{
					direccion=1;
				}
				break;
			case 9:
				if(efectoPelota==0 || efectoPelota==2){
					direccion=1;
				}else{
					direccion=2;
				}
				break;
		}
		efectoPelota=0;
	}else if(pelota.x+pelota.width>=(anchoCanvas-anchoPiezaMuro)){//muro derecho
		switch(direccion){
			case 1:
				if(efectoPelota<=1){
					direccion=9;
				}else{
					direccion=8;
				}
				break;
			case 2:
				if(efectoPelota==0 || efectoPelota==2){
					direccion=8;
				}else{
					direccion=9;
				}
				break;
			case 3:
				direccion=7;
				break;
			case 4:
				direccion=6;
				break;
		}
		efectoPelota=0;
	}else if(pelota.y<=anchoPiezaMuro){//muro superior
		switch(direccion){
			case 0:
				if(efectoPelota==0){
					if(numeroAleatorio(2)==1){
						direccion=4;
					}else{
						direccion=6;
					}
				}else if(efectoPelota==1){
					direccion=7;
				}else{
					direccion=3;
				}
				break;
			case 1:
				if(efectoPelota==0){
					direccion=4;
				}else if(efectoPelota==1){
					direccion=5;
				}else{
					direccion=3;
				}
				break;
			case 2:
				if(efectoPelota==0 || efectoPelota==2){
					direccion=3;
				}else{
					direccion=4;
				}
				break;
			case 8:
			if(efectoPelota<=1){
					direccion=7;
				}else{
					direccion=6;
				}
				break;
			case 9:
				if(efectoPelota==0){
					direccion=6;
				}else if(efectoPelota==1){
					direccion=7;
				}else{
					direccion=5;
				}
				break;
		}
		efectoPelota=0;
	}
}

function colisionBarra(){
	if((pelota.y+pelota.height)>=barra.y){
		if((pelota.x+(pelota.width/2))>=barra.x && ((pelota.x+(pelota.width/2)))<=(barra.x+barra.width)&& (pelota.y+pelota.height)<(barra.y+barra.height)){
			sonido_rebote.play();
			switch(direccion){
				case 5:
					direccion=0;
					break;
				case 4:
					direccion=1; 
					break;
				case 3:
					direccion=2;
					break;
				case 6:
					direccion=9;
					break;
				case 7:
					direccion=8;
					break;
			}
			//preguntar si se esta pulsando derecha o izquierda
			if ((myGameArea.key && myGameArea.key == 37) || movimientoBarra==1) {
				efectoPelota=1;
				switch(direccion){
					case 0:
						direccion=9;
						break;
					case 9:
						direccion=8;
						break;
					case 8:
						direccion=8;
						break;
					case 1:
						direccion=0;
						break;
					case 2:
						direccion=1;
						break;
				}
			} else if ((myGameArea.key && myGameArea.key == 39)  || movimientoBarra==2) {
				efectoPelota=2;
				switch(direccion){
					case 0:
						direccion=1;
						break;
					case 1:
						direccion=2;
						break;
					case 2:
						direccion=2;
						break;
					case 9:
						direccion=0;
						break;
					case 8:
						direccion=9;
						break;
				}
			} 
		}
	}
}

function colisionBloques(){ //como recorrer los bloques
	encontre=false;
	de_arriba=false; de_derecha=false;
	iFinal=filas; jFinal=columnas;
	i=0;
	if(direccion>=3 && direccion<=7){
		de_arriba=true;
	}else{
		i=filas-1;
		iFinal=0;
	}
	if(direccion>=6 && direccion<=9){
		de_derecha=true;
		jFinal=0;
	}

	if(de_arriba==true){
		while (i<iFinal && encontre==false){
			if(de_derecha==true){
				j=columnas-1;
				while (j>=jFinal && encontre==false){
					if (cuadro[i][j].estado=="activo"){
						analisisColisionBloques(i,j)
					}
					j--;
				}	
			}else{
				j=0;
				while (j<columnas && encontre==false){
					if (cuadro[i][j].estado=="activo"){
						analisisColisionBloques(i,j)
					}
					j++;
				}	
			}
			i++;
		}
	}else{
		while (i>=iFinal && encontre==false){
			if(de_derecha==true){
				j=columnas-1;
				while (j>=jFinal && encontre==false){
					if (cuadro[i][j].estado=="activo"){
						analisisColisionBloques(i,j)
					}
					j--;
				}	
			}else{
				j=0;
				while (j<columnas && encontre==false){
					if (cuadro[i][j].estado=="activo"){
						analisisColisionBloques(i,j)
					}
					j++;
				}	
			}
			i--;
		}
	}
	


}

function analisisColisionBloques(i,j){
	pelota_izq=pelota.x;
	pelota_der=pelota.x+pelota.width;
	pelota_sup=pelota.y;
	pelota_inf=pelota.y+pelota.height;
	pelota_med_v=pelota.y + (pelota.height/2);
	pelota_med_h=pelota.x + (pelota.width/2);
	bloque_izq=cuadro[i][j].x;
	bloque_der=cuadro[i][j].x+cuadro[i][j].width;
	bloque_sup=cuadro[i][j].y;
	bloque_inf=cuadro[i][j].y+cuadro[i][j].height;
				//si pega abajo
				if(pelota_med_h<=bloque_der && pelota_med_h>=bloque_izq && (pelota_sup>=bloque_inf-margen && pelota_sup<=bloque_inf+margen)){
						switch(direccion){
							case 0:
								if(efectoPelota==0){
									if(numeroAleatorio(2)==1){
										direccion=4;
									}else{
										direccion=6;
									}
								}else if(efectoPelota==1){
									direccion=7;
								}else{
									direccion=3;
								}
								break;
							case 1:
								if(efectoPelota==0){
									direccion=4;
								}else if(efectoPelota==1){
									direccion=5;
								}else{
									direccion=3;
								}
								break;
							case 2:
								direccion=3;
								break;
							case 9:
								if(efectoPelota==0){
									direccion=6;
								}else if(efectoPelota==1){
									direccion=7;
								}else{
									direccion=5;
								}
								break;
							case 8:
								direccion=7;
								break;
						}
						efectoPelota=0;
						encontre=true;
				//si pega en el lado derecho del bloque
				}else if(pelota_med_v<=bloque_inf+margen && pelota_med_v>=bloque_sup-margen &&(pelota_izq>=bloque_der-margen && pelota_izq<=bloque_der+margen)){
						switch(direccion){
							case 5:
								direccion=4;
								break;
							case 6:
								direccion=4;
								break;
							case 7:
								direccion=3;
								break;
							case 8:
								if(efectoPelota==0 || efectoPelota==2){
									direccion=2;
								}else{
									direccion=1;
								}
								break;
							case 9:
								if(efectoPelota==0){
									direccion=1;
								}else if(efectoPelota==1){
									direccion=0;
								}else{
									direccion=2;
								}
								break;
							case 0:
								direccion=1;
								break;
						}
						efectoPelota=0;
						encontre=true;
				//pega del lado izquierdo del bloque
				}else if(pelota_med_v<=bloque_inf+margen && pelota_med_v>=bloque_sup-margen &&(pelota_der<=bloque_izq+margen && pelota_der>=bloque_izq-margen)){
						switch(direccion){
							case 0:
								direccion=9;
								break;
							case 1:
								if(efectoPelota==0){
									direccion=9;
								}else if(efectoPelota==1){
									direccion=0;
								}else{
									direccion=8;
								}
								break;
							case 2:
								if(efectoPelota==0){
									direccion=8;
								}else if(efectoPelota==1){
									direccion=9;
								}else{
									direccion=8;
								}
								break;
							case 3:
								direccion=7;
								break;
							case 4:
								direccion=6;
								break;
							case 5:
								direccion=6;
								break;	
							
						}
						efectoPelota=0;
						encontre=true;
				//si le pega de arriba al bloque
				}else if(pelota_med_h<=bloque_der && pelota_med_h>=bloque_izq && (pelota_inf>=bloque_sup-margen && pelota_inf<=bloque_sup+margen)){
						switch(direccion){
							case 3:
								direccion=2;
								break;
							case 4:
								direccion=1;
								break;
							case 5:
								direccion=0;
								break;
							case 6:
								direccion=9;
								break;
							case 7:
								direccion=8;
								break;
						}
						encontre=true;
				//esquina sup derecha
				}else if((pelota_med_h>=bloque_der-margen && pelota_izq<=bloque_der+margen &&(pelota_inf>=bloque_sup-margen && pelota_inf<=bloque_sup+margen)) ||
							(pelota_med_v<=bloque_sup+margen && pelota_inf>=bloque_sup-margen &&(pelota_izq>=bloque_der-margen && pelota_izq<=bloque_der+margen))){
					switch(direccion){
						case 3:
							direccion=2;
							break;
						case 4:
							direccion=2;
							break;
						case 5:
							direccion=1;
							break;
						case 6:
							direccion=1;
							break;
						case 7:
							direccion=2;
							break;
						case 8:
							direccion=1;
							break;
						case 9:
							direccion=0;
							break;
					}
					encontre=true;
				//esquina sup izquierda
				}else if((pelota_der>=bloque_izq-margen && pelota_med_h<=bloque_izq+margen &&(pelota_inf>=bloque_sup-margen && pelota_inf<=bloque_sup+margen)) ||
							(pelota_med_v<=bloque_sup+margen && pelota_inf>=bloque_sup-margen &&(pelota_der>=bloque_izq-margen && pelota_der<=bloque_izq+margen))){
					switch(direccion){
						case 1:
							direccion=0;
							break;
						case 2:
							direccion=9;
							break;
						case 3:
							direccion=8;
							break;
						case 4:
							direccion=9;
							break;
						case 5:
							direccion=6;
							break;
						case 6:
							direccion=8;
							break;
						case 7:
							direccion=8;
							break;
					}
					encontre=true;
				//esquina inf derecha
				}else if((pelota_med_h>=bloque_der-margen && pelota_izq<=bloque_der+margen && (pelota_sup>=bloque_inf-margen && pelota_sup<=bloque_inf+margen)) ||
							(pelota_med_v>=bloque_inf-margen && pelota_sup<=bloque_inf+margen &&(pelota_izq>=bloque_der-margen && pelota_izq<=bloque_der+margen))){
					switch(direccion){
						case 0:
							direccion=4;
							break;
						case 1:
							direccion=3;
							break;
						case 2:
							direccion=3;
							break;
						case 6:
							direccion=4;
							break;
						case 7:
							direccion=3;
							break;
						case 8:
							direccion=3;
							break;
						case 9:
							direccion=4;
							break;
					}
					encontre=true;
				//esquina inf izquierda
				}else if((pelota_med_h<=bloque_izq+margen && pelota_der>=bloque_izq-margen && (pelota_sup>=bloque_inf-margen && pelota_sup<=bloque_inf+margen)) ||
							(pelota_med_v>=bloque_inf-margen && pelota_sup<=bloque_sup+margen &&(pelota_der>=bloque_izq-margen && pelota_der<=bloque_izq+margen))){
					switch(direccion){
						case 0:
							direccion=6;
							break;
						case 1:
							direccion=7;
							break;
						case 2:
							direccion=7;
							break;
						case 3:
							direccion=6;
							break;
						case 4:
							direccion=6;
							break;
						case 8:
							direccion=7;
							break;
						case 9:
							direccion=7;
							break;
					}
					encontre=true;
				}
				if (encontre==true){
					explotar(i,j);
				}
}

function explotar(fila, columna){
		if (cuadro[fila][columna].tipo=="gris"){
			if(cuadro[fila][columna].golpes<punto_rotura){
				cuadro[fila][columna].golpes++;
				sonido_metal.play();
			}else{
				sonido_rebote.play();
				controlEstrellas("gris",cuadro[fila][columna].x);
				cuadro[fila][columna].estado="explota";
				cuadro[fila][columna].tipo="explota";
				cuadro[fila][columna].contador++;
			}
		}else{
			sonido_rebote.play();
			controlEstrellas(cuadro[fila][columna].tipo, cuadro[fila][columna].x);
			cuadro[fila][columna].estado="explota";
			cuadro[fila][columna].tipo="explota";
			cuadro[fila][columna].contador++;
		}
	
}

function controlEstrellas(tipoEstrella, xBloque){//genera las estrellas
	var tipo= tipoEstrella;
	var ladoEstrella=anchoBarra/4;
	if(tipo=="gris"){
			cant_estrellas_gris=cant_estrellas_gris+1;
			if(cant_estrellas_gris==cant_bloques_para_estrella){
				estrellas[topeEstrella]= new componente(ladoEstrella, ladoEstrella, "estrella_gris", xBloque, -20);
				topeEstrella=topeEstrella+1;
				cant_estrellas_gris=0;
				contador_estrellas_blancas++;
			}
		}else if(tipo=="azul"){
			cant_estrellas_azul=cant_estrellas_azul+1;
			if(cant_estrellas_azul==cant_bloques_para_estrella){
				estrellas[topeEstrella]=  new componente(ladoEstrella, ladoEstrella, "estrella_azul", xBloque, -20);
				topeEstrella=topeEstrella+1;
				cant_estrellas_azul=0;
				contador_estrellas_blancas++;
			}
		}else if(tipo=="amarillo"){
			cant_estrellas_amarillo=cant_estrellas_amarillo+1;
			if(cant_estrellas_amarillo==cant_bloques_para_estrella){
				estrellas[topeEstrella]=  new componente(ladoEstrella, ladoEstrella, "estrella_amarillo", xBloque, -20);
				topeEstrella=topeEstrella+1;
				cant_estrellas_amarillo=0;
				contador_estrellas_blancas++;
			}
		}else if(tipo=="naranja"){
			cant_estrellas_naranja=cant_estrellas_naranja+1;
			if(cant_estrellas_naranja==cant_bloques_para_estrella){
				estrellas[topeEstrella]=  new componente(ladoEstrella, ladoEstrella, "estrella_naranja", xBloque, -20);
				topeEstrella=topeEstrella+1;
				cant_estrellas_naranja=0;
				contador_estrellas_blancas++;
			}
		}else if(tipo=="verde"){
			cant_estrellas_verde=cant_estrellas_verde+1;
			if(cant_estrellas_verde==cant_bloques_para_estrella){
				estrellas[topeEstrella]= new componente(ladoEstrella, ladoEstrella, "estrella_verde", xBloque, -20);
				topeEstrella=topeEstrella+1;
				cant_estrellas_verde=0;
				contador_estrellas_blancas++;
			}
		}else if(tipo=="violeta"){
			cant_estrellas_violeta=cant_estrellas_violeta+1;
			if(cant_estrellas_violeta==cant_bloques_para_estrella){
				estrellas[topeEstrella]=  new componente(ladoEstrella, ladoEstrella, "estrella_violeta", xBloque, -20);
				topeEstrella=topeEstrella+1;
				cant_estrellas_violeta=0;
				contador_estrellas_blancas++;
			}
		}
		if(contador_estrellas_blancas==cant_max_estrellas_blancas){
			estrellas[topeEstrella]=  new componente(ladoEstrella, ladoEstrella, "estrella_blanca", (anchoCanvas/2), ladoEstrella*(-1));
			topeEstrella=topeEstrella+1;
			contador_estrellas_blancas=0;
		}
}

function eliminarExplotados(){
	for (i=0;i<filas;i++){
		for (j=0;j<columnas;j++){
			if(cuadro[i][j].estado=="explota"){
				if (cuadro[i][j].contador<7){
					cuadro[i][j].contador++;
				}else{
					cuadro[i][j].estado="borrado";
					cuadro[i][j].tipo="borrado";
					puntos=puntos+10;
					actualizarDatos();
					totalBloques--;
				}
			}
		}
	}
}

function cargarMuro(){
	var j=0;
	for (i=0;i<=largo_muro_h;i++){
		muro_h[i]= new componente(altoPiezaMuro, anchoPiezaMuro, "muro_h", j, 0);
		j=j+altoPiezaMuro;
	}
	j=anchoPiezaMuro;
	for (i=0;i<largo_muro_v;i++){
		muro_v_1[i]= new componente(anchoPiezaMuro, altoPiezaMuro, "muro_v", 0, j);
		muro_v_2[i]= new componente(anchoPiezaMuro, altoPiezaMuro, "muro_v", anchoCanvas-anchoPiezaMuro, j);
		j=j+altoPiezaMuro;
	}
}
function vaciarTablero(){
	for(i=0;i<filas;i++){
		cuadro[i].delete();
	}
}

function cargarTablero(){
	var colorAleatorio;
	var alto=altoBloque;
	var ancho=anchoBloque;
	var cant_columnas=0;
	var x=anchoPiezaMuro+separacionBloques;
	//var xAux=x;
	var y=altoCanvas/7;
	totalBloques=filas*columnas;
	if(nivel==1){
		for(i=0;i<filas;i++){
			x=anchoPiezaMuro+separacionBloques;
			cuadro[i]= new Array(columnas);
			for(j=0;j<columnas;j++){
				colorAleatorio=elegirColor(numeroAleatorio(5));
				cuadro[i][j]= new componente(ancho,alto,colorAleatorio,x,y);
				x=x+ancho+separacionBloques;
			}
			y=y+alto+separacionBloques;
		}
	}else if(nivel==2){
		filas=6;
		totalBloques=filas*columnas;
		for(i=0;i<filas;i++){
			x=anchoPiezaMuro+separacionBloques;
			cuadro[i]= new Array(columnas);
			for(j=0;j<columnas;j++){
				colorAleatorio=elegirColor(numeroAleatorio(6));
				cuadro[i][j]= new componente(ancho,alto,colorAleatorio,x,y);
				x=x+ancho+separacionBloques;
			}
			y=y+alto+separacionBloques;
		}
	}else if(nivel==3){
		totalBloques=64;
		filas=8;
		for(i=0;i<filas;i++){
			x=anchoPiezaMuro+separacionBloques;
			cuadro[i]= new Array(columnas);
			for(j=0;j<columnas;j++){
				if(j>=cant_columnas && j<=((columnas-cant_columnas)-1)){
					if(j==cant_columnas || j==(columnas-cant_columnas)-1){
						cuadro[i][j]= new componente(ancho,alto,"gris",x,y);
					}else{
						colorAleatorio=elegirColor(numeroAleatorio(5));
					cuadro[i][j]= new componente(ancho,alto,colorAleatorio,x,y);
					}
					
				}else{
					cuadro[i][j]= new componente(ancho,alto,"ninguno",x,y);
					cuadro[i][j].estado="borrado";
				}
				x=x+ancho+separacionBloques;
			}
			y=y+alto+separacionBloques;
			cant_columnas++;
		}
	}else if(nivel==4){
		filas=6;
		totalBloques=filas*columnas;
		for(i=0;i<filas;i++){
			x=anchoPiezaMuro+separacionBloques;
			cuadro[i]= new Array(columnas);
			for(j=0;j<columnas;j++){
				if(j==0 || j==columnas-1){
					cuadro[i][j]= new componente(ancho,alto,"gris",x,y);
				}else{
					if(i==0 || i==filas-1){
						cuadro[i][j]= new componente(ancho,alto,"gris",x,y);
					}else{
						colorAleatorio=elegirColor(numeroAleatorio(6));
						cuadro[i][j]= new componente(ancho,alto,colorAleatorio,x,y);
					}
				}
				x=x+ancho+separacionBloques;
			}
			y=y+alto+separacionBloques;
		}

	}else if(nivel==5){
		totalBloques=63;
		filas=7;
		for(i=0;i<filas;i++){
			x=anchoPiezaMuro+separacionBloques;
			cuadro[i]= new Array(columnas);
			for(j=0;j<columnas;j++){
				if(j>=cant_columnas && j<=((columnas-cant_columnas)-1)){
					cuadro[i][j]= new componente(ancho,alto,"gris",x,y);
				}else{
					cuadro[i][j]= new componente(ancho,alto,"ninguno",x,y);
					cuadro[i][j].estado="borrado";
				}
				x=x+ancho+separacionBloques;
			}
			y=y+alto+separacionBloques;
			cant_columnas++;
		}
	}else if(nivel==6){
		filas=7;
		totalBloques=filas*columnas;
		for(i=0;i<filas;i++){
			x=anchoPiezaMuro+separacionBloques;
			cuadro[i]= new Array(columnas);
			for(j=0;j<columnas;j++){
				if(j>=cant_columnas && j<=((columnas-cant_columnas)-1)){
					cuadro[i][j]= new componente(ancho,alto,"gris",x,y);
				}else{
					colorAleatorio=elegirColor(numeroAleatorio(5));
					cuadro[i][j]= new componente(ancho,alto,colorAleatorio,x,y);
				}
				x=x+ancho+separacionBloques;
			}
			y=y+alto+separacionBloques;
			cant_columnas++;
		}
	}else if(nivel==7){
		filas=8;
		totalBloques=56;
		for(i=filas-1;i>=0;i--){
			x=anchoPiezaMuro+separacionBloques;
			cuadro[i]= new Array(columnas);
			for(j=0;j<columnas;j++){
				if(j>=cant_columnas && j<=((columnas-cant_columnas)-1)){
					cuadro[i][j]= new componente(ancho,alto,"ninguno",x,y);
					cuadro[i][j].estado="borrado";
				}else{
					cuadro[i][j]= new componente(ancho,alto,"gris",x,y);
				}
				x=x+ancho+separacionBloques;
			}
			y=y+alto+separacionBloques;
			cant_columnas++;
		}
	}else if(nivel==8){
		filas=8;//8
		totalBloques=filas*columnas;
		for(i=filas-1;i>=0;i--){
			x=anchoPiezaMuro+separacionBloques;
			cuadro[i]= new Array(columnas);
			for(j=0;j<columnas;j++){
				if(j>=cant_columnas && j<=((columnas-cant_columnas)-1)){
					colorAleatorio=elegirColor(numeroAleatorio(5));
					cuadro[i][j]= new componente(ancho,alto,colorAleatorio,x,y);
				}else{
					cuadro[i][j]= new componente(ancho,alto,"gris",x,y);
				}
				x=x+ancho+separacionBloques;
			}
			y=y+alto+separacionBloques;
			cant_columnas++;
		}
	}else if(nivel==9){
		filas=8;//8
		totalBloques=filas*columnas;
		for(i=0;i<filas;i++){
			x=anchoPiezaMuro+separacionBloques;
			cuadro[i]= new Array(columnas);
			for(j=0;j<columnas;j++){
				if(j % 2==0){
					colorAleatorio=elegirColor(numeroAleatorio(5));
					cuadro[i][j]= new componente(ancho,alto,colorAleatorio,x,y);
				}else{
					cuadro[i][j]= new componente(ancho,alto,"gris",x,y);
				}
				x=x+ancho+separacionBloques;
			}
			y=y+alto+separacionBloques;
		}
	}else if(nivel==10){
		filas=7;
		totalBloques=filas*columnas;
		for(i=0;i<filas;i++){
			x=anchoPiezaMuro+separacionBloques;
			cuadro[i]= new Array(columnas);
			for(j=0;j<columnas;j++){
				if(i % 2==0){
					cuadro[i][j]= new componente(ancho,alto,"gris",x,y);
				}else{
					colorAleatorio=elegirColor(numeroAleatorio(5));
					cuadro[i][j]= new componente(ancho,alto,colorAleatorio,x,y);
				}
				x=x+ancho+separacionBloques;
			}
			y=y+alto+separacionBloques;
		}
	}
}

function elegirColor(col){
	var colorElegido;
	switch(col){
		case 1:
			colorElegido="amarillo";
			break;
		case 2:
			colorElegido="azul";
			break;
		case 3:
			colorElegido="naranja";
			break;
		case 4:
			colorElegido="verde";
			break;
		case 5:
			colorElegido="violeta";
			break;
		case 6:
			colorElegido="gris";
			break;
		default:
			colorElegido="gris";
	}
	return colorElegido;
}




function numeroAleatorio(cant){
	var aux=0;
	var aleatorio=0;
	aleatorio = Math.floor(Math.random() * cant)+1;
	return aleatorio;
}

