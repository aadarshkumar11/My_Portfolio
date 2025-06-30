import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const TypewriterText: React.FC = () => (
  <span className="text-indigo-400">
    <Typewriter
      words={["Aadarsh", "AI Experience Architect", "Agentic Developer", "Tech Storyteller", "Frontend Futurist"
      ]}
      loop={0}
      cursor
      cursorStyle="_"
      typeSpeed={80}
      deleteSpeed={50}
      delaySpeed={1500}
    />
  </span>
);

export default TypewriterText;
