class Nave extends THREE.Object3D {
  constructor() {
    super();




    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI();

    // Un Mesh se compone de geometría y material
    //this.geometry = new THREE.BoxGeometry (1,1,1);
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    //this.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(-5,0.5,0));
    // Como material se crea uno a partir de un color
    /*var materialVerde = new THREE.MeshPhongMaterial({color: 0x00FF00});
    var geometriaCajaVerde1 = new THREE.BoxGeometry (1,1,2);
    //geometriaCajaVerde1.rotateY(Math.PI/2);
    this.cajaVerde1 = new THREE.Mesh( geometriaCajaVerde1 ,  materialVerde);
    
    this.ContenedorCajaVerde = new THREE.Object3D();
    this.ContenedorRotacion = new THREE.Object3D();
    this.ContenedorRotacion.add(this.cajaVerde1);

    this.ContenedorCajaVerde.add(this.ContenedorRotacion);
    this.ContenedorRotacion.add(this.cajaVerde1);

    
    this.add(this.ContenedorCajaVerde);

    that.ContenedorCajaVerde.position.copy(posicion);
    var tangente = that.spline.getTangentAt(this.t);
    that.cajaVerde1.position.y = that.guiControls.posY;
    that.ContenedorRotacion.rotation.z = that.guiControls.Rotate;

    */

    this.add(this.crearContenedorCamino());

  }

  crearNave(){
    
    var that = this;
    var nave = new THREE.Object3D();
    var loader = new THREE.OBJLoader2();
    loader.loadMtl('../battlecruiser/battlecruiser.mtl', null,
      function(materials){
        loader.setMaterials(materials);
        loader.setLogging(true,true);
        loader.load('../battlecruiser/battlecruiser.obj',
          function(object){
            var modelo = object.detail.loaderRootNode;
            modelo.scale.set(0.005,0.005,0.005);
            modelo.position.y=0.5;
            modelo.rotation.y=Math.PI/2;
            nave.add(modelo);
          },null,null,null,false);
      });
    return nave;

    /*var materialVerde = new THREE.MeshPhongMaterial({color: 0x00FF00});
    var geometriaCajaVerde1 = new THREE.BoxGeometry (1,1,2);
    this.cajaVerde1 = new THREE.Mesh( geometriaCajaVerde1 ,  materialVerde);
    this.cajaVerde1.position.y=0.5;
    this.cajaVerde1.rotation.y=Math.PI;
    return this.cajaVerde1;*/
  }

  crearContenedorRotacion(){
    this.contenedorRotacion = new THREE.Object3D();
    this.contenedorRotacion.add(this.crearNave());
    return this.contenedorRotacion;
  }

  crearContenedorCamino(){
    this.contenedorCamino = new THREE.Object3D();
    this.contenedorCamino.add(this.crearContenedorRotacion());
    return this.contenedorCamino;
  }

  rotar(angulo){
    this.contenedorRotacion.rotation.z=angulo;
  }

  createGUI () {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.Rotate = 0;
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.Rotate = 0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Nave");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'Rotate', 0,2*Math.PI, 0.2).name ('Rotacion: ').listen();
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');

    
  }

  update () {
    this.rotar(this.guiControls.Rotate);

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
