import { Container } from "@chakra-ui/react";
import { PostsVirtualScroll } from "features";

const PostsPage = () => {
  return (
    <Container maxW="container.lg" h="100vh" pt='5vh'>
      <PostsVirtualScroll />
    </Container>
  );
};

export default PostsPage;
