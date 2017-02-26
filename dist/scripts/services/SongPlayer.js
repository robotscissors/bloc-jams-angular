(function() {
  /**
   * @function SongPlayer
   * @desc Contains the logic for playing the songs from the Buzz service
   * @returns the Object SongPlayer
   */
  function SongPlayer($rootScope, Fixtures, $document) {
    var SongPlayer = {};

    /**
     * @desc Using the Fixtures service get Album information
     * @type {Object}
     */
    var currentAlbum = Fixtures.getAlbum();
    SongPlayer.soundStyle = "icon ion-volume-high";
    SongPlayer.volume = 50; //set default value on volume as 50
    SongPlayer.currentSong = currentAlbum.songs[0]; //identify the first song as the default

  /**
   * @desc Buzz object audio file
   * @type {Object}
   */
    var currentBuzzObject = null;

  /**
   * @function playSong
   * @desc plays the current song as currentBuzzObject, sets playing variable to true
   * @param {object} song
   */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    }

    /**
    * @function checkSong
    * @desc checks to see if the current song has ended then it calls the next song
    */
    var checkSong = function(){
      if (currentBuzzObject.isEnded()){
        //call the nextSong function
        SongPlayer.next();
      }
    };

    SongPlayer.mute = function(){
      if (currentBuzzObject.isMuted()){
        currentBuzzObject.unmute();
        SongPlayer.soundStyle = "icon ion-volume-high";
      } else {
        currentBuzzObject.mute();
        SongPlayer.soundStyle = "icon ion-volume-mute";
      }
    };


    /**
    * @function stopSong
    * @desc previous method decrements the song index
    * @param {song} the current song
    */
    var stopSong = function(song){
      currentBuzzObject.stop();
      song.playing = null;
    }



  /**
   * @function setSong
   * @desc Stops currently playing song and loads new audio file as currentBuzzObject
   * @param {Object} song
   */
    var setSong = function(song) {
      if (currentBuzzObject) { //It is not the current song, stop the song.
        stopSong(SongPlayer.currentSong);
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {//create a new object for the new song
        formats: ['mp3'],
        preload: true,
        volume:50
      });

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
          checkSong(song);
        });
      });

      SongPlayer.currentSong = song; //this is the current song now.
    };

  /**
   * @desc getSongIndex finds the song number in the album
   * @param (song) the current song.
   * @return {number}
   */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
   * @desc currentSong object audio file
   * @type {Object}
   */
    //SongPlayer.currentSong = null;

    /**
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
    SongPlayer.currentTime = null;


    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) { //Are we clicking on the current song?
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) { //Are we clicking on the current song?
        if (currentBuzzObject.isPaused()) { //If it is already paused, then you are trying to play it.
          playSong(song);
        }
      }
    };

    /**
   * @desc pause method pauses the song
   * @type {object}
   * @param {song} the current song
   */


    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    };


    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };


    /**
   * @desc previous method decrements the song index
   * @type {method}
   */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
//        currentBuzzObject.stop();
//        SongPlayer.currentSong.playing = null;
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
      /**
   * @desc next method increases the song index
   * @type {method}
   */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++; //advance song index

      if (currentSongIndex >= currentAlbum.songs.length) { // are we already on the last song?
        currentSongIndex = 0; //loop back to the first song
        var song = currentAlbum.songs[currentSongIndex]; //get new song info
        setSong(song);
        playSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex]; //get new stong.
        setSong(song);
        playSong(song);
      }
    };



      /**
   * @function setCurrentTime
   * @desc Set current time (in seconds) of currently playing song
   * @param {Number} time
   */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };


    /**
   * @function setVolue
   * @desc Set the volume of the sound object currently playing
   * @param {Number} volume
   */
    SongPlayer.setVolume = function(volume){
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
        SongPlayer.volume =  volume;
      }
    };

    // this following is meant to set a song for the player bar if none is selected on load
    setSong(SongPlayer.currentSong);

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', '$document', SongPlayer]);
})();
