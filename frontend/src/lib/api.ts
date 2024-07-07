import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";

const client = hc<ApiRoutes>("/");

export const api = client.api;
async function getCurrentUser() {
  const response = await api.me.$get();
  if (!response.ok) {
    throw new Error("Failed to get current User");
  }
  const data = await response.json();
  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["total-spent"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
