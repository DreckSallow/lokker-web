import type { PageLoad } from "../../$types";

export const load: PageLoad = async ({ params, url }) => {
  const article_id = params.article_id;
  const coll_id = params.id;
  return {
    title: "Rust Basic concepts - " + article_id,
    content: "Rust basics standars concepts about programing using rust as main language"
  }
}
