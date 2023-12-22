import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ParticipantsList from '../ParticipantsList'
import RaceTrack from '../RaceTrack'
import DisplayRace from '../DisplayRace'

import './index.css'



class Home extends Component {
  state = {
    participants: [],
    nameInput: '',
    speedInput: '',
    startTime: "00:00",
    endTime: "--",
    isGameStarted: true,
    count: 0,
    isgameRunnng: true
  }



  onChangeNameInput = (event) => {
    this.setState({ nameInput: event.target.value })

  }
  onChangeSpeedInput = (event) => {
    this.setState({ speedInput: event.target.value })

  }

  submitForm = (event) => {
    const { nameInput, speedInput, startTime, participants } = this.state

    event.preventDefault()

    const newItem = {
      id: uuidv4(), // Generate a unique key using uuid
      text1: nameInput,
      text2: speedInput,
      text3: startTime
    };

    this.setState({
      participants: [...participants, newItem],
      nameInput: '',
      speedInput: '',

    });

  }

  startTheRace = () => {
    this.setState(prev => ({ isGameStarted: !prev.isGameStarted }))
    this.setId = setInterval(() => {
      this.setState(prev => ({ count: prev.count + 1 }))
    }, 1000)


  }

  gameOver = () => {
    clearInterval(this.setId)
    this.setState({ isgameRunnng: false })


  }

  startTheGame = () => {
    this.setState({ isgameRunnng: true,isGameStarted:false, count: 0 })
    this.startTheRace()



  }
  restartTheGame = () => {
    this.setState({ isGameStarted: true })
    this.setState({ isgameRunnng: false })
    clearInterval(this.setId)

  }




  render() {
    const { participants, nameInput, speedInput, startTime, endTime, isGameStarted, count, isgameRunnng } = this.state

    return (
      <div>
        {
          isGameStarted ? (<div className='main-container'>
            <h1>hi</h1>
            <div className='runner-details-container'>
              <form className='form-controls' onSubmit={this.submitForm}>
                <h1>RUNNER DETAILS</h1>
                <p>"You can add max 10 participants</p>
                <div className='input-container'>
                  <label htmlFor='nameInput'>Name</label>
                  <input type="text" id="nameInput" value={nameInput} onChange={this.onChangeNameInput} />
                </div>
                <div className='input-container'>
                  <label htmlFor='speedInput'>Speed</label>
                  <input type="text" id="speedInput" value={speedInput} onChange={this.onChangeSpeedInput} />
                </div>
                <div className='input-container'>
                  <label htmlFor='timeInput'>Start Time</label>
                  <input type="text" id="timeInput" />
                </div>
                <button type="submit">+ ADD RUNNER</button>
              </form>

            </div>
            <div className='list-of-participants-container'>
              <h1>LIST OF PARTICIPANTS</h1>
              <ul className='list-container1'>
                <li>Name</li>
                <li>Speed</li>
                <li>Start Time</li>
                <li>End Time</li>
              </ul>

              <div>
                {participants.map((each) => (
                  // <ul className='list-container'>
                  <ParticipantsList eachItem={each} key={each.id} />
                  // </ul>
                ))}
              </div>
              <hr />
              <div className='btn-container'>
                <button type="button" className="race-start-btn" onClick={this.startTheRace}>Race Start</button>
              </div>
            </div>
          </div>) : (
            <div>
              {
                isgameRunnng ? (<div className='raceDisplay'>
                  <h1>RaceShow</h1>
                  <p>{count}</p>
                  <DisplayRace participants={participants} gameOver={this.gameOver} />
                </div>) : (<div className='scoreDisplay'>
                  <button onClick={this.startTheGame} className='race-start-btn'>Run Again</button>
                  <button onClick={this.restartTheGame} className='race-start-btn'>Restart</button>
                </div>)
              }
            </div>
          )
        }
      </div>

    )
  }
}

export default Home