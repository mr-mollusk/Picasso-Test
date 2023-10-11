import { Routing } from "pages";
import { StoreProvider, withProviders } from "./providers";
import { PostsVirtualScroll } from "features";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <StoreProvider>
      <ChakraProvider>
        <PostsVirtualScroll />
        <Routing />
      </ChakraProvider>
    </StoreProvider>
  );
};

export default withProviders(App);
