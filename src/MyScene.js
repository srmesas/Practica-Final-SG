/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (unRenderer) {
    super();

    this.audio= new AudioFondo();
    this.add(this.audio);

    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.createGUI ();

    // Construimos los distinos elementos que tendremos en la escena
    this.createLights ();

    // Ejes
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);

    // Nave
    this.nave = new Nave
    this.add (this.nave);

    // Parametros para el manejo de la nave
    this.moveLeft = false;
    this.moveRight = false;
    this.angulo=0;
    this.anguloInverso=-Math.PI;
    this.parametro=0.5;

    // Cámara
    this.createCamera (unRenderer);

    //SkyBox
    this.skybox = new SkyBox();
    this.add(this.skybox);

    // Pista
    this.pista = new Pista(this.skybox.getMapaTexturas());
    this.add(this.pista);

    // Al crear la escena medimos el tiempo actual
    this.espacio=0;
    this.t0 =  Date.now();

    // Se coloca la nave sobre la pista
    var posicion = this.pista.obtenerPunto(this.espacio);
    this.nave.position.copy(posicion);
    var tangente = this.pista.obtenerTangente(this.espacio);
    posicion.add(tangente);
    this.nave.lookAt(posicion);

  }

  //Se crea la cámara
  createCamera (unRenderer) {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.add( this.audio.listener );
    
    // La cámara cuelga de un Object3D de la nave
    this.nave.contenedorRotacion.add (this.camera);

    // También se indica dónde se coloca, respecto al Object3D de Nave
    this.camera.position.set (0,1.2,-2.2);

    // Se posiciona la cámara para que mire siempre a la nave
    var target = this.nave.position.clone();
    this.camera.getWorldPosition(target);
    this.camera.lookAt(target);
    this.camera.rotation.y = Math.PI;
  }

  // Gui para los ejes
  createGUI () {
    // Se definen los controles que se modificarán desde la GUI
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      this.axisOnOff = true;
      this.onBoard = false;
    }

    // Accedemos a la variable global   gui   declarada en   script.js   para añadirle la parte de interfaz que corresponde a los elementos de esta clase

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Ejes');

    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes escena: ');
    folder.add (this.guiControls, 'onBoard').name ('Cámara a bordo: ');
  }

  // Se crean las luces
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);

    //Luz del sol
    this.sunLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
    this.sunLight.position.set( 0, 750, 100 );
    this.add (this.sunLight);

    //Luces que refleja el planeta
    this.pointLightBlue = new THREE.PointLight( 0x0000ff, 0.6 );
    this.pointLightBlue.position.set( 0, -750, 200 );
    this.add (this.pointLightBlue);

    this.pointLightYellow = new THREE.PointLight( 0x9db000, 0.6 );
    this.pointLightYellow.position.set( 0, -750, -200 );
    this.add (this.pointLightYellow);

    /*var light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
    light.position.set( 0, 750, 100 );

    var textureLoader = new THREE.TextureLoader();

    var textureFlare0 = textureLoader.load( "../imgs/lensflare0.png" );
    var textureFlare1 = textureLoader.load( "../imgs/lensflare1.png" );
    var textureFlare2 = textureLoader.load( "../imgs/lensflare2.png" );
    var textureFlare3 = textureLoader.load( "../imgs/lensflare3.png" );

    var lensflare = new THREE.Lensflare();

    lensflare.addElement( new THREE.LensflareElement( textureFlare0, 512, 0 ) );
    lensflare.addElement( new THREE.LensflareElement( textureFlare1, 512, 0 ) );
    lensflare.addElement( new THREE.LensflareElement( textureFlare2, 60, 0.6 ) );
    lensflare.addElement( new THREE.LensflareElement( textureFlare3, 60, 0.6 ) );

    light.add( lensflare );
    this.add(light);*/
  }

  // En principio se devuelve la única cámara que tenemos
  // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
  getCamera () {
    return this.camera;
  }

  setCameraAspect (ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  update () {
    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui

    // Se muestran o no los ejes según lo que idique la GUI
    this.axis.visible = this.guiControls.axisOnOff;
    //this.ejes3.visible = this.guiControls.axisOnOff;

    //this.cameraControl.update();

    // Se actualiza la posición de la cámara según el ángulo de la nave
    /*if(this.angulo < -0.3 && this.angulo > -Math.PI/2){
      this.camera.position.set (0,1.2-this.angulo*this.parametro,-2.2+this.angulo);
    }else if(this.angulo <= -Math.PI/2 && this.angulo > -Math.PI-0.3){
      this.camera.position.set (0,1.2-this.anguloInverso*this.parametro,-2.2+this.anguloInverso);
    }else{
      this.camera.position.set (0,1.2,-2.2);
    }*/

    //if (this.moveLeft) this.angulo-=0.2;//this.nave.rotar(-0.2);//this.nave.moveLeft();
    //if (this.moveRight) this.angulo+=0.2;//this.nave.rotar(0.2);//this.nave.moveRight();
    //this.nave.rotar(this.angulo);

    //this.nave.update();

    // Se mide el tiempo actual
    var t1 = Date.now();
    // Se calcula el tiempo transcurrido
    var tiempoTranscurrido = (t1-this.t0) /10000;
    // La nave avanza un espacio igual al tiempoTranscurrido
    // this.espacio comprende valores de 0 a 1, que es el porcentaje de la pista recorrido
    this.espacio += tiempoTranscurrido;

    // Colisiones

    // Se crea la variable cubo
    var cubo;
    for(var i = this.pista.obtenerNumeroCubos()-1; i >=0; i--){
      // En cada iteración obtenemos el cubo i del array de cubos almacenados
      cubo = this.pista.obtenerCubo(i);

      // Se comprueba si el cubo es cercano
      if (cubo.porcentajePista < this.espacio+0.01
      && cubo.porcentajePista > this.espacio-0.01){
        // Se obtienen las coordenadas de mundo del cubo i y la nave
        var posicionCubo = cubo.children[0].children[0].position.clone();
        var posicionNave = this.nave.getPosicion().clone();
        cubo.children[0].children[0].getWorldPosition(posicionCubo);
        this.nave.contenedorRotacion.children[0].getWorldPosition(posicionNave);
        
        // Se calcula la distancia entre el cubo i y la nave con las coordenadas de mundo
        var distancia=posicionNave.distanceTo(posicionCubo);

        // Se comprueba si el cubo i colisiona con la nave
        if (distancia < cubo.radio*2){
          // Se cambia el color del cubo que ha colisionado
          cubo.children[0].children[0].material = new THREE.MeshPhongMaterial( {color: 0x0000ff, emissive:0x0000ff, emissiveIntensity:0.3} );
        }
      }
    }
    
    // Reinicio del circuito
    if(this.espacio > 1){
      this.espacio = 0;
    }

    // Se obtiene el punto de la pista
    var posicion = this.pista.obtenerPunto(this.espacio);
    // Se posiciona la nave en dicho punto
    this.nave.position.copy(posicion);
    // Se pone la nave en paralelo al circuito
    var tangente = this.pista.obtenerTangente(this.espacio);
    posicion.add(tangente);
    this.nave.lookAt(posicion);

    // Actualizamos el tiempo
    this.t0 = t1;
  }

  // La nave gira a la izquierda
  naveMoveLeft(booleano){
    if(booleano){
      this.angulo-=0.25;
      this.anguloInverso+=0.25;
      this.nave.rotar(this.angulo);
    }
  }

  // La nave gira a la derecha
  naveMoveRight(booleano){
    if(booleano){
      this.angulo+=0.25;
      this.anguloInverso-=0.25;
      this.nave.rotar(this.angulo);
    }
  }
}

//enableControls = true; 
/*
moveLeft = false;
moveRight = false;
angulo=0;
enableControls = true; 

window.addEventListener("keydown", onKeyDown, true);
window.addEventListener("keyup", onKeyUp, true);

  function onKeyDown (event) {
    if (enableControls) {
      switch ( event.keyCode ) {
  
        case 37: // left
        case 65: // a
          moveLeft = true;
          break;
  
        case 39: // right
        case 68: // d
          moveRight = true;
          break;
  
        //case 32: // space
        //  shoot = true;
        //  break;
      }
    }
  }
  
  function onKeyUp (event) {
    if (enableControls) {
      switch ( event.keyCode ) {
  
        case 37: // left
        case 65: // a
          moveLeft = false;
          break;
  
        case 39: // right
        case 68: // d
          moveRight = false;
          break;
  
        //case 32: // space
        //  shoot = false;
        //  break;
      }
    }
  }
*/

