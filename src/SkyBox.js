class SkyBox extends THREE.Object3D {

  constructor () {
    super();

    //Se declaran las rutas de la SkyBox
    var path = "../imgs/SkyBox/";
    var format = ".png";
    var urls = [path + "drakeq_ft" + format, 
                path + "drakeq_bk" + format,
                path + "drakeq_up" + format,
                path + "drakeq_dn" + format,
                path + "drakeq_rt" + format,
                path + "drakeq_lf" + format,
    ];

    //Se cargan la texturas de la SkyBox
    this.textureCube = new THREE.CubeTextureLoader().load(urls);

    //Se declara y configura el Shader
    var shader = THREE.ShaderLib["cube"];
    shader.uniforms["tCube"].value = this.textureCube;
    var material = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });
    //Creamos la SkyBox
    this.environmentMesh = new THREE.Mesh (new THREE.BoxBufferGeometry(1000, 1000, 1000), material);
    //Añadimos la SkyBox al Object3D
    this.add(this.environmentMesh);
  }

  //Devolvemos las texturas de la SkyBox
  getMapaTexturas(){
    return this.textureCube;
  }

}