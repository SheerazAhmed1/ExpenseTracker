import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "./lib/api";

import { useQuery } from "@tanstack/react-query";

async function getTotalSpent() {
  const response = await api.expenses["total-spent"].$get();
  if (!response.ok) {
    throw new Error("Failed to get total");
  }
  const data = await response.json();
  return data;
}

function App() {
  // Queries
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

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
        <CardContent>{data?.totalSpent}</CardContent>
      </Card>
    </>
  );
}

export default App;
