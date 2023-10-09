import { Handlers, RouteContext } from "$fresh/server.ts";
import { State } from "../middleware/state.ts";
import { redirect } from "../utils.ts";
import { ulid } from "$std/ulid/mod.ts";

export const handler: Handlers<never, State> = {
  async GET(_req, ctx) {
    return await ctx.render();
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const username = form.get("name") as string;

    const sessionId = ulid();
    await ctx.state.kv.set(["session", sessionId], { username: username });
    ctx.state.setSessionId = sessionId;

    return redirect("/");
  },
};

export default function Login() {
  return (
    <form method="post">
      <label>Name</label>
      <input name="name" className="border" />
      <button type="submit">submit</button>
    </form>
  );
}
