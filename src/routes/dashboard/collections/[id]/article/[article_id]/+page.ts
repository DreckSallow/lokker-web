import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {

  async function getCollection() {
    const res = await fetch("http://localhost:8000/collections/" + params.id);
    return await res.json();
  }

  async function getArticle() {
    const res = await fetch("http://localhost:8000/articles/" + params.article_id);
    return await res.json();
  }

  return {
    collection: (await getCollection()).collection,
    article: await getArticle()
  }
}
