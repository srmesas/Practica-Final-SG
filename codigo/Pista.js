
class Pista extends THREE.Object3D {
  constructor() {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI();

    this.curva = new THREE.EllipseCurve(0,  0,            // ax, aY
      30, 10,           // xRadius, yRadius
      0,  2 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
    );
    var puntos2D = this.curva.getPoints( 50 );
    //console.log(puntos2D);
    var puntos3D=[];
    for(var i=0; i< puntos2D.length; i++){
      puntos3D.push(new THREE.Vector3(puntos2D[i].x,0,puntos2D[i].y));
    }
    //console.log(puntos3D);
    this.spline = new THREE.CatmullRomCurve3(puntos3D);
    this.opciones = {steps: 50, curveSegments: 50, extrudePath: this.spline};
    this.geometriaBarrido = new THREE.TubeGeometry(this.spline, 
      100, //steps
      0.5, // radio
      6,   // caras laterales
      false);
    this.material = new THREE.MeshPhongMaterial( { color : 0xff0000 } );
    //this.material.side = THREE.DoubleSide;
    this.barrido = new THREE.Mesh( this.geometriaBarrido , this.material);
    this.add(this.barrido);

    /*
  
      */
  }

  obtenerPunto(punto){
    return this.spline.getPointAt(punto);
  }

  obtenerTangente(punto){
    return this.spline.getTangentAt(punto);
  }

  createGUI () {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.posY = 0.2;
      this.Rotate = 0;
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.posY = 0.2;
        this.Rotate = 0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ();
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    //folder.add (this.guiControls, 'h', 1.0, 2.0, 0.1).name ('Tamaño caja roja: ').listen();
    folder.add (this.guiControls, 'posY', 0.2,2, 0.2).name ('PosY: ').listen();
    folder.add (this.guiControls, 'Rotate', 0,2*Math.PI, 0.2).name ('Rotacion: ').listen();
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');

    
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    //this.rotation.z = this.guiControls.r;

    //this.contenedorCajaMorada.scale.y=this.guiControls.h2;
    //this.cajaMorada.rotation.z = this.guiControls.r2;
    //var time = Date.now();
    //var segundosTranscurridos = ( t1-this.t0) /1000;

    /*var looptime = 20000;//20  segundos
    var t = (time % looptime)/looptime;//Se coloca y orienta el objeto a animar
    var posicion = this.spline.getPointAt(t);
    this.cajaVerde1.position.copy(posicion);
    var tangente = this.spline.getTangentAt(t);
    posicion.add(tangente);//Se  mira a un punto en esa dirección
    this.cajaVerde1.lookAt(posicion);*/

    //this.contenedorCajaMorada.rotation.z = this.guiControls.r2;
    //this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    //this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    //if(this.ok == false){
    //  this.cajaRoja.scale.y++;
    //  this.caja
    //}
  }
}
