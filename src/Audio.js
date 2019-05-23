class AudioFondo extends THREE.Object3D {

  constructor () {
    super();
    this.listener = new THREE.AudioListener();
    //this.add( listener );

    // create a global audio source
    var sound = new THREE.Audio( this.listener );
    this.add(sound);

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
      audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop( true );
      sound.setVolume( 0.5 );
      sound.play();
    });
  }


  getListener(){
    return this.listener;
  }
}