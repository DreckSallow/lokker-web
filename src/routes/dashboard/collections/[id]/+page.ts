import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  async function get_info() {
    const res = await fetch("http://localhost:8000/collections/" + params.id);
    return await res.json();
  }
  const { collection, articles } = await get_info();
  return {
    collection,
    articles
  }
}
