import { useEffect } from "react";
import { useFetchPostsQuery } from "../api";

const Post: React.FC = () => {
  const { data } = useFetchPostsQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return <div></div>;
};

export default Post;
