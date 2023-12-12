import styled from "styled-components";
import { Box, Flex, Text } from "../../pages/styles";
import { SwapIcon } from "../Svg";

export const WrapperBoxSwap = styled(Box)`
  position: relative;
  max-width: 600px;
  margin-top: 80px;
  //   height: 270px;
  width: 100%;
  margin-bottom: 48px;
`;

export const BorderBox = styled(Box)`
  border-radius: 30px;
  max-width: 600px;
`;

export const BoxLua = styled(BorderBox)`
  border: 1px solid rgba(0, 0, 0, 0.4);
  height: 270px;
  background: linear-gradient(
    258deg,
    rgba(255, 255, 255, 0.52) 3.81%,
    rgba(255, 255, 255, 0) 89.35%
  );
`;

export const BoxKWP = styled(BorderBox)`
  background: #6c7bff;
  position: absolute;
  bottom: 0;
  height: 170px;
  width: 100%;
  max-width: 600px;
`;

export const BoxKWPRes = styled(BoxKWP)`
  height: 90px;
`;

export const BoxLuaRes = styled(BoxLua)`
  height: 180px;
`;

export const TextLua = styled(Text)`
  color: #383838;
  font-family: SVN-Gilroy-Bold;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const TextKWP = styled(Text)`
  color: #fff;
  font-family: SVN-Gilroy-Bold;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const WrapperChild = styled(Box)`
  padding: 24px;
  height: calc(170px - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FlexToken = styled(Flex)`
  gap: 16px;
  align-items: center;
`;

export const FlexWrap = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  border-radius: 8px;
  background: #000;
  border: none;
  outline: none;
  padding: 10px 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-out;

  opacity: 0.8;

  &:hover {
    opacity: 1;
    transition: all 0.3s ease-out;
    transform: scale(1.02);
  }
`;

export const TextButton = styled(Text)`
  color: #fff;
  text-align: center;
  font-family: SVN-Gilroy-Bold;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0;
`;

export const SwapIconBox = styled(SwapIcon)`
  position: absolute;
  top: -24px;
  left: 48%;
  border: 1px solid #ddd;
  border-radius: 100%;
`;

export const AddressText = styled(Text)`
  font-family: SVN-Gilroy-Light;
  font-weight: 400;
`;

export const Address = styled.span`
  font-family: SVN-Gilroy-Bold;
`;

export const WrapperInfo = styled(Box)`
  position: absolute;
  right: 0;
  margin: 25px 0;
`;

export const BoxIcon = styled(Box)`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10%;
  overflow: hidden;
`
