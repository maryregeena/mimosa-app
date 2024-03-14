import React ,{useState} from "react";
import './App.css';
import {signInWithGoogle,logOut} from "./Firebase";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {

  //const statement=`My Name is ${sessionStorage.getItem('name')}`
  const commands = [          
    {
        command: `My Name is ${sessionStorage.getItem('name')}`,
        match:false
        //callback: (name) => setDisplay(`Hello, ${name}! Nice to meet you!`)   //set the display to this response
    },
    {
      command: `I am ${sessionStorage.getItem('name')}`,
      match:false
    },
    {
      command: `I'm ${sessionStorage.getItem('name')}`,
      match:false
    },
    {
      command: `I am called ${sessionStorage.getItem('name')}`,
      match:false
    },
    {
      command: `${sessionStorage.getItem('name')}`,
      match:false
    }
]
const {transcript, resetTranscript} = useSpeechRecognition()

  //similar to useState, create a transcript and resetTranscript func
  // from the useSpeechRecognition() function
  
  if(!SpeechRecognition.browserSupportsSpeechRecognition()){
    return null
  }

  return (
    <div className="App">
      <button onClick={signInWithGoogle} disabled={sessionStorage.getItem("name")}>Sign in with Google</button>
      <button onClick={logOut} >logOut</button>
      <h1>Name: {sessionStorage.getItem("name")}</h1>
      <h1>Email: {sessionStorage.getItem("email")}</h1>
     <img src={sessionStorage.getItem("profilePic")}></img>
     
     <div>
<h1>Please record the below to start enrolling for voice authentication - </h1>
{
  commands.map((obj) =>{
    return (
    <p>{obj.command} </p>
    )
  })
}

       <button onClick={SpeechRecognition.startListening}>Listen!</button> 
      <button onClick={SpeechRecognition.stopListening}>Stop!</button>
      <button onClick={resetTranscript}>Reset</button>       {transcript}
     </div>
      
    </div>
  );
}

export default App;
