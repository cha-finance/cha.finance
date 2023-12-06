import styled from 'styled-components'
import { space } from 'styled-system'

import { SvgProps } from './types'

export const SvgOutline = styled.svg<SvgProps>`
  align-self: center; // Safari fix
  fill: none;
  flex-shrink: 0;
  ${space};

  // Safari fix
  @supports (-webkit-text-size-adjust: none) and (not (-ms-accelerator: true))
    and (not (-moz-appearance: none)) {
    filter: none !important;
  }
`

SvgOutline.defaultProps = {
  color: 'transparent',
  width: '20px',
  xmlns: 'http://www.w3.org/2000/svg',
}

export default SvgOutline
