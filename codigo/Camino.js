
class Pendulo extends THREE.Object3D {
  constructor(nombre) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(nombre);

    // Un Mesh se compone de geometría y material
    //this.geometry = new THREE.BoxGeometry (1,1,1);
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    //this.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(-5,0.5,0));
    // Como material se crea uno a partir de un color
    var materialVerde = new THREE.MeshPhongMaterial({color: 0x00FF00});
    var geometriaCajaVerde1 = new THREE.BoxGeometry (1,1,2);
    //geometriaCajaVerde1.rotateY(Math.PI/2);
    this.cajaVerde1 = new THREE.Mesh( geometriaCajaVerde1 ,  materialVerde);
    
    this.ContenedorCajaVerde = new THREE.Object3D();
    this.ContenedorRotacion = new THREE.Object3D();
    this.ContenedorRotacion.add(this.cajaVerde1);

    this.ContenedorCajaVerde.add(this.ContenedorRotacion);
    this.ContenedorRotacion.add(this.cajaVerde1);

    
    this.add(this.ContenedorCajaVerde);

    this.puntos=[];
    this.puntos.push(new THREE.Vector3(0,0,0));
    this.puntos.push(new THREE.Vector3(3,7,0));
    this.puntos.push(new THREE.Vector3(5,10,-10));
    this.puntos.push(new THREE.Vector3(8,10,10));
    this.puntos.push(new THREE.Vector3(2,-10,10));
    this.puntos.push(new THREE.Vector3(0,-10,10));
    this.puntos.push(new THREE.Vector3(-2,-10,10));
    this.puntos.push(new THREE.Vector3(-7,5,5));
    this.puntos.push(new THREE.Vector3(-8,4,5));
    this.puntos.push(new THREE.Vector3(-7,4,0));
    this.puntos.push(new THREE.Vector3(0,0,0));
    //this.resolucion=5;

    this.spline = new THREE.CatmullRomCurve3(this.puntos);

    this.lineGeometry = new THREE.Geometry();
    //this.lineGeometry.vertices = this.puntos;
    this.lineGeometry.vertices = this.spline.getPoints(100);
    this.line = new THREE.Line (this.lineGeometry, new THREE.MeshPhongMaterial({color: 0xFFFFFF}));
    //this.line.applyMatrix (new THREE.Matrix4().makeTranslation(-10,0,0));
    this.add(this.line);

    //Al crear el objeto medimos el tiempo actual
    //this.t0 =  Date.now();
    //Medido en milisegundos

    var origen1={t: 0};
    var destino1={t: 0.645};
    var that = this;
    this.movimiento1 = new TWEEN.Tween(origen1)
      .to(destino1, 4000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      //.onStart(function(){
      //  that.contenedorCajaMorada.rotation.z +=1;})
      .onUpdate (function(){
        var posicion = that.spline.getPointAt(this.t);
        that.ContenedorCajaVerde.position.copy(posicion);
        that.cajaVerde1.position.y = that.guiControls.posY;
        that.ContenedorRotacion.rotation.z = that.guiControls.Rotate;
        var tangente = that.spline.getTangentAt(this.t);
        posicion.add(tangente);//Se  mira a un punto en esa dirección
        that.ContenedorCajaVerde.lookAt(posicion);
      /*that.cajaVerde1.position.x = this.t;*/})
      .onComplete(function(){
        this.t= 0; });
      //.repeat(Infinity);
      //.yoyo(true);
      //.start();

    var origen2={t: 0.645};
    var destino2={t: 1};
    var that = this;
    this.movimiento2 = new TWEEN.Tween(origen2)
      .to(destino2, 8000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      //.onStart(function(){
      //  that.contenedorCajaMorada.rotation.z +=1;})
      .onUpdate (function(){
        var posicion = that.spline.getPointAt(this.t);
        that.ContenedorCajaVerde.position.copy(posicion);
        var tangente = that.spline.getTangentAt(this.t);
        that.cajaVerde1.position.y = that.guiControls.posY;
        that.ContenedorRotacion.rotation.z = that.guiControls.Rotate;
        posicion.add(tangente);//Se  mira a un punto en esa dirección
        that.ContenedorCajaVerde.lookAt(posicion);
      /*that.cajaVerde1.position.x = this.t;*/})
      .onComplete(function(){
        this.t= 0.645; });
      //.repeat(Infinity);
      //.yoyo(true);
      //.start();

      this.movimiento1.chain(this.movimiento2);
      this.movimiento2.chain(this.movimiento1);
      this.movimiento1.start();
      //this.movimiento2.start();
  }

  createGUI (nombre) {
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
    var folder = gui.addFolder (nombre);
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
