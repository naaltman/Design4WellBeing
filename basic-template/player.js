// Player made with guidance from Howler.js Audio Player Demo
// found here: https://github.com/goldfire/howler.js/

var elms = ['playBtn'];

elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

var Player = function(playlist) {
  this.playlist = playlist;
  this.index = 0;
  this.sound = null;

};

Player.prototype = {
  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  play: function(index) {
    var self = this;
    var sound;

    index = typeof index === 'number' ? index : self.index;
    var data = self.playlist[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data.file],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: function() {
          // Start upating the progress of the track.
          requestAnimationFrame(self.step.bind(self));
        },
      });
    }
    // Begin playing the sound.
    sound.play();
    // Keep track of the index we are currently playing.
    self.index = index;
  },

  /**
   * Pause the currently playing track.
   */
  pause: function() {
    var self = this;
    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;
    // Pause the sound.
    sound.pause();
  },

  /**
   *  Pick a random new song to play
   */
  random_song: function(mood){
      var self = this;
      rand = Math.random() * self.playlist.length;
      index = Math.floor(rand);

      if(self.playlist[index].tag == mood){
        console.log("random song found");
        return self.playNew(index);
      }
      else{
        console.log('not relaxed song generate new index');
        return self.random_song(mood);
      }
  },

  /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  playNew: function(index) {
    var self = this;
    // fade out the current song
    self.playlist[self.index].howl.fade(1,0,1000);
    // Play the new track.
    self.play(index);
  },

  /**
   * The step called within requestAnimationFrame to update the playback position.
   */
  step: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // If the sound is still playing, continue stepping.
    if (sound.playing()) {
      requestAnimationFrame(self.step.bind(self));
    }
  },

  /**
   * Format the time from seconds to M:SS.
   * @param  {Number} secs Seconds to format.
   * @return {String}      Formatted time.
   */
  formatTime: function(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
};

// Setup our new audio player class and pass it the playlist.
var player = new Player([
  {
    file: 'full_playlist/relaxed-1.mp3',
    tag: 'relaxed',
    howl: null
  },
  {
    file: 'full_playlist/relaxed-2.mp3',
    tag: 'smile',
    howl: null
  },
  {
    file: 'full_playlist/relaxed-3.mp3',
    tag: 'relaxed',
    howl: null
  },
  {
    file: 'full_playlist/relaxed-4.mp3',
    tag: 'relaxed',
    howl: null
  },
  {
    file: 'full_playlist/relaxed-5.mp3',
    tag: 'relaxed',
    howl: null
  },
  {
    file: 'full_playlist/disappointed-1.mp3',
    tag: 'disappointed',
    howl: null
  },
  {
    file: 'full_playlist/disappointed-2.mp3',
    tag: 'disappointed',
    howl: null
  },
  {
    file: 'full_playlist/disappointed-3.mp3',
    tag: 'disappointed',
    howl: null
  },
  {
    file: 'full_playlist/laughing-1.mp3',
    tag: 'laughing',
    howl: null
  },
  {
    file: 'full_playlist/laughing-2.mp3',
    tag: 'laughing',
    howl: null
  },
  {
    file: 'full_playlist/laughing-3.mp3',
    tag: 'laughing',
    howl: null
  },
  {
    file: 'full_playlist/laughing-4.mp3',
    tag: 'laughing',
    howl: null
  },
  {
    file: 'full_playlist/laughing-5.mp3',
    tag: 'laughing',
    howl: null
  },
  {
    file: 'full_playlist/rage-1.mp3',
    tag: 'rage',
    howl: null
  },
  {
    file: 'full_playlist/rage-2.mp3',
    tag: 'rage',
    howl: null
  },
  {
    file: 'full_playlist/rage-3.mp3',
    tag: 'rage',
    howl: null
  },
  {
    file: 'full_playlist/rage-4.mp3',
    tag: 'rage',
    howl: null
  },
  {
    file: 'full_playlist/rage-5.mp3',
    tag: 'rage',
    howl: null
  },
  {
    file: 'full_playlist/smile-1.mp3',
    tag: 'smile',
    howl: null
  },
  {
    file: 'full_playlist/smile-2.mp3',
    tag: 'smile',
    howl: null
  },
  {
    file: 'full_playlist/smile-3.mp3',
    tag: 'smile',
    howl: null
  }
]);

playBtn.addEventListener('click', function() {
  player.play();
  // play_audio()
});
stopBtn.addEventListener('click', function() {
  player.pause();
});
// nextBtn.addEventListener('click', function() {
//   player.random_song('relaxed');
// });
