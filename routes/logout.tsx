import { Handlers } from "$fresh/server.ts";
import { State } from "../middleware/state.ts";
import { redirect } from "../utils.ts";

export const handler: Handlers<never, State> = {
  GET(_req, ctx) {
    ctx.state.setSessionId = null;

    return redirect("/");
  },
};
