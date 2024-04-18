import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params }) => {
  return {
    user_name: `User with id: ${params.profile_id}`,
    user_img: "https://fakeimg.pl/200",
    user_bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    twitter_link: "https://twitter.com/AzyThv9zgZ",
    website_link: "www.arandade.com",
    collections: [
      {
        authorImg: 'https://fakeimg.pl/200/',
        alt: 'Avatar',
        authorName: 'Dreck Sallow',
        title: 'Rust ecosystem and more :)',
        link: '/collection/1',
      },
      {
        authorImg: 'https://fakeimg.pl/200/',
        alt: 'Avatar',
        authorName: 'Linus torvalds',
        title: 'Learn actix_web rust framework',
        link: '/collection/1',
      }
    ]
  }
}
