import React from 'react';
import {render} from 'react-dom';
import ChordProgression from '../../src/ChordProgression'
import aloneTogether from './alone-together.js'
import './style.css';

class App extends React.Component {
  render () {
      //console.log(aloneTogether)
    return (
        <div>
            <p>This is ChordProgression</p>
            <ChordProgression width={800}
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

render(<App />, document.getElementById("root"));