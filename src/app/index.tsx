import { Routing } from "pages";
import { StoreProvider, withProviders } from "./providers";
import Post from "entities/post/ui/post";

const App = () => {
  return (
    <StoreProvider>
      <Post />
      <Routing />
    </StoreProvider>
  );
};

export default withProviders(App);
