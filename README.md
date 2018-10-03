# react-svg-chord-progressions
Library to show chord progressions in jazz style

## Usage:

### Import

```yarn add https://github.com/dmmz/react-svg-chord-progressions```

In a typcal React app index.js file

```javascript
import chordProgression from './my-chord-progression.js'
import ChordChart from 'react-svg-chord-progressions'
import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return (
        <div>
            <ChordProgression width={689}
                bars={aloneTogether}
                colorActive={'#00f'}
                activeBar={2}
                colorSelected={'#aa0'}
                selectedBars={[1,4]}
                selections={[
                  {
                    start:{chord:0,bar:10},
                    end:{chord:1,bar:11},
                    color:'#500'
                  },
                  {start:{chord:0,bar:14},
                    end:{chord:0,bar:18},
                  color:'#060'}
                ]}
            />
        </div>
        )
    }
}
render(<App/>, document.getElementById('app'));

```

To use jazz fonts, we can specify it in the index.html file header
```html
<html>
  <head>
    <meta charset="utf-8">
    <title>My chord progression</title>
        <style>
        @font-face { 
            font-family: 'jazz-font'; 
            src: url('chords.eot');
            src: url('fonts/chords.eot?#iefix') format('eot'), 
                 url('fonts/chords.woff') format('woff'), 
                 url('fonts/chords.ttf') format('truetype'), 
                 url('fonts/chords.svg#webfont') format('svg'); 
        }
        </style>
  </head>
  <body>
    <div id="app" />
    <script src="public/bundle.js" type="text/javascript"></script>
  </body>
```

![chord-progression](https://user-images.githubusercontent.com/1258525/46422607-0e2fae00-c735-11e8-8234-dbe48bc2aade.png)
