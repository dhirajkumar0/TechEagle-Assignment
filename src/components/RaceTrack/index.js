import React, { Component } from 'react';

class RaceTrack extends Component {
  constructor(props) {
    super(props);
    console.log("hey me",props)

    this.state = {
      position: 0,
      color:this.getRandomColor()
    };

    this.startPosition = 0;
    this.endPosition = 400; // Adjust as needed
    this.speed = parseInt(props.track.text2); // Adjust as needed
    this.interval = 100; // Interval for updating position (in milliseconds)
  }

  componentDidMount() {
    this.intervalId = setInterval(this.updatePosition, this.interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  updatePosition = () => {
    const { position } = this.state;
    const newPosition = position + (this.speed * this.interval) / 1000;

    if (newPosition >= this.endPosition) {
      clearInterval(this.intervalId);
      this.props.sendThedata()
    } else {
      this.setState({ position: newPosition });
    }
  };

  render() {
    const { position,color } = this.state;

    return (
      <div style={{ position: 'relative', height: '50px', width: '400px', borderBottom: '1px solid black',borderRight:"10px solid green" }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${position}px`,
            transform: 'translate(-50%, -50%)',
            height: '28px',
            width: '28px',
            borderRadius: '50%',
            background: color,
          }}
        ></div>
      </div>
    );
  }
}

export default RaceTrack;
