import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "@/lib/api";

import { useQuery } from "@tanstack/react-query";
export const Route = createFileRoute("/")({
  component: Index,
});
async function getTotalSpent() {
  const response = await api.expenses["total-spent"].$get();
  if (!response.ok) {
    throw new Error("Failed to get total");
  }
  const data = await response.json();
  return data;
}

function Index() {
  // Queries
  const { isPending, error, data } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <Card className="w-[350px] m-auto mt-5">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount spent</CardDescription>
        </CardHeader>
        <CardContent>{isPending ? "..." : data?.totalSpent}</CardContent>
      </Card>
    </>
  );
}
