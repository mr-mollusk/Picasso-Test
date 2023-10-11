import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const PostsPage = lazy(() => import("./postsPage"));
const PostDescriptionPage = lazy(() => import("./postDescriptionPage"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsPage />} />
      <Route path="/:id" element={<PostDescriptionPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
