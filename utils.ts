export function redirect(relativePath: string): Response {
  const headers = new Headers();
  headers.set("location", relativePath);
  return new Response(null, {
    headers,
    status: 302,
  });
}
