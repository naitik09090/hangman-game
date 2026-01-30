import React, { useEffect, useRef } from "react";

const Figure = ({ wrongLetters }) => {
  const errors = wrongLetters.length;
  const bodyAnimRef = useRef(null);
  const headAnimRef = useRef(null);
  const scalesAnimRef = useRef(null);

  useEffect(() => {
    if (errors === 6) {
      // Force restart animations when they appear
      if (bodyAnimRef.current) bodyAnimRef.current.beginElement();
      if (scalesAnimRef.current) scalesAnimRef.current.beginElement();
      if (headAnimRef.current) headAnimRef.current.beginElement();
    }
  }, [errors]);

  // High-Quality Coiling Path: 
  // 1. Slither/Coil UP the main pole (X=60)
  // 2. Slither/Coil ACROSS the beam (Y=20)
  // 3. Coil DOWN the right stick (X=140)
  // 4. Final Strike
  const snakePath =
    "M 60 230 " +
    "Q 80 215 60 200 Q 40 185 60 170 Q 80 155 60 140 Q 40 125 60 110 Q 80 95 60 80 Q 40 65 60 50 Q 80 35 60 20 " + // Pole Coils
    "L 60 20 " +
    "Q 80 0 100 20 " + // Coil Over
    "Q 120 40 140 20 " + // Coil Under
    "Q 160 40 140 75"; // Coil down to head

  return (
    <svg height="250" width="200" className={`figure-container ${errors === 6 ? "lost" : ""}`}>
      {/* <!-- Gallows Structure --> */}
      <g className="gallows" strokeLinecap="round">
        <line x1="60" y1="20" x2="140" y2="20" stroke="#5d4037" strokeWidth="4" />
        <line x1="140" y1="20" x2="140" y2="50" stroke="#5d4037" strokeWidth="4" />
        <line x1="60" y1="20" x2="60" y2="230" stroke="#795548" strokeWidth="8" />
        <line x1="20" y1="230" x2="100" y2="230" stroke="#3e2723" strokeWidth="10" />
      </g>

      {/* <!-- The Snake (Body Hidden until Head Runs) --> */}
      {
        errors === 6 && (
          <g id="dynamic-snake-group">
            <defs>
              {/* Vibrant Jungle Python Gradient */}
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#84cc16" /> {/* Lime-500 */}
                <stop offset="50%" stopColor="#22c55e" /> {/* Green-500 */}
                <stop offset="100%" stopColor="#15803d" /> {/* Green-700 */}
              </linearGradient>

              {/* Organic Head Gradient */}
              <radialGradient id="headGrad" cx="30%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#166534" />
              </radialGradient>

              {/* Soft Depth Shadow */}
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
              </filter>

              {/* Reveal Mask */}
              <mask id="snakeRevealMask">
                <path
                  d={snakePath}
                  stroke="white"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                >
                  <animate
                    ref={bodyAnimRef}
                    attributeName="stroke-dashoffset"
                    from="1"
                    to="0"
                    dur="5s"
                    fill="freeze"
                    begin="indefinite"
                  />
                </path>
              </mask>
            </defs>

            {/* Masked Body Group */}
            <g mask="url(#snakeRevealMask)">
              {/* Main Body (Rich Vibrant Green) */}
              <path
                d={snakePath}
                fill="none"
                stroke="url(#bodyGrad)"
                strokeWidth="14"
                strokeLinecap="round"
                filter="url(#shadow)"
              />

              {/* Python Pattern (Dark Green Scales) */}
              <path
                d={snakePath}
                fill="none"
                stroke="#022c22"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray="0.5 12"
                strokeOpacity="0.15"
                pathLength="1"
              />

              {/* Secondary Detail Pattern (Light spots) */}
              <path
                d={snakePath}
                fill="none"
                stroke="#ecfccb"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="0 12"
                strokeDashoffset="6"
                strokeOpacity="0.4"
                pathLength="1"
              />
            </g>

            {/* HIGH-QUALITY HEAD */}
            <g>
              <animateMotion
                ref={headAnimRef}
                dur="5s"
                begin="indefinite"
                fill="freeze"
                rotate="auto"
                path={snakePath}
              />

              <g transform="scale(1.3)">
                {/* Organic Head Shape */}
                <path
                  d="M -6 -5 C -2 -8, 2 -8, 7 -4 L 8 0 L 7 4 C 2 8, -2 8, -6 5 Q -8 0, -6 -5 Z"
                  fill="url(#headGrad)"
                  stroke="#14532d"
                  strokeWidth="0.5"
                />

                {/* Expressive Eyes */}
                <ellipse cx="2" cy="-2.5" rx="1.8" ry="2" fill="white" stroke="#064e3b" strokeWidth="0.2" />
                <ellipse cx="2" cy="2.5" rx="1.8" ry="2" fill="white" stroke="#064e3b" strokeWidth="0.2" />

                {/* Pupils (Looking forward) */}
                <circle cx="2.5" cy="-2.5" r="0.8" fill="black" />
                <circle cx="2.5" cy="2.5" r="0.8" fill="black" />

                {/* Nostrils */}
                <circle cx="6" cy="-1.5" r="0.4" fill="#022c22" opacity="0.6" />
                <circle cx="6" cy="1.5" r="0.4" fill="#022c22" opacity="0.6" />

                {/* Flickering Tongue */}
                <path d="M 7 0 L 11 0 L 13 -1.5 M 11 0 L 13 1.5" stroke="#ef4444" strokeWidth="1.2" fill="none">
                  <animate attributeName="opacity" values="1;0;1" dur="0.2s" repeatCount="indefinite" />
                </path>
              </g>
            </g>
          </g>
        )
      }

      {/* <!-- Stickman Parts --> */}
      <g className={`figure-parts ${errors === 6 ? "lost" : ""}`}>
        {errors > 0 && <circle cx="140" cy="70" r="20" />}
        {errors > 1 && <line x1="140" y1="90" x2="140" y2="150" />}
        {errors > 2 && <line x1="140" y1="120" x2="120" y2="100" />}
        {errors > 3 && <line x1="140" y1="120" x2="160" y2="100" />}
        {errors > 4 && <line x1="140" y1="150" x2="120" y2="180" />}
        {errors > 5 && <line x1="140" y1="150" x2="160" y2="180" />}
      </g>

      {/* UI Text */}
      {
        errors === 6 && (
          <text
            x="100"
            y="50"
            className="bite-text-v3"
            fill="#ffca28"
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
            style={{ fontFamily: "'Luckiest Guy', cursive" }}
          >
            {/* SNAKE IS HUNTING... */}
          </text>
        )
      }
    </svg >
  );
};

export default Figure;
