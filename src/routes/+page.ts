import type { PageLoad } from "./$types";

function wait(): Promise<string> {
  return new Promise((res, _rej) => {
    setTimeout(() => {
      console.log("Pass 4 second");
      res("");
    }, 2000);
  });
}
async function get_posts(nameFilter: string) {
  await wait();
  return [
    {
      authorImg: 'https://fakeimg.pl/200/',
      alt: 'Avatar',
      authorName: 'Dreck Sallow',
      title: 'Rust ecosystem and more :)',
      link: '/collection/1'
    },
    {
      authorImg: 'https://fakeimg.pl/200/',
      alt: 'Avatar',
      authorName: 'Linus torvalds',
      title: 'Learn actix_web rust framework',
      link: '/collection/1'
    }
  ].filter(({ title }) => title.includes(nameFilter));
}

export const load: PageLoad = async ({ url }) => {
  let nameFilter = url.searchParams.get("name") || "";
  return {
    //FIXME: change the streaming only for the browser
    // because from the server will return the data directly :(
    collections: get_posts(nameFilter)
  }
}
