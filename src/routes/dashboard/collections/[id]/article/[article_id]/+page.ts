import { api } from "$lib/utils/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {

  async function getCollection() {
    const res = await fetch(api("/collections/", params.id));
    return await res.json();
  }

  async function getArticle() {
    const res = await fetch(api("/articles/", params.article_id));
    return await res.json();
  }

  return {
    collection: (await getCollection()).collection,
    article: await getArticle()
  }
}
