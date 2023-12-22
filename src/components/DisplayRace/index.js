import React, { Component } from 'react';
import RaceTrack from '../RaceTrack';
let count=0
class DisplayRace extends Component {
  constructor(props) {
    super(props);
  }


  sendThedata = () => {
    count=count+1
    if(count===this.props.participants.length){
        this.props.gameOver()
    }
  };

  render() {
    const { participants } = this.props;

    return (
      <div>
        {participants.map((track, index) => (
          <RaceTrack key={index} track={track} sendThedata={this.sendThedata} />
        ))}
      </div>
    );
  }
}

export default DisplayRace;
