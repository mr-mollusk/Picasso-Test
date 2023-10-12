import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { IOffset, IPost } from "../model";
import { useNavigate } from "react-router";

export const Post: React.FC<IPost & IOffset> = ({
  id,
  title,
  body,
  offsetTop,
}) => {
  const [is600] = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${id}`);
  };
  return (
    <Card
      w="90%"
      h="80px"
      position="absolute"
      transform={`translateY(${offsetTop}px)`}
    >
      <CardBody>
        <HStack>
          <VStack w={is600 ? "60%" : "80%"} alignItems="flex-start">
            <Heading
              w={is600 ? "50%" : "80%"}
              as="h3"
              size="sm"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {title}
            </Heading>
            <Text>
              {body.length > 20
                ? body.substring(0, is600 ? 10 : 20) + "..."
                : body}
            </Text>
          </VStack>
          <Button onClick={handleNavigate} colorScheme="teal">
            Просмотр
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};
