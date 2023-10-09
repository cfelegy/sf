import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { deleteCookie, getCookies, setCookie } from "$std/http/cookie.ts";
import { State } from "./state.ts";

export interface Session {
  username: string;
}

export async function sessionHandler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const cookies = getCookies(req.headers);
  if ("sf_session" in cookies) {
    const res = await ctx.state.kv.get<Session>([
      "session",
      cookies["sf_session"],
    ]);

    if (res.value !== null) {
      ctx.state.session = res.value;
    }
  }

  const resp = await ctx.next();

  if (ctx.state.setSessionId !== undefined) {
    if (ctx.state.setSessionId === null) {
      deleteCookie(resp.headers, "sf_session");
    } else {
      setCookie(resp.headers, {
        name: "sf_session",
        value: ctx.state.setSessionId,
      });
    }
  }

  return resp;
}
