import type { UserProfile } from "$lib/types";
import { api } from "$lib/utils/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {

  async function get(): Promise<UserProfile> {
    //FIXME: fix the static user id
    return (await fetch(api("/profiles/", 8))).json();
  }

  return {
    user: await get()
  }
}
