
class Pista extends THREE.Object3D {
  // Construimos la pista con el mapa de texturas
  constructor(mapa) {
    super();

    // Se obtienen los puntos en 2 dimensiones que conformarán el circuito
    this.curva = new THREE.EllipseCurve(
      0,  0,            // ax, aY
      50, 50,           // xRadius, yRadius
      0,  2 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
    );
    var puntos2D = this.curva.getPoints( 50 );

    // Se transforman los puntos 2D en puntos 3D
    var puntos3D=[];
    for(var i=0; i< puntos2D.length; i++){
      puntos3D.push(new THREE.Vector3(puntos2D[i].x,0,puntos2D[i].y));
    }

    // Se crea el spline con los puntos 3D
    this.spline = new THREE.CatmullRomCurve3(puntos3D);
    // Se crea el barrido con el spline
    this.geometriaBarrido = new THREE.TubeGeometry(this.spline, 
      100,  // steps
      0.5,  // radio
      30,   // caras laterales
      true  // tubo cerrado
    );

    // Se obtiene la refracción del mapa de texturas
    mapa.mapping = THREE.CubeRefractionMapping;
    
    // Se crea el material del tubo con refracción y reflectividad
    this.material = new THREE.MeshPhongMaterial( { color: 0xccddff, envMap: mapa, refractionRatio: 0.98, reflectivity: 0.9 } );

    // Se crea el mesh del tubo
    this.barrido = new THREE.Mesh( this.geometriaBarrido , this.material);
    this.add(this.barrido);

    // Se crea el array donde se almacenarán los cubos-obstáculos
    this.cubos=[];

    var particleCount=20;
    var explosionPower =1.06;

    console.log(puntos3D.length);

    for(var i=0; i< puntos3D.length; i++){
      //No creamos el cubo 0,1 y puntos3D.length-1
      if(i>2 && i<puntos3D.length-1){
        // Se crea el cubo i
        var geometry = new THREE.BoxBufferGeometry( 0.25, 0.25, 0.25 );
        var material = new THREE.MeshPhongMaterial( {color: 0x00ff00,emissive:0x00ff00, emissiveIntensity:0.3} );
        var cubo = new THREE.Mesh( geometry, material );

        // Se posiciona el cubo i con la altura suficiente para que asome por el tubo
        cubo.position.set(0,0.1+0.5,0);

        // Se crea un contendor del cubo encargado de rotar el cubo a una posición dentro de la pista
        var rotacionCaja = new THREE.Object3D();
        // La rotación es aleatoria
        rotacionCaja.rotation.z = Math.floor((Math.random() * 2*Math.PI)+0.00);

        // Se crea el contenedor encargado de posicionar el cubo i en el tubo
        var posicionCaja = new THREE.Object3D();
        posicionCaja.position.copy(this.obtenerPunto(i/puntos3D.length));
        // Y se orientan correctamente
        posicionCaja.lookAt(puntos3D[i]);

        // Se define el lugar en el que se ubica el cubo i
        posicionCaja.porcentajePista = i/puntos3D.length;

        // Se le asigna un radio de colisión
        posicionCaja.radio = 0.12;
        
        // Se añaden los cubos a la pista
        rotacionCaja.add(cubo);
        posicionCaja.add(rotacionCaja);
        this.add(posicionCaja);

        // Se añade el cubo i al array de cubos
        this.cubos.push(posicionCaja);
      }
    }
  }

  // Se obtiene el número total de cubos en el array
  obtenerNumeroCubos(){
    return this.cubos.length;
  }

  // Se obtiene el cubo i
  obtenerCubo(i){
    return this.cubos[i];
  }

  // Se obtiene el punto "punto" del spline
  obtenerPunto(punto){
    return this.spline.getPointAt(punto);
  }

  // Se obtiene la tangente del "punto" del spline
  obtenerTangente(punto){
    return this.spline.getTangentAt(punto);
  }
}
