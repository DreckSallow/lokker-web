import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {

  async function get() {
    const res = await fetch("http://localhost:8000/collections/user/" + 8);
    return await res.json();
  }

  return {
    collections: await get()
  }
}
