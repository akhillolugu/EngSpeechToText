import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import useClipboard from "react-use-clipboard";
// import { useState, useEffect } from "react";

const App = () => {
  

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript(); // Clear the old transcript
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

 

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="app-container">
      <header>
        <h1>Speech to Text Converter</h1>
        
      </header>
      <div className="card">
        <div className="main-content">{transcript}</div>
        <div className="btn-style">
          
          <button
            className={`btn start ${listening ? "listening" : ""}`}
            onClick={startListening}
          >
            {listening ? "Listening..." : "Start Listening"}
          </button>
          <button
            className={`btn stop ${listening ? "listening" : ""}`}
            onClick={stopListening}
          >
            Stop Listening
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
