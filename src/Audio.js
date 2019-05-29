class Audio extends THREE.Object3D {

  constructor () {
    super();
    this.fondo = new Howl({
      src: ['../sounds/ambient.ogg'], volume: 0.35, loop: true, 
    });

    this.boom = new Howl({
      src: ['../sounds/impact.mp3'], volume: 0.9, loop: false
    });

    this.gameOver = new Howl({
      src: ['../sounds/GameOver.ogg'], volume: 0.2, loop: false
    });

    this.risa = new Howl({
      src: ['../sounds/laugh.ogg'], volume: 0.4, loop: false
    });

    //this.fondo.play();
    //this.gameOver.play();
    //this.risa.play();
  }
}