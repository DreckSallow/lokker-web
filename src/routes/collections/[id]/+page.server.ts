import { api } from "$lib/utils/api";
import type { PageLoad } from "../../$types";

export const load: PageLoad = async ({ params, fetch }) => {
  async function get_info() {
    const res = await fetch(api("/collections/", params.id));
    return await res.json();
  }
  const { collection, articles } = await get_info();
  return {
    collection,
    articles
  }
}
