import React, { useEffect, useMemo } from "react";
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
} from "wagmi";
import { CHA_FINANCE_ADDRESS, LUA_ADDRESS } from "../../../constants";

import ChaFinanceABI from "../../../abi/ChaFinance.json";
import LuaABI from "../../../abi/LUA.json";
import BigNumber from "bignumber.js";
import { formatAddress } from "../../../utils/formatAddress";
import { BIG_TEN } from "../../../utils/formatBalance";

const BoxSwap = () => {
  const { connector, isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
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
    return new BigNumber(luaBalance?.formatted || '0').toNumber()
  }, [luaBalance])

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
    return new BigNumber(CHABalance?.formatted || '0').toNumber()
  }, [CHABalance])

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

  const balanceAllowanced = useMemo(() => {
    return new BigNumber(dataCheckAllowance?.toString() || '0').dividedBy(BIG_TEN.pow(18)).toNumber()
  }, [dataCheckAllowance])

  const isApprovedChaFinanceSpencer = useMemo(() => {
    return luaBalanceValue - balanceAllowanced <= 0;
  }, [luaBalanceValue, balanceAllowanced]);

  // handle approve
  const { config: configApproveCHA, error: errorConfigApproveCHA } =
    usePrepareContractWrite({
      address: LUA_ADDRESS,
      abi: LuaABI,
      functionName: "approve",
      args: [
        CHA_FINANCE_ADDRESS,
        new BigNumber(luaBalanceValue - balanceAllowanced).multipliedBy(BIG_TEN.pow(18)),
      ],
    });

  const {
    data: dataApproveChaFinance,
    writeAsync: onHandleApproveChaFinanceAsync,
    isLoading: isLoadingApprove,
  } = useContractWrite(configApproveCHA);

  const onHandleApproveChaFinance = async () => {
    try {
      await onHandleApproveChaFinanceAsync?.();
    } catch (error) {
      console.log(error);
    } finally {
      refetchApproved();
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
      args: [new BigNumber(luaBalanceValue).multipliedBy(BIG_TEN.pow(18))],
    });

  const {
    data: dataConverToCHA,
    writeAsync: onHandleConverToCHAAsync,
    isLoading: isLoadingMint,
  } = useContractWrite(configConvertToCHA);

  const onHandleConverToCHA = async () => {
    try {
      await onHandleConverToCHAAsync?.();
    } catch (error) {
      console.log(error);
    } finally {
      refetchLua();
      refetchCHA();
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
      {!isSuccessWaitMint ? (
        <WrapperBoxSwap>
          <BoxLua>
            <WrapperChild>
              <FlexWrap>
                <FlexToken>
                  <LuaIcon />
                  <TextLua>LUA</TextLua>
                </FlexToken>
                {isConnected && !isLoadingLUABalance ? (
                  <TextLua>{Number(luaBalance?.formatted).toFixed(4)}</TextLua>
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
                  {isApprovedChaFinanceSpencer ? (
                    <Button
                      // disabled={!onHandleConverToCHA}
                      onClick={() => {
                        onHandleConverToCHA();
                      }}
                    >
                      <TextButton>
                        {isLoadingMint || isLoadingWaitMint
                          ? "Converting..."
                          : "Convert LUA"}
                      </TextButton>
                    </Button>
                  ) : (
                    <Button
                      // disabled={!onHandleApproveChaFinance}
                      onClick={() => {
                        onHandleApproveChaFinance();
                      }}
                    >
                      <TextButton>
                        {isLoadingApprove || isLoadingWaitApprove
                          ? "Approving..."
                          : "Approve CHA"}
                      </TextButton>
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
          {isConnected && <AddressText>Your Wallet: <Address>{formatAddress(address)}</Address></AddressText>}
        </WrapperBoxSwap>
      ) : (
        <WrapperBoxSwap>
          <BoxLuaRes>
            <WrapperChild>
              <FlexWrap>
                <FlexToken>
                  <LuaIcon />
                  <TextLua>You have</TextLua>
                </FlexToken>
              </FlexWrap>
            </WrapperChild>
          </BoxLuaRes>
          <BoxKWPRes>
            <WrapperChild>
              <FlexWrap>
                <FlexToken>
                  <KwpIcon />
                  <TextKWP>CHA</TextKWP>
                </FlexToken>
                <TextKWP>{CHABalance?.formatted}</TextKWP>
              </FlexWrap>
            </WrapperChild>
          </BoxKWPRes>
          {isConnected && <AddressText>Your Wallet: <Address>{formatAddress(address)}</Address></AddressText>}
        </WrapperBoxSwap>
      )}
       
    </>
  );
};

export default BoxSwap;
