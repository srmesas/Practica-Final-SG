class SkyBox extends THREE.Object3D {

  constructor () {
    super();

    var path = "../imgs/SkyBox/";
    var format = ".png";
    var urls = [path + "drakeq_ft" + format, 
                path + "drakeq_bk" + format,
                path + "drakeq_up" + format,
                path + "drakeq_dn" + format,
                path + "drakeq_rt" + format,
                path + "drakeq_lf" + format,
    ];

    var textureCube = new THREE.CubeTextureLoader().load(urls);

    var shader = THREE.ShaderLib["cube"];
    shader.uniforms["tCube"].value = textureCube;
    var material = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });
    
    this.environmentMesh = new THREE.Mesh (new THREE.BoxGeometry(1000, 1000, 1000), material);
    
    this.add(this.environmentMesh);
  }

}