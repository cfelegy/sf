import { ulid } from "$std/ulid/mod.ts";

export class Repo {
  readonly kv: Deno.Kv;

  constructor(kv: Deno.Kv) {
    this.kv = kv;
  }

  async addBoard(board: Board): Promise<void> {
    const entry = await this.kv.get(["boards", board.name]);
    if (entry.value) {
      throw new Error(`board ${board.name} already exists`);
    }

    await this.kv.set(["boards", board.name], board);
  }

  async addPost(boardName: string, post: Post): Promise<void> {
    await this.kv.set(["posts", boardName, post.thread, ulid()], post);
  }

  async addThread(boardName: string, thread: Thread): Promise<void> {
    await this.kv.set(["board_threads", boardName, thread.name], thread);
  }

  async getBoard(name: string): Promise<Board | null> {
    return (await this.kv.get<Board>(["boards", name])).value;
  }

  async getBoards(): Promise<Board[]> {
    const entries = await this.kv.list<Board>({ prefix: ["boards"] });
    const boards = [];
    for await (const entry of entries) {
      boards.push(entry.value);
    }
    return boards;
  }

  async getThreads(boardName: string): Promise<Thread[]> {
    const entries = await this.kv.list<Thread>({
      prefix: ["board_threads", boardName],
    });
    const threads = [];
    for await (const entry of entries) {
      threads.push(entry.value);
    }
    return threads;
  }

  async getPosts(boardName: string, threadName: string): Promise<Post[]> {
    const entries = await this.kv.list<Post>({
      prefix: ["posts", boardName, threadName],
    });
    const posts = [];
    for await (const entry of entries) {
      posts.push(entry.value);
    }
    return posts;
  }

  async getUser(name: string): Promise<User> {
    const result = await this.kv.get(["user", name]);
    return result.value as User;
  }
}

type UserName = string;
export interface User {
  username: UserName;
  password: string;
  email: string;
}

type BoardName = string;
export interface Board {
  name: BoardName;
}

type ThreadName = string;
export interface Thread {
  name: ThreadName;
  author: UserName;
}

export interface Post {
  author: UserName;
  thread: ThreadName;
  content: string;
  created_at: Date;
}
