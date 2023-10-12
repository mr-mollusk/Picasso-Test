import { Container, Heading } from "@chakra-ui/react";
import { PostsVirtualScroll } from "features";

const PostsPage = () => {
  return (
    <Container maxW="container.lg" h="100vh" pt="5vh">
      <Heading mb="20px">Список постов</Heading>
      <PostsVirtualScroll />
    </Container>
  );
};

export default PostsPage;
