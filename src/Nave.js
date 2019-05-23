class Nave extends THREE.Object3D {
  constructor() {
    super();

    this.add(this.crearContenedorRotacion());
  }

  // Se obtiene el modelo
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
            //modelo.scale.set(0.001,0.001,0.001);
            //modelo.position.y=0.5;
            //modelo.rotation.y=Math.PI/2;
            nave.add(modelo);
          },
          null,null,null,false
        );
    });

    nave.scale.set(0.0009,0.0009,0.0009);
    nave.position.y=0.55;
    nave.rotation.y=Math.PI/2;

    return nave;
  }

  // Se crea el contenedor para rotar la nave
  crearContenedorRotacion(){
    this.contenedorRotacion = new THREE.Object3D();
    this.contenedorRotacion.add(this.crearNave());
    return this.contenedorRotacion;
  }

  // La nave rota con el ángulo indicado
  rotar(angulo){
    this.contenedorRotacion.rotation.z=angulo;
  }

  // Se obtiene la posición del modelo cargado
  getPosicion(){
    return this.contenedorRotacion.children[0].position;
  }
}
