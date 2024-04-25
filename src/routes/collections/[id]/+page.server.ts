import type { PageLoad } from "../../$types";

export const load: PageLoad = async ({ params, fetch }) => {
  async function get_info() {
    const res = await fetch("http://localhost:8000/collections/" + params.id);
    // console.log(await res.json());
    return await res.json();
  }
  const { collection, articles } = await get_info();
  return {
    collection,
    articles
  }
}
