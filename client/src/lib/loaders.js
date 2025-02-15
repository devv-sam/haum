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
  const postPromise = apiRequest("/api/users/profilePosts");
  return defer({
    postResponse: postPromise,
  });
};

export { singlePageLoader, listPageLoader, portfolioLoader };
