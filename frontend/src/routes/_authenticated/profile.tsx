import { createFileRoute } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "../../lib/api";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Not Logged in</div>;
  }
  return (
    <div className="p-2">
      <h3>Hello From Profile!</h3>
      <p>Hello {data.user.family_name}</p>
      <a href="/api/logout">Logout</a>
    </div>
  );
}
