import React, { useMemo } from "react";
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
  AddressText,
} from "./style";
import { KwpIcon, LuaIcon } from "../Svg";
import {
  useAccount,
  useBalance,
  useConnect,
  useContractRead,
  useContractWrite,
  useDisconnect,
  usePrepareContractWrite,
} from "wagmi";
import { CHA_FINANCE_ADDRESS, LUA_ADDRESS } from "../../../constants";

import ChaFinanceABI from "../../../abi/ChaFinance.json";
import LuaABI from "../../../abi/LUA.json";
import BigNumber from "bignumber.js";

const BoxSwap = () => {
  const { connector, isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const {
    data: luaBalance,
    isError,
    isLoading: isLoadingBalance,
  } = useBalance({
    address,
    token: LUA_ADDRESS,
  });

  const {
    data: dataCheckAllowance,
    isError: isErrorCheckAllowance,
    isLoading: isLoadingCheckAllowance,
  } = useContractRead({
    address: LUA_ADDRESS,
    abi: LuaABI,
    functionName: "allowance",
    args: [address, CHA_FINANCE_ADDRESS],
  });

  console.log(dataCheckAllowance, "dataCheckAllowance");

  const isApproveChaFinanceSpencer = useMemo(() => {
    return new BigNumber(dataCheckAllowance as any).toNumber();
  }, [dataCheckAllowance]);

  // handle approve
  const { config: configApproveCHA, error: errorConfigApproveCHA } = usePrepareContractWrite({
    address: LUA_ADDRESS,
    abi: LuaABI,
    functionName: "approve",
    args: [CHA_FINANCE_ADDRESS, luaBalance?.value],
  });

  const { data: dataApproveChaFinance, write: onHandleApproveChaFinance } =
    useContractWrite(configApproveCHA);
    
  

  // handle convert LUA to CHA

  const { config: configConvertToCHA, error: sadasd } = usePrepareContractWrite({
    address: CHA_FINANCE_ADDRESS,
    abi: ChaFinanceABI,
    functionName: "mint",
    args: [luaBalance?.value],
  });

  const { data: dataConverToCHA, write: onHandleConverToCHA } =
    useContractWrite(configConvertToCHA);

    console.log(sadasd, "sadasd");

  return (
    <>
      <WrapperBoxSwap>
        {isConnected && <AddressText>{address}</AddressText>}
        <BoxLua>
          <WrapperChild>
            <FlexWrap>
              <FlexToken>
                <LuaIcon />
                <TextLua>LUA</TextLua>
              </FlexToken>
              {isConnected && !isLoadingBalance ? (
                <TextLua>{luaBalance?.formatted}</TextLua>
              ) : (
                <TextLua>0</TextLua>
              )}
            </FlexWrap>
          </WrapperChild>
        </BoxLua>
        <BoxKWP>
          <SwapIconBox />
          <WrapperChild>
            <FlexWrap>
              <FlexToken>
                <KwpIcon />
                <TextKWP>CHA</TextKWP>
              </FlexToken>
              <TextKWP>0</TextKWP>
            </FlexWrap>
            {isConnected && (
              <>
                {!!isApproveChaFinanceSpencer ? (
                  <Button
                    // disabled={!onHandleConverToCHA}
                    onClick={() => {
                      console.log("hhihhihihihi");
                      onHandleConverToCHA?.();
                    }}
                  >
                    <TextButton>Convert LUA</TextButton>
                  </Button>
                ) : (
                  <Button
                    // disabled={!onHandleApproveChaFinance}
                    onClick={() => {
                      console.log("hohohohohohohohh");
                      onHandleApproveChaFinance?.()}}
                  >
                    <TextButton>Approve CHA</TextButton>
                  </Button>
                )}
              </>
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
    </>
  );
};

export default BoxSwap;
