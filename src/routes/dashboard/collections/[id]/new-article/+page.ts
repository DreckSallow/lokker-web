import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  async function get() {
    const res = await fetch("http://localhost:8000/collections/" + params.id);
    return await res.json();
  }
  return {
    info: await get()
  }
}
