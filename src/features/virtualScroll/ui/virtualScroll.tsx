import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useFetchPostsQuery } from "../api/posts.api";
import { Box, Card, CardBody, Heading, Text, VStack } from "@chakra-ui/react";
import { useVirtualScroll } from "../hooks/useVirtualScroll";
import { IPost } from "entities/post/model";

export const PostsVirtualScroll: React.FC = () => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [itemsCount, setItemsCount] = useState(10);
  const [query, setQuery] = useState({ limit: 10, start: 0 });
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data, isLoading } = useFetchPostsQuery(query);
  const { virtualItems, totalHeight, startIndex, endIndex } = useVirtualScroll({
    itemHeight: 90,
    itemsCount: itemsCount,
    listHeight: 600,
    getScrollElement: useCallback(() => scrollElementRef.current, []),
  });

  useEffect(() => {
    if (data) {
      setPosts([...posts, ...data]);
    }
    if (posts.length) {
      setItemsCount(posts.length);
    }
    console.log();
  }, [data]);

  useEffect(() => {
    const scrollElement = scrollElementRef.current;

    if (!scrollElement) {
      return;
    }
    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop;
      console.log(scrollTop, itemsCount * 90 - 750);
      if (scrollTop > itemsCount * 90 - 750 && posts.length) {
        console.log(scrollTop, (itemsCount / 2) * 90);

        setQuery({ limit: 10, start: posts.length });
      }
    };

    scrollElement.addEventListener("scroll", handleScroll);

    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [isLoading, posts, startIndex]);

  return (
    <Box ref={scrollElementRef} position="relative" h="600px" overflow="auto">
      <VStack w="100%" height={totalHeight} spacing="10px">
        {posts.length ? (
          virtualItems.map((virtualItem) => {
            const item = posts[virtualItem.index]!;
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
          })
        ) : (
          <div>loading</div>
        )}
      </VStack>
    </Box>
  );
};
