import { useNetwork, useSwitchNetwork } from "wagmi";
import { Button, TextButton } from "./common/BoxSwap/style";
import styled from "styled-components";
import { Box } from "./pages/styles";

const Wrapper = styled(Box)`
  margin-top: 20px;
  font-family: Poppins;
  font-size: 16px;
  color: #4d4d4d;
`;

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <>
      {chain?.unsupported && (
        <Wrapper>
          <div>
            Connected to {chain?.name ?? chain?.id}
            {chain?.unsupported && " (unsupported)"}
          </div>
          {switchNetwork && (
            <div>
              Switch to:
              {chains.map((x) =>
                x.id === chain?.id ? null : (
                  <Button key={x.id} onClick={() => switchNetwork(x.id)}>
                    <TextButton>
                      {x.name}
                      {isLoading && x.id === pendingChainId && " (switching)"}
                    </TextButton>
                  </Button>
                )
              )}
            </div>
          )}
        </Wrapper>
      )}
    </>
  );
}
