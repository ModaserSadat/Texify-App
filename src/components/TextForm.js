import React, { useState } from "react";
import jsPDF from 'jspdf';

export default function TextForm(props) {

  const synthesis = window.speechSynthesis;
  const [isReading, setIsReading] = useState(false);
 
  // Handler for text input change
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  // Handler for converting text to uppercase
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };

  // Handler for converting text to lowercase
  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };

  const handleSentenceCaseClick = () => {
    const sentences = trimmedText.split(/[.!?]+/);
  
    const sentenceCaseText = sentences
      .map((sentence) => {
        const trimmedSentence = sentence.trim();
        if (trimmedSentence) {
          return trimmedSentence.charAt(0).toUpperCase() + trimmedSentence.slice(1).toLowerCase();
        } else {
          return "";
        }
      })
      .join(". ");
  
    setText(sentenceCaseText);
    
  };
  

  // Handler for copying text to clipboard
  const handleCopy = () => {
    const textToCopy = text;

    // Check if Clipboard API is supported in the browser
    if (navigator.clipboard) {
      // Use Clipboard API to copy text
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          // Show success message if copy is successful
          props.showAlert("Success!", "Copied to the Clipboard.");
        })
        .catch(error => {
          // If Clipboard API fails, use fallback method
          fallbackCopyToClipboard(textToCopy);
        });
    } else {
      // If Clipboard API is not supported, use fallback method
      fallbackCopyToClipboard(textToCopy);
    }
  };

  // Fallback method for copying text to clipboard
  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
      const copied = document.execCommand('copy');
      if (copied) {
        props.showAlert("Success!", "Copied to the Clipboard.");
      } else {
        props.showAlert("Error", "Failed to copy to the Clipboard.");
      }
    } catch (error) {
      props.showAlert("Error", "Failed to copy to the Clipboard.");
    }

    document.body.removeChild(textArea);
  };

  // Handler for clearing the text
  const handleClear = () => {
    let newText = "";
    setText(newText);
  };

  // Handler for downloading the text as a file
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "myTextFile.txt";
    document.body.appendChild(element); // Required for Firefox
    element.click();
    document.body.removeChild(element); // Clean up the temporary element
  };


const handleExportPDF = () => {
  const pdf = new jsPDF();
  pdf.text(text, 10, 10);
  pdf.save('myDocument.pdf');
};


  const handleTextToSpeech = () => {
    // If currently reading, stop the speech
    if (isReading) {
      synthesis.cancel(); // Stop ongoing speech
      setIsReading(false); // Update reading state
    } else if (text.trim() !== "") {
      // If not reading and there's text to read
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Event listener for when speech ends
      utterance.onend = () => {
        setIsReading(false); // Update reading state after speech ends
      };
      
      synthesis.speak(utterance); // Start speech synthesis
      setIsReading(true); // Update reading state
    }
  };
  
  


  // State for the text input
  const [text, setText] = useState("");

  // Calculate word count, character count, and time to read
  let trimmedText = text.trim();
  let wordCount = trimmedText === "" ? 0 : trimmedText.split(/\s+/).length;
  let charCount = trimmedText.length;
  let timeToRead = Math.round(wordCount * 0.0054 * 100) / 100;
  let sentenceCount = trimmedText.split(/[.!?]+/).filter(Boolean).length;
  let paragraphCount = trimmedText.split('\n').filter(Boolean).length;
  // Calculate average word length
  let totalWordLength = trimmedText.split(/\s+/).reduce((total, word) => total + word.length, 0);
  let averageWordLength = wordCount === 0 ? 0 : Math.round(totalWordLength / wordCount * 100) / 100;
    

  // Return the JSX content
  return (
    <>
      <div className={`container ${props.mode === 'dark' ? 'text-white' : 'text-dark'}`}>
        <h2 className="custom-heading mt-4">{props.heading}</h2>
        <div className="my-2">
          {/* Textarea for input */}
          <textarea className="form-control" style={{ backgroundColor: props.mode === 'light' ? 'white' : 'grey', color: props.mode === 'light' ? 'black' : 'white' }} id="myBox" rows="8" onChange={handleOnChange} value={text} placeholder="Enter your text here..."></textarea>
        </div>
        {/* Buttons for actions */}
        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>UPPERCASE</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>lowercase</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleSentenceCaseClick}>Sentence Case</button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy to Clipboard</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleDownload}>Download</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleExportPDF}>Export as PDF</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleTextToSpeech}>{isReading ? "Stop Reading" : "Convert Text to Speech"}</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleClear}>Clear Text</button>
        
      </div>

      <div className="container my-1" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
      <p>
          <span style={{ fontWeight: 'bold' }}>Word Count:</span> {wordCount} | 
          <span style={{ fontWeight: 'bold' }}> Char Count:</span> {charCount} | 
          <span style={{ fontWeight: 'bold' }}> Sentence Count:</span> {sentenceCount} | 
          <span style={{ fontWeight: 'bold' }}> Paragraph Count:</span> {paragraphCount} |
          <span style={{ fontWeight: 'bold' }}> Average Word Length:</span> {averageWordLength} |  
          <span style={{ fontWeight: 'bold' }}> Time to read:</span> {timeToRead} minutes
      </p>
      </div>
    </>
  );
}
