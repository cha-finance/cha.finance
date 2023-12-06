import React from "react";

import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = ({ ...props }) => {
  return (
    <Svg
      width="187"
      height="381"
      viewBox="0 0 187 381"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      { ...props }
    >
      <path
        d="M120 254L135.333 228L161 221L146.333 247.667L120 254Z"
        fill="black"
      />
      <path
        d="M143 263.009C154.834 262.786 173.723 266.808 154.606 284.672C135.49 302.536 146.641 305.891 154.606 305.336C162.799 304.336 177.956 301.67 173.04 299.003C166.896 295.67 150.51 301.003 154.606 321"
        stroke="black"
      />
      <circle cx="158.5" cy="352.5" r="28.5" fill="url(#paint0_linear_34_32)" />
      <circle cx="84.5" cy="169.5" r="31.5" fill="#6C7BFF" />
      <circle cx="5.5" cy="69.5" r="31.5" fill="#6C7BFF" />
      <path
        d="M171 212.938L-1 2V54.7345M171 212.938L148.245 251.655L109.763 261M171 212.938L132.183 223.285M109.763 261L-1 119.485V54.7345M109.763 261L132.183 223.285M-1 54.7345L132.183 223.285"
        stroke="black"
      />
      <path
        d="M67.6725 174.119L72.9596 180.514L80.1267 177.789L74.3502 182.831L77.5053 190.505L72.2182 184.11L65.0512 186.835L70.8276 181.793L67.6725 174.119Z"
        fill="white"
      />
      <path
        d="M177.037 339.372L175.427 347.512L182.07 351.341L174.511 350.054L170.562 357.352L172.172 349.212L165.529 345.383L173.088 346.669L177.037 339.372Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_34_32"
          x1="181.08"
          y1="370.988"
          x2="134.507"
          y2="331.125"
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
