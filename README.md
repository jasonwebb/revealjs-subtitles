## Installation

1. Clone or [download](https://github.com/jasonwebb/revealjs-subtitles/archive/master.zip) this repo.
2. Copy the `subtitles` folder into the Reveal.js `plugin` folder.
3. Add a reference to the CSS file in your presentation's HTML file:

```html
<link rel="stylesheet" href="plugin/subtitles/subtitles.css">
```

4. Load the JavaScript file as a dependency through the Reveal.js `initialize` function:

```javascript
<script>
Reveal.initialize({
  dependencies: [
    { src: 'plugin/subtitles/subtitles.js', async: true }
  ]
});
</script>
```

## How it works

This plugin uses the [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) interface of the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) available in Chrome (as of September 2019) to do real-time speech-to-text transcription.

On load, this plugin will inject the following HTML at the end of your presentation's DOM:

```html
<div id="subtitles-container">
  <div id="subtitles-inner-container">
    <div id="subtitles">
      <span id="final_text"></span>
      <span id="interim_text"></span>
    </div>
  </div>
</div>
```

* `final_text` will contain text that has been fully parsed by the speech-to-text engine.
* `interim_text` will contain text that is actively being parsed, and may change. Once the engine has fully parsed it, this text will be appended to the text in `final_text`.

## Requirements

* Presentation must be run in Chrome, because it is the [only browser that currently supports](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Browser_compatibility) the Web Speech API.
* You must be online while running your presentation, because the Web Speech API makes services calls, likely to [Google Cloud Speech-to-Text](https://cloud.google.com/speech-to-text/).