import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useFetchPostByIdQuery } from "shared";
import { IFullpagePost } from "../model";
import { useNavigate } from "react-router";

export const FullpagePost: React.FC<IFullpagePost> = ({ id }) => {
  const navigate = useNavigate();
  const { data } = useFetchPostByIdQuery(id);

  const handleNavigate = () => {
    navigate("/");
  };

  useEffect(() => {}, []);
  if (!data) return <Spinner></Spinner>;
  return (
    <Center maxW="container.lg" h="100vh" m="0 auto">
      <Card>
        <CardHeader>
          <Heading>{data.title}</Heading>
        </CardHeader>
        <CardBody>{data.body}</CardBody>
        <CardFooter justifyContent="flex-end">
          <Button onClick={handleNavigate}>Назад</Button>
        </CardFooter>
      </Card>
    </Center>
  );
};
