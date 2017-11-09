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
  this.mood = ''; // default mood is relaxed

};

Player.prototype = {

  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  play: function(index, mood) {
    var self = this;
    var sound;

    index = typeof index === 'number' ? index : self.index;
    mood = typeof mood === 'String' ? mood : self.mood;

    if(self.playlist[self.mood][self.index].howl){
      console.log("song is playing, stopping");
      self.playlist[self.mood][self.index].howl.fade(1,0,1000);
    }

    var data = self.playlist[mood];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data[index].howl){
      sound=data[index].howl;
    } else{
      sound = data[index].howl = new Howl({
        src:[data[index].file],
        html5: true,
        onplay: function(){
          requestAnimationFrame(self.step.bind(self));
        },
      });
    };
    // Begin playing the sound.
    sound.play();
    // Keep track of the index we are currently playing.
    self.index = index;
    self.mood = mood;
  },

  /**
   * Pause the currently playing track.
   */
  pause: function() {
    var self = this;
    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.mood][self.index].howl;
    // Pause the sound.
    sound.pause();
  },

  /**
   *  Pick a new song to play randomly from songs of that mood
   */
  random_song: function(mood){
      var self = this;

      rand = Math.random() * self.playlist[mood].length;
      index = Math.floor(rand);

      // console.log("songs for current mood", self.playlist[mood]);

      if(self.playlist[mood][index].tag == mood){
        return self.play(index,mood);
      }
      else{
        return self.random_song(mood);
      }
  },

  /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  playNew: function(index, mood) {
    var self = this;
    // fade out the current song if something already playing
    if (!self.playlist[self.mood][self.index]){
      self.play(index, mood);
    }
    else{
      // fade out old and play new
      self.playlist[self.mood][self.index].howl.fade(1,0,1000);
      // Play the new track.
      self.play(index, mood);
    }
  },

  /**
   * The step called within requestAnimationFrame to update the playback position.
   */
  step: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.mood][self.index].howl;

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
var player = new Player({
  'relaxed':[
  {
    file: 'full_playlist/relaxed-1.mp3',
    tag: 'relaxed',
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
  }],
  'disappointed':[
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
  }],
  'laughing':[
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
  }],
  'rage':[
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
  }],
  'smile':[
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
  },
  {
    file: 'full_playlist/relaxed-2.mp3',
    tag: 'smile',
    howl: null
  }]
});

// playBtn.addEventListener('click', function() {
//   player.play();
// });
stopBtn.addEventListener('click', function() {
  player.stop();
});
