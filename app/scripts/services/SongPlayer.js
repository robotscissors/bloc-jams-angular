(function() {
  /**
   * @function SongPlayer
   * @desc Contains the logic for playing the songs from the Buzz service
   * @returns the Object SongPlayer
   */
  function SongPlayer() {
    var SongPlayer = {};
  /**
   * @desc currentSong object audio file
   * @type {Object}
   */
    var currentSong = null;

  /**
   * @desc Buzz object audio file
   * @type {Object}
   */
    var currentBuzzObject = null;

  /**
   * @function playSong
   * @desc plays the current song as currentBuzzObject, sets playing variable to true
   */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    }


  /**
   * @function setSong
   * @desc Stops currently playing song and loads new audio file as currentBuzzObject
   * @param {Object} song
   */
    var setSong = function(song) {
      if (currentBuzzObject) { //It is not the current song, stop the song.
        currentBuzzObject.stop();
        currentSong.playing = null; //This is working with ng-show directive to determine if the song is playing
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {//create a new object for the new song
        formats: ['mp3'],
        preload: true
      });

      currentSong = song; //this is the current song now.
    };

    SongPlayer.play = function(song) {
      if (currentSong !== song) { //Are we clicking on the current song?
        setSong(song);
        playSong(song);
      } else if (currentSong === song) { //Are we clicking on the current song?
        if (currentBuzzObject.isPaused()) { //If it is already paused, then you are trying to play it.
          playSong(song);
        }
      }
    };

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
