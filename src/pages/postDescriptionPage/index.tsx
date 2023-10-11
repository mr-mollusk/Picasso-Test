import { Center, Spinner } from "@chakra-ui/react";
import { FullpagePost } from "entities/fullpagePost";
import { useParams } from "react-router";

const PostDescriptionPage = () => {
  const { id } = useParams();

  if (!id)
    return (
      <Center maxW="container.lg" h="100vh" m="0 auto">
        <Spinner />
      </Center>
    );
  return (
    <Center maxW="container.lg" h="100vh" m="0 auto">
      <FullpagePost id={+id} />
    </Center>
  );
};

export default PostDescriptionPage;
