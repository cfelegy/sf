import { kvHandler } from "../middleware/kv.ts";
import { sessionHandler } from "../middleware/session.ts";

export const handler = [
  kvHandler,
  sessionHandler,
];
