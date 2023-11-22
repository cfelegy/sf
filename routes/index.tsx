import { Handlers, PageProps, RouteContext } from "$fresh/server.ts";
import { Config } from "../config.ts";
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
      {state.session &&
        Config.administrators.includes(state.session?.username) && (
        <section className="mb-2">
          <h1 className="w-full border-b tracking-wider text-xl font-bold">
            administration zone
          </h1>
          <p>
            <a href="/admin/boards" className="underline">Manage Boards</a>
          </p>
        </section>
      )}
      <main>
        <h1 className="w-full border-b tracking-wider text-xl font-bold">
          discussion boards
        </h1>
        {data.boards.map((board) => (
          <div className="my-2">
            <a className="underline text-lg" href={`/${board.name}`}>
              {board.name}
            </a>
          </div>
        ))}
      </main>
    </>
  );
}
