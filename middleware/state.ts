import { Repo } from "../model.ts";
import { Session } from "./session.ts";

export interface State {
  kv: Deno.Kv;
  repo: Repo;
  session?: Session;
  setSessionId?: string | null;
}
