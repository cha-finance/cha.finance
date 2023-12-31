import React, { useEffect, useMemo, useState } from "react";
import {
  Address,
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
  BoxKWPRes,
  BoxLuaRes,
  WrapperInfo,
  BoxIcon,
  MaxBtn,
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
  useWaitForTransaction,
  useSwitchNetwork,
  useNetwork
} from "wagmi";
import { CHA_FINANCE_ADDRESS, LUA_ADDRESS } from "../../../constants";

import ChaFinanceABI from "../../../abi/ChaFinance.json";
import LuaABI from "../../../abi/LUA.json";
import BigNumber from "bignumber.js";
import { formatAddress } from "../../../utils/formatAddress";
import { BIG_TEN } from "../../../utils/formatBalance";
import { Flex, FlexInput, TextDesc } from "../../pages/styles";
import { NetworkSwitcher } from "../../NetworkSwitcher";

const BoxSwap = () => {
  const { connector, isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  const {
    data: luaBalance,
    isError: isLuaBalanceErr,
    isLoading: isLoadingLUABalance,
    refetch: refetchLua,
  } = useBalance({
    address,
    token: LUA_ADDRESS,
  });

  const luaBalanceValue = useMemo(() => {
    let v = new BigNumber(luaBalance?.value.toString() || "0")
      .dividedBy(BIG_TEN.pow(18))
      .toNumber();
    return parseFloat((v.toString().match(new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?')) as any)[0] || v.toString());
  }, [luaBalance]);

  const [luaInputValue, setLuaInputValue] = useState<string | number>(
    luaBalanceValue
  );

  useEffect(() => {
    setLuaInputValue(luaBalanceValue)
  }, [luaBalanceValue])

  const {
    data: CHABalance,
    isError,
    isLoading: isLoadingCHABalance,
    refetch: refetchCHA,
  } = useBalance({
    address,
    token: CHA_FINANCE_ADDRESS,
  });

  const chaBalanceValue = useMemo(() => {
    return new BigNumber(CHABalance?.value.toString() || "0")
      .dividedBy(BIG_TEN.pow(18))
      .toNumber();
  }, [CHABalance]);

  const {
    data: dataCheckAllowance,
    isError: isErrorCheckAllowance,
    isLoading: isLoadingCheckAllowance,
    refetch: refetchApproved,
  } = useContractRead({
    address: LUA_ADDRESS,
    abi: LuaABI,
    functionName: "allowance",
    args: [address, CHA_FINANCE_ADDRESS],
  });

  console.log(dataCheckAllowance);

  const balanceAllowanced = useMemo(() => {
    return new BigNumber(dataCheckAllowance?.toString() || "0")
      .dividedBy(BIG_TEN.pow(18))
      .toNumber();
  }, [dataCheckAllowance]);

  console.log(balanceAllowanced);

  const isApprovedChaFinanceSpencer = useMemo(() => {
    return luaBalanceValue - balanceAllowanced <= 0;
  }, [luaBalanceValue, balanceAllowanced]);

  const isDisableButton = useMemo(() => {
    if (!luaInputValue || Number(luaInputValue) <= 0) {
      return true;
    } else if (
      new BigNumber(luaInputValue)
        .multipliedBy(BIG_TEN.pow(18))
        .minus(new BigNumber((luaBalance?.value || "0").toString()))
        .toNumber() > 0
    ) {
      return true;
    }
    return false;
  }, [luaInputValue, luaBalance]);

  // handle approve
  const { config: configApproveCHA, error: errorConfigApproveCHA } =
    usePrepareContractWrite({
      address: LUA_ADDRESS,
      abi: LuaABI,
      functionName: "approve",
      args: [
        CHA_FINANCE_ADDRESS,
        new BigNumber(luaInputValue)
          .multipliedBy(BIG_TEN.pow(18))
          .minus(new BigNumber((luaBalance?.value || "0").toString()))
          .toNumber() < 0
          ? new BigNumber(luaInputValue).multipliedBy(BIG_TEN.pow(18))
          : luaBalance?.value
          ? new BigNumber(luaBalance?.value.toString())
          : 0,
      ],
    });

  const {
    data: dataApproveChaFinance,
    writeAsync: onHandleApproveChaFinanceAsync,
    isLoading: isLoadingApprove,
  } = useContractWrite(configApproveCHA);

  const onHandleApproveChaFinance = async () => {
    if (isDisableButton) {
      return;
    } else {
      try {
        await onHandleApproveChaFinanceAsync?.();
      } catch (error) {
        console.log(error);
      } finally {
        refetchApproved();
      }
    }
  };

  const { isLoading: isLoadingWaitApprove, isSuccess: isSuccessWaitApprove } =
    useWaitForTransaction({
      hash: dataApproveChaFinance?.hash,
    });

  useEffect(() => {
    refetchApproved();
  }, [isSuccessWaitApprove]);

  // handle convert LUA to CHA

  const { config: configConvertToCHA, error: errorConvert } =
    usePrepareContractWrite({
      address: CHA_FINANCE_ADDRESS,
      abi: ChaFinanceABI,
      functionName: "mint",
      args: [
        new BigNumber(luaInputValue)
          .multipliedBy(BIG_TEN.pow(18))
          .minus(new BigNumber((luaBalance?.value || "0").toString()))
          .toNumber() < 0
          ? new BigNumber(luaInputValue).multipliedBy(BIG_TEN.pow(18))
          : luaBalance?.value
          ? new BigNumber(luaBalance?.value.toString())
          : 0,
      ],
    });

  console.log(errorConvert, "errorConvert");

  const {
    data: dataConverToCHA,
    writeAsync: onHandleConverToCHAAsync,
    isLoading: isLoadingMint,
  } = useContractWrite(configConvertToCHA);

  const onHandleConverToCHA = async () => {
    if (isDisableButton) {
      return;
    } else {
      try {
        await onHandleConverToCHAAsync?.();
      } catch (error) {
        console.log(error);
      } finally {
        refetchLua();
        refetchCHA();
      }
    }
  };

  const { isLoading: isLoadingWaitMint, isSuccess: isSuccessWaitMint } =
    useWaitForTransaction({
      hash: dataConverToCHA?.hash,
    });

  useEffect(() => {
    refetchLua();
    refetchCHA();
  }, [isSuccessWaitMint]);

  return (
    <>
      {isConnected ? (
        <>
          {luaBalanceValue === 0 || isSuccessWaitMint ? (
            <WrapperBoxSwap>
              <BoxLuaRes>
                <WrapperChild>
                  <FlexWrap>
                    <FlexToken>
                      <TextLua>Your CHA</TextLua>
                    </FlexToken>
                  </FlexWrap>
                </WrapperChild>
              </BoxLuaRes>
              <BoxKWPRes>
                <WrapperChild>
                  <FlexWrap>
                    <FlexToken>
                      <BoxIcon>
                        <KwpIcon />
                      </BoxIcon>

                      <TextKWP>CHA</TextKWP>
                    </FlexToken>
                    <TextKWP>
                      {parseFloat(chaBalanceValue.toFixed(2)).toLocaleString()}
                    </TextKWP>
                  </FlexWrap>
                </WrapperChild>
              </BoxKWPRes>
              <WrapperInfo>
                {isConnected && (
                  <AddressText>
                    Your Wallet: <Address>{formatAddress(address)}</Address>
                  </AddressText>
                )}
              </WrapperInfo>
            </WrapperBoxSwap>
          ) : (
            <WrapperBoxSwap>
              <BoxLua>
                <WrapperChild>
                  <div>
                    {isConnected && !isLoadingLUABalance ? (
                      <FlexInput>
                        <FlexWrap style={{width: '100%'}}>
                          <FlexToken>
                            <BoxIcon>
                              <LuaIcon />
                            </BoxIcon>

                            <TextLua>LUA</TextLua>
                          </FlexToken>
                          <input
                            type="number"
                            value={luaInputValue}
                            style={{border: 'none'}}
                            onChange={(event) =>
                              setLuaInputValue(event.target.value)
                            }
                          />
                        </FlexWrap>
                        <MaxBtn
                          onClick={() => setLuaInputValue(luaBalanceValue)}
                        >
                          Max
                        </MaxBtn>
                      </FlexInput>
                    ) : (
                      <FlexToken>
                        <BoxIcon>
                          <LuaIcon />
                        </BoxIcon>

                        <TextLua>LUA</TextLua>
                        <TextLua>0</TextLua>
                      </FlexToken>
                    )}
                  </div>
                </WrapperChild>
              </BoxLua>
              <BoxKWP>
                <SwapIconBox />
                <WrapperChild>
                  <FlexWrap>
                    <FlexToken>
                      <BoxIcon>
                        <KwpIcon />
                      </BoxIcon>
                      <TextKWP>CHA</TextKWP>
                    </FlexToken>
                    <TextKWP>
                      {parseFloat(luaInputValue.toString().trim() || '0').toLocaleString()}
                    </TextKWP>
                  </FlexWrap>
                  <NetworkSwitcher />
                  {isConnected && !chain?.unsupported && (
                    <>
                      {isApprovedChaFinanceSpencer ? (
                        <Button
                          disabled={isDisableButton}
                          onClick={() => {
                            onHandleConverToCHA();
                          }}
                        >
                          <TextButton>
                            {isLoadingMint || isLoadingWaitMint
                              ? "Converting..."
                              : "Convert LUA to CHA"}
                          </TextButton>
                        </Button>
                      ) : (
                        <Button
                          disabled={isDisableButton}
                          onClick={() => {
                            onHandleApproveChaFinance();
                          }}
                        >
                          <TextButton>
                            {isLoadingApprove || isLoadingWaitApprove
                              ? "Approving..."
                              : "Approve LUA"}
                          </TextButton>
                        </Button>
                      )}
                    </>
                  )}
                </WrapperChild>
              </BoxKWP>
              <WrapperInfo>
                {isConnected && (
                  <AddressText>
                    Your Wallet: <Address>{formatAddress(address)}</Address> |{" "}
                    <Address>{parseFloat(chaBalanceValue.toFixed(2)).toLocaleString()}</Address>{" "}
                    CHA&nbsp;&nbsp;&nbsp;
                  </AddressText>
                )}
              </WrapperInfo>
            </WrapperBoxSwap>
          )}
        </>
      ) : (
        <>
          <WrapperBoxSwap>
            <BoxLua>
              <WrapperChild>
                <FlexWrap>
                  <FlexToken>
                    <BoxIcon>
                      <LuaIcon />
                    </BoxIcon>
                    <TextLua>LUA</TextLua>
                  </FlexToken>
                  <TextLua>0</TextLua>
                </FlexWrap>
              </WrapperChild>
            </BoxLua>
            <BoxKWP>
              <SwapIconBox />
              <WrapperChild>
                <FlexWrap>
                  <FlexToken>
                    <BoxIcon>
                      <KwpIcon />
                    </BoxIcon>
                    <TextKWP>CHA</TextKWP>
                  </FlexToken>
                  <TextKWP>0</TextKWP>
                </FlexWrap>
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
                {connectors.filter((x) => x.ready && x.id !== connector?.id)
                  .length == 0 ? (
                  <TextButton>Cannot connect Metamask</TextButton>
                ) : (
                  <></>
                )}
              </WrapperChild>
            </BoxKWP>
            <WrapperInfo>
              {isConnected && (
                <AddressText>
                  Your Wallet: <Address>{formatAddress(address)}</Address> |{" "}
                  <Address>{parseFloat(chaBalanceValue.toFixed(2)).toLocaleString()}</Address>{" "}
                  CHA&nbsp;&nbsp;
                </AddressText>
              )}
            </WrapperInfo>
          </WrapperBoxSwap>
        </>
      )}
    </>
  );
};

export default BoxSwap;
