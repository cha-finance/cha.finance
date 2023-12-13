import React from "react";
import { useAccount, useDisconnect } from "wagmi";
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
import { inherits } from "util";
import { NetworkSwitcher } from "../NetworkSwitcher";
import { Button, TextButton } from "../common/BoxSwap/style";

const HomePage = () => {
  const { isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <PageWrapper>
      <PageWrapperFlex>
        <TopPageWrapper>
          <FlexLogo>
            <TextLogo>Cha.Finance</TextLogo>
          </FlexLogo>
          <TextDesc>
            Cha.Finance is a DEFI 3.0 protocol that aims to reinvent and
            decentralize finances across WEB3.
          </TextDesc>
          {/* {isConnected && (
            <Button onClick={() => disconnect()}>
              <TextButton>Disconnect from {connector?.name}</TextButton>
            </Button>
          )} */}
          <BoxSwap />
        </TopPageWrapper>
        <TextDesc>
          CHA is the native token of the protocol. The stealth project was built
          by a community of anonymous coders, and researchers. The launch is
          expected on 31 December, 2024.
        </TextDesc>

        <br />
        <br />
        <br />
        <TextDesc>
          <p style={{ fontSize: 14 }}>
            We support conversion of LUA to CHA on Ethereum automaticaly. <br />
            To convert LUA on Viction to CHA, contact us via telegram:{" "}
            <a
              style={{ color: "inherit" }}
              href="https://t.me/chafinancesupporter"
            >
              @chafinancesupporter
            </a>
            <br />
            LUA will be lock forever in{" "}
            <a
              style={{ color: "inherit" }}
              href="https://etherscan.io/address/0x33bc5ad2e08a8969111eabef864eb5b75d344723"
              target="__blank"
            >
              0x33bc5ad2e08a8969111eabef864eb5b75d344723
            </a>
          </p>
        </TextDesc>
      </PageWrapperFlex>
      {/* <LeftImageBox>
        <LeftImage />
      </LeftImageBox>
      <RightImageBox>
        <RightIcon />
      </RightImageBox> */}
    </PageWrapper>
  );
};

export default HomePage;
