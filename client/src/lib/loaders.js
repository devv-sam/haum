import apiRequest from "../lib/apiRequest";
import { defer } from "react-router-dom";
const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/api/posts/" + params.id);
  return res.data;
};

const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/api/posts?" + query);
  return defer({
    postResponse: postPromise,
  });
};
const portfolioLoader = async () => {
  try {
    const postPromise = apiRequest("/users/profilePosts");
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Response("", {
        status: 401,
        statusText: "Unauthorized",
      });
    }
    throw error;
  }
};

export { singlePageLoader, listPageLoader, portfolioLoader };
