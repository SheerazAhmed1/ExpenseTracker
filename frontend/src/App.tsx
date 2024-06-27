import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [totalSpent, settotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const response = await fetch("/api/expenses/total-spent");
      const data = await response.json();
      settotalSpent(data.totalSpent);
    }
    fetchTotalSpent();
  }, []);

  return (
    <>
      <Card className="w-[350px] m-auto mt-5">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount spent</CardDescription>
        </CardHeader>
        <CardContent>{totalSpent}</CardContent>
      </Card>
    </>
  );
}

export default App;
