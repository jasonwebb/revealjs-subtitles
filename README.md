## Installation

1. Clone or [download](https://github.com/jasonwebb/revealjs-subtitles/archive/master.zip) this repo.
1. Copy the `subtitles` folder into the Reveal.js `plugin` folder.
1. Add a reference to the CSS file in your presentation's HTML file:
```
<link rel="stylesheet" href="plugin/subtitles/subtitles.css">
```
1. Load the JavaScript file as a dependency through the Reveal.js `initialize` function:
```
<script>
Reveal.initialize({
	dependencies: [
    { src: 'plugin/subtitles/subtitles.js', async: true }
  ]
});
</script>
```

## How it works

```
TODO: add note about Web Speech API
```

## Requirements

* You must run your presentation in Chrome because it is the [only browser that currently supports](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Browser_compatibility) the Web Speech API.