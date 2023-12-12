import styled from "styled-components";

export const Text = styled.p`
  margin: 0;
`;

export const Box = styled.div``;

export const Flex = styled(Box)`
  display: flex;
`;

export const FlexLogo = styled(Flex)`
  gap: 16px;
  align-items: center;
`;

export const TextLogo = styled(Text)`
  color: #4c40f7;
  font-family: Poppins;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 1.8px;
`;

export const PageWrapper = styled(Box)`
  min-height: 100vh;
  position: relative;
//   background: rgb(252, 252, 252);
  background: radial-gradient(
    circle,
    rgba(252, 252, 252, 0.5) 0%,
    rgba(198, 200, 223, 0.5) 100%
  );
  padding: 0 15px;
`;

export const PageWrapperFlex = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0;
`;

export const TopPageWrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
`;

export const TextDesc = styled(Text)`
  margin-top: 30px;
  color: #4d4d4d;
  text-align: center;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 90%;
  max-width: 800px;
`;

export const LeftImageBox = styled(Box)`
  position: absolute;
  left: 0;
  top: 20%;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const RightImageBox = styled(Box)`
  position: absolute;
  right: 0;
  top: 20%;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
