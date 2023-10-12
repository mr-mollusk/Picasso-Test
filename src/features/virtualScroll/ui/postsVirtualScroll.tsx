import { useCallback, useEffect, useRef, useState } from "react";
import { useFetchPostsQuery } from "../../../shared/api";
import { Box, Spinner, VStack } from "@chakra-ui/react";
import { useVirtualScroll } from "../hooks/useVirtualScroll";
import { IPost, Post } from "entities/post";

export const PostsVirtualScroll: React.FC = () => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [itemsCount, setItemsCount] = useState(10);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState({ start: 0, limit: limit });
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data } = useFetchPostsQuery(query);
  const itemHeight = 90;
  const { virtualItems, totalHeight, startIndex } = useVirtualScroll({
    itemHeight: itemHeight,
    itemsCount: itemsCount,
    getScrollElement: useCallback(() => scrollElementRef.current, []),
  });

  useEffect(() => {
    if (data) {
      setPosts([...posts, ...data]);
      setItemsCount(posts.length + data.length);
    }
  }, [data]);

  useEffect(() => {
    const scrollElement = scrollElementRef.current;

    if (!scrollElement) {
      return;
    }

    const height = scrollElement.getBoundingClientRect().height;

    if (height > 800) {
      setLimit(15);
      setQuery({ limit: limit + 5, start: posts.length });
    }
  }, []);
  useEffect(() => {
    const scrollElement = scrollElementRef.current;

    if (!scrollElement) {
      return;
    }
    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop;
      const scrollHeight = scrollElement.scrollHeight;
      const clientHeight = scrollElement.clientHeight;

      if (
        Math.floor(scrollHeight - scrollTop) <= Math.ceil(clientHeight) &&
        posts.length
      ) {
        setQuery({ limit: limit, start: posts.length });
      }
    };
    console.log(limit);
    scrollElement.addEventListener("scroll", handleScroll);

    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [itemsCount, posts, startIndex, query, limit]);

  return (
    <Box
      ref={scrollElementRef}
      position="relative"
      h={`${window.innerHeight * 0.8}px`}
      overflow="auto"
    >
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
