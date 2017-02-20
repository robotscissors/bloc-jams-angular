(function() {
  /**
   * @function SongPlayer
   * @desc Contains the logic for playing the songs from the Buzz service
   * @returns the Object SongPlayer
   */
  function SongPlayer(Fixtures){
    var SongPlayer = {};

    /**
     * @desc Using the Fixtures service get Album information
     * @type {Object}
     */
   var currentAlbum = Fixtures.getAlbum();

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
        preload: true
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
    SongPlayer.currentSong = null;

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
<<<<<<< HEAD
    /**
   * @desc pause method pauses the song
   * @type {object}
   * @param {song} the current song
   */
=======

    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    };

>>>>>>> assignment8-services3
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

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
