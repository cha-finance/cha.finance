import React from "react";

import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="60"
      viewBox="0 0 70 60"
      fill="none"
      {...props}
    >
      <path
        d="M69.0909 39.5455C69.0909 50.8422 59.933 60 48.6363 60C37.3396 60 28.1818 50.8422 28.1818 39.5455C28.1818 28.2487 37.3396 19.0909 48.6363 19.0909C59.933 19.0909 69.0909 28.2487 69.0909 39.5455Z"
        fill="#4C40F7"
      />
      <path
        d="M27.5 0L50.5284 13.2955V39.8864L27.5 53.1818L4.47156 39.8864V13.2955L27.5 0Z"
        fill="url(#paint0_linear_19_1406)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_19_1406"
          x1="27.5"
          y1="0"
          x2="27.5"
          y2="53.1818"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#7A7A7A" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;
