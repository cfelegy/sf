import { defineRoute, RouteContext } from "$fresh/server.ts";
import { State } from "../../middleware/state.ts";

export default defineRoute(async (req, ctx: RouteContext<void, State>) => {
  const boardName = ctx.params["board"];
  const board = await ctx.state.repo.getBoard(boardName);
  if (board === null) {
    return ctx.renderNotFound();
  }
  const threads = await ctx.state.repo.getThreads(boardName);

  return (
    <>
      <h1>board: {board.name}</h1>
      <hr />
      <h2>threads:</h2>
      {threads.map((thread) => (
        <li>
          <a href={`${boardName}/${thread.name}`}>{thread.name}</a>
        </li>
      ))}
      <hr />
      <a href={`/${boardName}/new`}>new thread</a>
    </>
  );
});
