import { Container, Heading } from "@chakra-ui/react";
import { PostsVirtualScroll } from "features";

const PostsPage = () => {
  return (
    <Container
      maxW="container.lg"
      h={`${window.innerHeight}px`}
      pt="5vh"
      overflow="hidden"
    >
      <Heading mb="20px">Список постов</Heading>
      <PostsVirtualScroll />
    </Container>
  );
};

export default PostsPage;
