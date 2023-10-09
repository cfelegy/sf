import { Session } from "./session.ts";

export interface State {
  kv: Deno.Kv;
  session?: Session;
  setSessionId?: string | null;
}
