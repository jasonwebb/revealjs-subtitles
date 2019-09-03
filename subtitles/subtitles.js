(function() {
  var recognition;
  var final_transcript = '';
  var start_timestamp;
  var final_text_el;
  var interim_text_el;
  var subtitle_container_el;
  var is_visible = true;

  setup();
  start();

  function setup() {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Speech recognition not supported. Use Chrome instead.');

    } else {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = function() {
        createHTML();
      };

      recognition.onerror = function(event) {
        if (event.error == 'no-speech') {
          console.log('No speech detected');
          ignore_onend = true;
        }

        if (event.error == 'audio-capture') {
          console.log('No microphone found');
          ignore_onend = true;
        }

        if (event.error == 'not-allowed') {
          if (event.timeStamp - start_timestamp < 100) {
            console.log('Permission to use microphone is blocked. Change it at chrome://settings/contentExceptions#media-stream');
          } else {
            console.log('Permission to use microphone is denied.');
          }

          ignore_onend = true;
        }
      };

      recognition.onresult = function(event) {
        var interim_transcript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }

        final_transcript = capitalize(final_transcript);
        final_text.innerHTML = linebreak(final_transcript);
        interim_text.innerHTML = linebreak(interim_transcript);
      };

      document.addEventListener('keydown', function(event) {
        if(event.key === 't') {
          toggleVisibility();
        }
      });
    }
  }

  function start() {
    recognition.start();
  }

  function stop() {
    recognition.stop();
  }

  /*
    Constructs the following markup structures:

    <div id="subtitles-container">
      <div id="subtitles-inner-container">
        <div id="subtitles">
          <span id="final_text"></span>
          <span id="interim_text"></span>
        </div>
      </div>
    </div>
  */
  function createHTML() {
    subtitle_container_el = document.createElement('div');
    subtitle_container_el.setAttribute('id', 'subtitles-container');

    subtitles_inner_container_el = document.createElement('div');
    subtitles_inner_container_el.setAttribute('id', 'subtitles-inner-container');

    subtitles_el = document.createElement('div');
    subtitles_el.setAttribute('id', 'subtitles');

    final_text_el = document.createElement('span');
    final_text_el.setAttribute('id', 'final_text');

    interim_text_el = document.createElement('span');
    interim_text_el.setAttribute('id', 'interim_text');

    subtitles_el.appendChild(final_text_el);
    subtitles_el.appendChild(interim_text_el);

    subtitles_inner_container_el.appendChild(subtitles_el);
    subtitle_container_el.appendChild(subtitles_inner_container_el);

    document.body.appendChild(subtitle_container_el);
  }

  function toggleVisibility() {
    is_visible = !is_visible;
    subtitle_container_el.classList.toggle('hidden');
  }

  var two_line = /\n\n/g;
  var one_line = /\n/g;
  function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
  }

  var first_char = /\S/;
  function capitalize(s) {
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
  }
})();