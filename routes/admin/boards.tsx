import { Handlers, PageProps } from "$fresh/server.ts";
import { State } from "../../middleware/state.ts";
import { Board } from "../../model.ts";
import { redirect } from "../../utils.ts";

interface Data {
  boards: Board[];
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const boards = await ctx.state.repo.getBoards();
    return await ctx.render({ boards });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const name = form.get("name") as string;

    await ctx.state.repo.addBoard({ name });

    return redirect("");
  },
};

export default function AdminBoards({ data }: PageProps<Data, State>) {
  return (
    <>
      <section>
        <p>add new board:</p>
        <form method="post">
          <label>name</label>
          <input name="name" className="border" />
          <button type="submit">submit</button>
        </form>
      </section>
      <main>
        <p>all boards:</p>
        <ul>
          {data.boards.map((board) => <li>{board.name}</li>)}
        </ul>
      </main>
    </>
  );
}
