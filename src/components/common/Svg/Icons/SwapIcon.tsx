import React from "react";

import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      { ...props }
    >
      <circle cx="21" cy="21" r="21" fill="white" />
      <path
        d="M22 12.75C22 12.1977 21.5523 11.75 21 11.75C20.4477 11.75 20 12.1977 20 12.75L22 12.75ZM20.2929 30.7071C20.6834 31.0976 21.3166 31.0976 21.7071 30.7071L28.0711 24.3431C28.4616 23.9526 28.4616 23.3195 28.0711 22.9289C27.6805 22.5384 27.0474 22.5384 26.6569 22.9289L21 28.5858L15.3431 22.9289C14.9526 22.5384 14.3195 22.5384 13.9289 22.9289C13.5384 23.3195 13.5384 23.9526 13.9289 24.3431L20.2929 30.7071ZM20 12.75L20 30L22 30L22 12.75L20 12.75Z"
        fill="black"
      />
    </Svg>
  );
};

export default Icon;
