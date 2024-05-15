import { api } from "$lib/utils/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  let token = JSON.parse(localStorage.getItem("auth") as any).token
  async function get(): Promise<{ name: string, total_articles: number, collection_id: number, checked: boolean }[]> {
    const res = await fetch(api("/collections/table_info"), {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return await res.json();
  }

  return {
    collections: await get()
  }
}
