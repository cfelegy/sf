import {
  defineRoute,
  Handlers,
  PageProps,
  RouteContext,
} from "$fresh/server.ts";
import { State } from "../../middleware/state.ts";

export const handler: Handlers<never, State> = {
  GET(_req, ctx) {
    return ctx.render();
  },

  async POST(req, ctx) {
    if (!ctx.state.session) {
      return new Response("not authorized", {
        status: 403,
      });
    }

    const boardName = ctx.params["board"];
    const threadName = ctx.params["thread"];

    const form = await req.formData();
    const msg = form.get("msg") as string;

    await ctx.state.repo.addPost(boardName, {
      author: ctx.state.session?.username,
      content: msg,
      thread: threadName,
      created_at: new Date(),
    });

    return await ctx.render();
  },
};

export default defineRoute(async (req, ctx: RouteContext<void, State>) => {
  const boardName = ctx.params["board"];
  const threadName = ctx.params["thread"];
  const posts = await ctx.state.repo.getPosts(boardName, threadName);

  return (
    <>
      <header>
        <h1>board: {boardName} & thread: {threadName}</h1>
      </header>
      <main>
        {posts.map((post) => (
          <div>
            <h2>
              on {post.created_at.toLocaleDateString()} at{" "}
              {post.created_at.toLocaleTimeString()} {post.author} wrote:
            </h2>
            <p>
              {post.content}
            </p>
            <hr />
          </div>
        ))}
      </main>
      <section>
        <p>new post</p>
        <form method="post" className="block">
          <textarea name="msg" className="border" />
          <button type="submit" className="border">post</button>
        </form>
      </section>
    </>
  );
});
