import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IOffset, IPost } from "../model";
import { useNavigate } from "react-router";

export const Post: React.FC<IPost & IOffset> = ({
  id,
  title,
  body,
  offsetTop,
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${id}`);
  };
  return (
    <Card
      w="100%"
      h="80px"
      position="absolute"
      transform={`translateY(${offsetTop}px)`}
    >
      <CardBody>
        <HStack>
          <VStack w="100%" alignItems="flex-start">
            <Heading as="h3" size="sm">
              {title}
            </Heading>
            <Text>
              {body.length > 20 ? body.substring(0, 20) + "..." : body}
            </Text>
          </VStack>
          <Button onClick={handleNavigate}>Просмотр</Button>
        </HStack>
      </CardBody>
    </Card>
  );
};
