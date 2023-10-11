import { Routing } from "pages";
import { StoreProvider, withProviders } from "./providers";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <StoreProvider>
      <ChakraProvider>
        <Routing />
      </ChakraProvider>
    </StoreProvider>
  );
};

export default withProviders(App);
