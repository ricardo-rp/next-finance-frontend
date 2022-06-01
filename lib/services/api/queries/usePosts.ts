import { useQuery } from "react-query";
import { axiosInstance } from "../axios";

const fetchPosts = async (limit = 10) => {
  const { data } = await axiosInstance.get("posts");

  return data;
};

const usePosts = (limit: number) => {
  return useQuery(["posts", limit], () => fetchPosts(limit));
};

export { usePosts, fetchPosts };
