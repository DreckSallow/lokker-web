import type { PageLoad } from "../../$types";

export const load: PageLoad = async ({ params }) => {
  return {
    articles: [
      {
        title: "Rust Basic concepts",
        content: "Rust basics standars concepts about programing using rust as main language"
      },
      {
        title: "Rust Basic concepts",
        content: "Javascript development with React as framework"
      }
    ]
  }
}
