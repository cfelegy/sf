import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { Repo } from "../model.ts";
import { State } from "./state.ts";

export async function kvHandler(
  _req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  ctx.state.kv = await Deno.openKv();
  ctx.state.repo = new Repo(ctx.state.kv);

  const resp = await ctx.next();

  ctx.state.kv.close();
  return resp;
}
