import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { State } from "./state.ts";

export async function kvHandler(
  _req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  ctx.state.kv = await Deno.openKv();
  const resp = await ctx.next();
  ctx.state.kv.close();
  return resp;
}
