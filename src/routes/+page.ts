import type { PageLoad } from "./$types";
export const load: PageLoad = async ({ fetch, url }) => {
  async function get() {
    let nameFilter = url.searchParams.get("name") || "";
    const res = await fetch("http://localhost:8000/collections/list_info?name=" + nameFilter);
    return res.json()
  }
  return {
    res: get(),
  }
}
