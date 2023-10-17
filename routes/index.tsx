import { Handlers, PageProps, RouteContext } from "$fresh/server.ts";
import { State } from "../middleware/state.ts";
import { Board, Repo } from "../model.ts";

interface HomeData {
  boards: Board[];
}

export const handler: Handlers<HomeData, State> = {
  async GET(_req, ctx) {
    const boards = await ctx.state.repo.getBoards();

    return await ctx.render({ boards });
  },
};

export default function Home({ data, state }: PageProps<HomeData, State>) {
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
      <main>
        {data.boards.map((board) => (
          <div>
            <a href={`/${board.name}`}>{board.name}</a>
          </div>
        ))}
      </main>
    </>
  );
}
