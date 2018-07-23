import React, { Component } from 'react'
import './Bozo.css'

export default class Bozo extends Component {
  constructor() {
    super()
    this.state = {
      correct: [],
      currentAttempt: '',

      display: [],

      blink: true,
      key: ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '.']
    }
    this.bozo = this.bozo.bind(this)
    this.bozoCheck = this.bozoCheck.bind(this)

    this.startBozo = this.startBozo.bind(this)
    this.betterBozo = this.betterBozo.bind(this)
    this.think = this.think.bind(this)
  }

  componentDidMount() {
    this.cursor()
  }

  //bozo method randomly selects a character from the key
  bozo(keyIndex) {
    console.log('attempt: ', this.state.currentAttempt)
    console.log('index: ', keyIndex)

    //if the button is clicked after a sequence >> reset 
    if (keyIndex === 0) {
      this.setState({
        correct: [],
      })
    }
    //wait and then set currentAttempt to randomly selected value
    setTimeout(() => {
      let index = (Math.random() * this.state.key.length).toFixed(0)
      this.setState({
        currentAttempt: this.state.key[index]
      })
      //check the randomly selected value against the key
      this.bozoCheck(this.state.currentAttempt, keyIndex)
    }, 700)
  }

  //bozoCheck method checks if currently selected character is correct
  bozoCheck(charToCheck, currentKeyIndex) {
    console.log('attempt check: ', charToCheck)
    console.log('index check: ', currentKeyIndex)

    // check current attempt against current key index
    if (charToCheck === this.state.key[currentKeyIndex]) {
      console.log('correct')
      // if current attempt is correct increment the current key index
      currentKeyIndex += 1
      // update the correct array and set state
      let newCorrect = this.state.correct
      newCorrect.push(charToCheck)
      setTimeout(
        this.setState({
          correct: newCorrect,
          currentAttempt: ''
        }),
        300)
    }
    if (currentKeyIndex < this.state.key.length) {
      this.setState({
        currentAttempt: ''
      })
      // if sequence is not complete, recur
      setTimeout(this.bozo(currentKeyIndex), 300)
    } else {
      console.log('sequence complete')
      return
    }
  }
  //**************************************************************************
  //**************************************************************************
  startBozo() {
    this.setState({
      display: []
    })
    this.betterBozo(0)
  }

  betterBozo(keyIndex) {
    // randomly select a character and display it
    let random = (Math.random() * this.state.key.length).toFixed(0)
    let attempt = this.state.key[random]
    let newDisplay = this.state.display
    newDisplay.push(attempt)
    this.setState({
      display: newDisplay
    })

    // wait a fraction of a second to mimic thinking
    setTimeout(this.think(keyIndex), 1000)

  }

  think(keyIndex) {
    console.log('keyIndex', keyIndex)
    // check if character is correct
    if (this.state.display[keyIndex] === this.state.key[keyIndex]) {
      // correct >> check if sequence is complete
      console.log('correct')
      if (keyIndex < this.state.key.length - 1) {
        // not complete >> increment keyIndex, recur
        console.log('incomplete')
        this.betterBozo(++keyIndex)
      }
    } else {
      // not correct >> delete character, recur
      console.log('else')
      let newDisplay = this.state.display
      newDisplay.splice(keyIndex, 1)
      this.setState({
        display: newDisplay
      })
      this.betterBozo(keyIndex)
    }
  }

  //**************************************************************************
  //**************************************************************************

  //cursor method creates blinking cursor effect
  cursor() {
    setTimeout(() => {
      this.setState({
        blink: !this.state.blink
      })
      this.cursor()
    }, 700)
  }

  render() {
    return (
      <div className="container">
        <code> {this.state.correct.join('')}{this.state.currentAttempt}</code >
        {/* <code>{this.state.display.join('')}</code> */}
        <code>{this.state.blink ? '_' : null}</code>
        <br />
        <code onClick={() => this.bozo(0)} className="button">whirl</code>
        {/* <button onClick={this.startBozo}>Click</button> */}
      </div>
    )
  }
}