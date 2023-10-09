import { PageProps, RouteContext } from "$fresh/server.ts";
import { State } from "../middleware/state.ts";

export default function Home({ state }: PageProps<never, State>) {
  return (
    <>
      Index Page
      <br />
      {state.session
        ? (
          <>
            Logged in as {state.session.username}
            <br />
            <a href="/logout">Log out</a>
          </>
        )
        : <a href="/login">Log in</a>}
      <br />
    </>
  );
}
