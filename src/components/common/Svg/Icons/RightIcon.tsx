import React from "react";

import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = ({ ...props }) => {
  return (
    <Svg
      width="191"
      height="364"
      viewBox="0 0 191 364"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      { ...props }
    >
      <ellipse
        cx="28"
        cy="336.5"
        rx="28"
        ry="27.5"
        fill="url(#paint0_linear_34_31)"
      />
      <circle cx="149" cy="56" r="25" fill="#6C7BFF" />
      <path
        d="M149.276 36.6546L153.441 41.6929L159.088 39.5462L154.537 43.5188L157.023 49.5651L152.857 44.5267L147.21 46.6735L151.762 42.7009L149.276 36.6546Z"
        fill="white"
      />
      <path
        d="M24.3657 317.065L21.0693 324.437L26.5395 329.513L19.6479 326.65L14.3153 332.714L17.6118 325.342L12.1416 320.266L19.0331 323.129L24.3657 317.065Z"
        fill="white"
      />
      <path
        d="M56 56.3133L192 0V41.1976M56 56.3133V94.547L85.1429 123M56 56.3133L85.1429 86.5446M85.1429 123L192 76.7639V41.1976M85.1429 123V86.5446M192 41.1976L85.1429 86.5446"
        stroke="black"
      />
      <path
        d="M79 87.5139L62 69V92.8889L79 112V87.5139Z"
        fill="black"
        stroke="black"
      />
      <path
        d="M51.8429 118C43.1157 131.815 36.253 164.772 78.6194 186.086C87.2474 190.428 98.5531 207.992 74.7517 243.516C45 287.92 58.0907 301.833 78.6194 308.642C93.1977 313.477 63.1485 267.198 45 298.873"
        stroke="black"
      />
      <defs>
        <linearGradient
          id="paint0_linear_34_31"
          x1="50.1836"
          y1="354.339"
          x2="5.12725"
          y2="315.073"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#6C7BFF" />
          <stop offset="1" stop-color="#6C7BFF" stop-opacity="0.05" />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;
