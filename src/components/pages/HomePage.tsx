import React from "react";
import { useAccount } from "wagmi";
import {
  FlexLogo,
  LeftImageBox,
  PageWrapper,
  PageWrapperFlex,
  RightImageBox,
  TextDesc,
  TextLogo,
  TopPageWrapper,
} from "./styles";
import { LeftImage, LogoIcon, RightIcon } from "../common/Svg";
import BoxSwap from "../common/BoxSwap";

const HomePage = () => {
  const { isConnected } = useAccount();
  return (
    <PageWrapper>
      <PageWrapperFlex>
        <TopPageWrapper>
          <FlexLogo>
            <LogoIcon />
            <TextLogo>Cha.finance</TextLogo>
          </FlexLogo>
          <TextDesc>
            Cha.finance is a DEFI 3.0 protocol that aims to reinvent and
            decentralize finances across WEB3.
          </TextDesc>
          <BoxSwap />
        </TopPageWrapper>
        <TextDesc>
          Cha is the native token of the protocol. The stealth project was built
          by a community of anonymous coders, and researchers. The launch is
          expected on 31 December, 2024.
        </TextDesc>
      </PageWrapperFlex>
      <LeftImageBox>
        <LeftImage />
      </LeftImageBox>
      <RightImageBox>
        <RightIcon />
      </RightImageBox>
    </PageWrapper>
  );
};

export default HomePage;
