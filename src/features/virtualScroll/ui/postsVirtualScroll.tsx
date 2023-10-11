import { useCallback, useEffect, useRef, useState } from "react";
import { useFetchPostsQuery } from "../../../shared/api";
import { Box, Spinner, VStack } from "@chakra-ui/react";
import { useVirtualScroll } from "../hooks/useVirtualScroll";
import { IPost, Post } from "entities/post";

export const PostsVirtualScroll: React.FC = () => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [itemsCount, setItemsCount] = useState(10);
  const [query, setQuery] = useState({ start: 0, limit: 10 });
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data, isLoading } = useFetchPostsQuery(query);
  const itemHeight = 90;
  const listHeight = 600;
  const { virtualItems, totalHeight, startIndex } = useVirtualScroll({
    itemHeight: itemHeight,
    itemsCount: itemsCount,
    listHeight: listHeight,
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
      console.log(scrollTop, itemsCount * itemHeight - (listHeight + 150));
      if (
        scrollTop > itemsCount * itemHeight - (listHeight + 150) &&
        posts.length
      ) {
        console.log(scrollTop, (itemsCount / 2) * itemHeight);

        setQuery({ limit: 10, start: posts.length });
      }
    };

    scrollElement.addEventListener("scroll", handleScroll);

    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [isLoading, itemsCount, posts, startIndex]);

  return (
    <Box ref={scrollElementRef} position="relative" h="600px" overflow="auto">
      <VStack w="100%" height={totalHeight} spacing="10px">
        {posts.length ? (
          virtualItems.map((virtualItem) => {
            const { id, userId, body, title } = posts[virtualItem.index]!;
            return (
              <Post
                key={id}
                body={body}
                title={title}
                id={id}
                userId={userId}
                offsetTop={virtualItem.offsetTop}
              />
            );
          })
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
      </VStack>
    </Box>
  );
};
