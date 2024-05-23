import type { PageLoad } from "./$types";
import type { Article, Collection, UserProfile } from "$lib/types";
import { api } from "$lib/utils/api";

type ResponseType = {
  collection: Collection & { user_id: number };
  user_info: Pick<UserProfile, "username" | "email" | "profile_id">;
  articles: Pick<Article, "article_id" | "title" | "update_at">[]
}

export const load: PageLoad = async ({ params, fetch }) => {
  async function get_info(): Promise<ResponseType> {
    const res = await fetch(api("/collections/", params.id));
    return await res.json();
  }
  const { collection, articles, user_info } = await get_info();
  return {
    collection,
    articles,
    user_info
  }
}
