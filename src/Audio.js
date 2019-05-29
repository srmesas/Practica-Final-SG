class Audio extends THREE.Object3D {

  constructor () {
    super();
    this.fondo = new Howl({
      src: ['../sounds/ambient.ogg'], volume: 0.3, loop: true, 
    });
    //this.fondo.play();
    //this.fondo.pause();

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