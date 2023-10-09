import { AppProps } from "$fresh/server.ts";
import { State } from "../middleware/state.ts";

export default function App({ Component }: AppProps<never, State>) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>sf</title>
      </head>
      <body className="flex flex-col items-center">
        <nav className="w-2/3 flex-row m-4 p-4 bg-gray-200 rounded-md">
          <h1>sf | a simple forum</h1>
        </nav>
        <Component />
      </body>
    </html>
  );
}
