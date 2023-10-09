export class Repo {
  readonly kv: Deno.Kv;

  constructor(kv: Deno.Kv) {
    this.kv = kv;
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

type TopicName = string;
export interface Topic {
  name: TopicName;
}

type ThreadName = string;
export interface Thread {
  name: ThreadName;
  author: UserName;
}

export interface Post {
  name: string;
  thread: ThreadName;
  content: string;
}
