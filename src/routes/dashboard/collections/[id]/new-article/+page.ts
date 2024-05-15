import { api } from "$lib/utils/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  async function get() {
    const res = await fetch(api("/collections/", params.id));
    return await res.json();
  }
  return {
    info: await get()
  }
}
