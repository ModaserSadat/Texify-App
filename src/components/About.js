import React from 'react'

function About(props) {
  return (
    <section className={`about-section ${props.mode === 'dark' ? 'text-white' : 'text-dark'}`}>
      <br/>
      <div className="container">
        <h2>About Our Text Manipulation Tool</h2>
        <p>
          Our Text Manipulation Tool is a simple yet powerful application that allows you to perform various actions on your text. Whether you want to convert your text to uppercase or lowercase, copy it to the clipboard, or even download it as a file, this tool has got you covered!
        </p>
        <p>
          With a user-friendly interface, all you need to do is enter your text in the provided textarea, and you're ready to go. The tool also provides you with valuable information about your text, such as word count, character count, and an estimated reading time. So, you can not only manipulate your text but also gain insights into it.
        </p>
        <p>
          Whether you're a writer, student, or just someone who frequently deals with text, our Text Manipulation Tool can save you time and effort. So why wait? Give it a try now and see how it simplifies your text processing tasks!
        </p>
      </div>
    </section>
  )
}

export default About
