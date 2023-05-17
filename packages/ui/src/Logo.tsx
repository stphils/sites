import * as React from "react";

export function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 128 128`}>
      <title>Logo</title>
      <defs>
        <style>
          {
            ".prefix__cls-1,.prefix__cls-2{fill:none;stroke-linecap:round;stroke-width:10px}.prefix__cls-1{stroke:#172b4d}.prefix__cls-2{stroke:#ff5630}.prefix__cls-7{fill:#172b4d}"
          }
        </style>
      </defs>
      <path className="prefix__cls-1" d="M64 33v62M87 55H41" />
      <path className="prefix__cls-2" d="M111.75 29.34a59 59 0 01-13 82.41" />
      <path
        d="M45.78 7.9a59 59 0 0174.35 37.88"
        stroke="#00b8d9"
        fill="none"
        strokeLinecap="round"
        strokeWidth={10}
      />
      <path
        d="M5 64A59 59 0 0164 5"
        stroke="#6554c0"
        fill="none"
        strokeLinecap="round"
        strokeWidth={10}
      />
      <path
        d="M45.78 120.13A59 59 0 017.9 45.78"
        stroke="#ffab00"
        fill="none"
        strokeLinecap="round"
        strokeWidth={10}
      />
      <path
        d="M111.75 98.7a59 59 0 01-82.41 13"
        stroke="#36b37e"
        fill="none"
        strokeLinecap="round"
        strokeWidth={10}
      />
      <path
        className="prefix__cls-2"
        d="M98.7 111.75a58.84 58.84 0 0023.84-40.25"
      />
    </svg>
  );
}
