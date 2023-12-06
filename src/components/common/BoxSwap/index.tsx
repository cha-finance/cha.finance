import React from "react";
import {
  BoxKWP,
  BoxLua,
  Button,
  FlexToken,
  FlexWrap,
  SwapIconBox,
  TextButton,
  TextKWP,
  TextLua,
  WrapperBoxSwap,
  WrapperChild,
} from "./style";
import { KwpIcon, LuaIcon } from "../Svg";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Connect } from "../../Connect";

const BoxSwap = () => {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  return (
    <WrapperBoxSwap>
      <BoxLua>
        <WrapperChild>
          <FlexWrap>
            <FlexToken>
              <LuaIcon />
              <TextLua>LUA</TextLua>
            </FlexToken>
            <TextLua>0</TextLua>
          </FlexWrap>
        </WrapperChild>
      </BoxLua>
      <BoxKWP>
        <SwapIconBox/>
        <WrapperChild>
          <FlexWrap>
            <FlexToken>
              <KwpIcon />
              <TextKWP>KWP</TextKWP>
            </FlexToken>
            <TextKWP>0</TextKWP>
          </FlexWrap>
          {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )}
          {isConnected && (
            <Button>
              <TextButton>Convert LUA</TextButton>
            </Button>
          )}
          {connectors
            .filter((x) => x.ready && x.id !== connector?.id)
            .map((x) => (
              <Button onClick={() => connect({ connector: x })}>
                {isLoading && x.id === pendingConnector?.id ? (
                  <TextButton>Connecting Wallet... </TextButton>
                ) : (
                  <TextButton>Connect Wallet</TextButton>
                )}
              </Button>
            ))}
        </WrapperChild>
      </BoxKWP>
    </WrapperBoxSwap>
  );
};

export default BoxSwap;
