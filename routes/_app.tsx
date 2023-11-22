import { AppProps } from "$fresh/server.ts";
import { State } from "../middleware/state.ts";

export default function App({ Component, state }: AppProps<never, State>) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>sf</title>
      </head>
      <body className="bg-zinc-100 dark:bg-zinc-900">
        <div className="flex flex-col items-center w-full">
          <nav className="w-full md:w-2/3 px-2 mt-2 flex flex-row border-b-2">
            <p className="font-bold mr-2">sf</p>
            <p className="italic mr-2">a simple forum</p>
            <p>
              <a className="underline" href="/">Home</a>
            </p>
            <p className="ml-auto">
              {state.session
                ? (
                  <>
                    Hello, <i>{state.session.username}</i>{" "}
                    • (<a href="/logout" className="underline">logout</a>)
                  </>
                )
                : (
                  <>
                    Hello, <i>anonymous</i>{" "}
                    • (<a href="/login" className="underline">login</a>)
                  </>
                )}
            </p>
          </nav>
        </div>
        <div className="p-2 md:w-2/3 md:mx-auto">
          <Component />
        </div>
      </body>
    </html>
  );
}
