// src/components/SpeechToText.js
import React, { useState } from 'react';
import "./StoT.css";
const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcriptSegment = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        setTranscript((prev) => prev + transcriptSegment + ' ');
      } else {
        interimTranscript += transcriptSegment;
      }
    }
    setTranscript((prev) => prev + interimTranscript);
  };

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition.stop();
  };

  return (
    <div>
      <h1>Speech to Text</h1>
      <button onClick={startListening} disabled={listening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop Listening
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
