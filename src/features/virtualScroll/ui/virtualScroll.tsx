import { useCallback, useEffect, useRef } from "react";
import { useFetchPostsQuery } from "../api/posts.api";
import { Box, Card, CardBody, Heading, Text, VStack } from "@chakra-ui/react";
import { useVirtualScroll } from "../hooks/useVirtualScroll";

export const PostsVirtualScroll: React.FC = () => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const { virtualItems, totalHeight } = useVirtualScroll({
    itemHeight: 90,
    itemsCount: 100,
    listHeight: 600,
    getScrollElement: useCallback(() => scrollElementRef.current, []),
  });
  const { data } = useFetchPostsQuery({ start: 0, limit: 100 });
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (!data) return null;
  return (
    <Box ref={scrollElementRef} position="relative" h="600px" overflow="auto">
      <VStack w="100%" height={totalHeight} spacing='10px'>
        {virtualItems.map((virtualItem) => {
          const item = data[virtualItem.index]!;
          return (
            <Card
              key={item.id}
              w="100%"
              h="80px"
              position="absolute"
              transform={`translateY(${virtualItem.offsetTop}px)`}
            >
              <CardBody>
                <Heading as="h3" size="sm">
                  {item.title}
                </Heading>
                <Text>{item.body}</Text>
              </CardBody>
            </Card>
          );
        })}
      </VStack>
    </Box>
  );
};
