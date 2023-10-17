import { Handlers } from "$fresh/server.ts";
import { State } from "../../middleware/state.ts";
import { redirect } from "../../utils.ts";

export const handler: Handlers<never, State> = {
  async GET(_req, ctx) {
    return await ctx.render();
  },

  async POST(req, ctx) {
    if (!ctx.state.session) {
      return new Response(null, {
        status: 403,
      });
    }

    const boardName = ctx.params["board"];

    const form = await req.formData();
    const name = form.get("name") as string;

    await ctx.state.repo.addThread(boardName, {
      name,
      author: ctx.state.session.username,
    });

    return redirect(`/${boardName}/${name}`);
  },
};

export default function NewThread() {
  return (
    <>
      <h1>new thread</h1>
      <form method="POST">
        <label>name</label>
        <input name="name" className="border" />
        <button type="submit">submit</button>
      </form>
    </>
  );
}
