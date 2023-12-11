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
            <TextLogo>CHAFinance</TextLogo>
          </FlexLogo>
          <TextDesc>
            Lorem ipsum dolor sit amet consectetur. Consectetur nisl amet ipsum
            ac sed accumsan nunc viverra volutpat. Non eget sem quam et ac sit
            facilisis. Tempus nulla leo sem bibendum eget. Ipsum nisi nam massa
            quam a.
          </TextDesc>
          <BoxSwap />
        </TopPageWrapper>
        <TextDesc>
          Lorem ipsum dolor sit amet consectetur. Consectetur nisl amet ipsum ac
          sed accumsan nunc viverra volutpat. Non eget sem quam et ac sit
          facilisis. Tempus nulla leo sem bibendum eget. Ipsum nisi nam massa
          quam a.
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
