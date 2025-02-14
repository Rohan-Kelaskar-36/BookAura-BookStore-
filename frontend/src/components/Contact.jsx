import React, { useState, useEffect } from "react";

function Contact() {
  const [text, setText] = useState('');
  const lines = [
    'Feel free to contact me!',
    'Let\'s connect, follow now!',
    'Contact anytime!'
  ];
  const typingDelay = 100; // Adjust to control typing speed
  const [showCursor, setShowCursor] = useState(true);
  const [currentLine, setCurrentLine] = useState(0); // Tracks the current line
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current character in the current line

  useEffect(() => {
    let typingInterval;

    if (currentIndex < lines[currentLine].length) {
      // If the current line isn't fully typed, continue typing
      typingInterval = setInterval(() => {
        setText(prevText => prevText + lines[currentLine][currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, typingDelay);
    } else {
      // Once the current line is fully typed, move to the next line after a short pause
      clearInterval(typingInterval);

      setTimeout(() => {
        // Reset the text to empty for the next line
        setText('');
        setCurrentIndex(0);
        setCurrentLine(prevLine => (prevLine + 1) % lines.length); // Loop back to first line after the last one
      }, 1500); // Pause for 1.5 seconds before starting next line
    }

    return () => clearInterval(typingInterval); // Clean up the interval when done
  }, [currentIndex, currentLine]); // Effect runs when currentIndex or currentLine updates

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval); // Clean up cursor blinking
  }, []);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white min-h-screen">
        {/* Contact Text Section */}
        <div className="mt-16 py-6 dark:bg-slate-900 dark:text-white">
          <p className="px-10">
            I’m always excited to connect with new people and build
            meaningful relationships. Whether you have a question, want to
            discuss a project, or simply want to reach out, I’m here to help. I
            believe in open communication and am happy to provide any insights
            or assistance you may need. If you're interested in collaborating,
            working together, or need advice on a particular topic, don't
            hesitate to get in touch. I always welcome feedback on my work, as it
            helps me improve and grow. Feel free to share your thoughts or
            ideas; I’m all ears! You can contact me directly through my social
            website below, and I will respond as soon as possible. Additionally, if
            you prefer, you can reach me via email or through my social media
            profiles. Your messages are important to me, and I make it a
            priority to respond quickly. I look forward to hearing from you and
            exploring new opportunities together!
          </p>
        </div>

        {/* Profile Card */}
        <div className="flex items-center justify-center dark:bg-slate-900 dark:text-white">
          <div className="card glass w-96 mt-16">
            {/* Profile Image */}
            <div className="avatar flex justify-center mt-10">
              <div className="w-32 rounded-full">
                <img src="src/profile.jpg" alt="Rohan Kelaskar" />
              </div>
            </div>

            {/* Card Body */}
            <div className="card-body flex space-y-3">
              <h2 className="card-title justify-center">Rohan Kelaskar</h2>
              <div className=" flex justify-center">
                <span>{text}</span>
                <span className="cursor">{showCursor ? '|' : ''}</span>
                <style jsx>{`
                  .cursor {
                    animation: blink 1s infinite step-start;
                  }

                  @keyframes blink {
                    50% {
                      opacity: 0;
                    }
                  }
                `}</style>
              </div>

              <div className="card-actions flex justify-center">
                <a href="https://github.com/Rohan-Kelaskar-36">
                  <button className="btn btn-primary">Github</button>
                </a>
                <a href="#">
                  <button className="btn btn-primary">Instagram</button>
                </a>
                <a href="https://www.linkedin.com/in/rohan-kelaskar-890418234/">
                  <button className="btn btn-primary">linkedin</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
