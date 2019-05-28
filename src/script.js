
/// La escena que tendrá todo lo que se tiene en cuenta al hacer un render
//  Lo que no esté incluido en la escena no será procesado por el renderer
scene = null;

/// La variable que referenciará al renderer
renderer = null;

/// El objeto que referencia a la interfaz gráfica de usuario
gui = null;

// objeto que referencia a los Stats
var stats = null;

//Permite el uso de los controles
var enableControls = false;

/// Se crea y configura un renderer WebGL
/**
 * El renderer recorrerá el grafo de escena para procesarlo y crear la imagen resultante.
 * Debe hacer este trabajo para cada frame.
 * Si se cambia el grafo de escena después de visualizar un frame, los cambios se verán en el siguiente frame.
 *
 * @return El renderer
 */
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  // Se establece un color de fondo en las imágenes que genera el render
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

  // Se establece el tamaño, se aprovoche la totalidad de la ventana del navegador
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Se crean Stats
  stats = new Stats();
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  container.appendChild( stats.dom );

  return renderer;
}

/// Función que se encarga de renderizar un frame
/**
 * Se renderiza la escena, captada por una cámara.
 */
function render() {
  // Se solicita que La próxima vez que haya que refrescar la ventana se ejecute una determinada función, en este caso la funcion render.
  // La propia función render es la que indica que quiere ejecutarse la proxima vez
  // Por tanto, esta instrucción es la que hace posible que la función  render  se ejecute continuamente y por tanto podamos crear imágenes que tengan en cuenta los cambios que se la hayan hecho a la escena después de un render.
  requestAnimationFrame(render);

  // Se le pide a la escena que se actualice antes de ser renderizada
  scene.update();
  stats.update();
  // Por último, se le pide al renderer que renderice la escena que capta una determinada cámara, que nos la proporciona la propia escena.
  renderer.render(scene, scene.getCamera());
}

/// Función que actualiza la razón de aspecto de la cámara y el tamaño de la imagen que genera el renderer en función del tamaño que tenga la ventana
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

/// La función principal
$(function () {
  // Se crea el renderer
  renderer = createRenderer();

  //PARA DEJAR DE MOSTRAR EL MENÚ
  instructions = document.getElementById('instrucciones');
  //var pausa = document.getElementById('pausa');
  //cuando se hace click se dea de mostrar el elemento instrucciones
  window.addEventListener('keydown', function(event){
    switch ( event.keyCode ){
      case 13://enter
        //comenzamos el juego
        instructions.style.visibility = 'hidden';
        enableControls = true;
        scene.comenzarMovimiento();
        break;
      case 80: //p
        
        //instructions.style.fontSize = "30px";
        instructions.innerHTML =  "PAUSADO"+ "<br/>"+ 
                                  "<p>Pulsa ENTER para continuar</p>"+
                                  "<p>Pulsa ➡ o D para girar a la derecha</p>"+
                                  "<p>Pulsa ⬅ o A para girar a la izquierda</p>"+
                                  "<p>Pulsa P para pausar el juego</p>";
        instructions.style.visibility = 'visible';
        enableControls = false;
        scene.pausarJuego();
        break;
    }
  },false);

  // La salida del renderer se muestra en un DIV de la página index.html
  $("#WebGL-output").append(renderer.domElement);

  // listeners
  // Cada vez que el usuario cambie el tamaño de la ventana se llama a la función que actualiza la cámara y el renderer
  window.addEventListener ("resize", onWindowResize);

  //Se activa al pulsar una tecla
  window.addEventListener("keydown", onKeyDown, true);
  //Se activa al soltar una tecla
  window.addEventListener("keyup", onKeyUp, true);
  
  // Se crea una interfaz gráfica de usuario vacia
  gui = new dat.GUI();

  // Se crea la escena. La escena es una instancia de nuestra propia clase encargada de crear y gestionar todos los elementos que intervienen en la escena.
  scene = new MyScene (renderer.domElement);

  // Finalmente, realizamos el primer renderizado.
  render();
});


//Manejo de eventos de teclado

function onKeyDown (event) {
  if (enableControls) {
    switch ( event.keyCode ) {

      case 37: // left
      case 65: // a
        scene.naveMoveLeft(true);
        break;

      case 39: // right
      case 68: // d
        scene.naveMoveRight(true);
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
        scene.naveMoveLeft(false);
        break;

      case 39: // right
      case 68: // d
        scene.naveMoveRight(false);
        break;
      //case 32: // space
      //  shoot = false;
      //  break;
    }
  }
}
