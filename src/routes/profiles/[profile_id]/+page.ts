import { api } from "$lib/utils/api";
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, params }) => {
  const user_id = params.profile_id;
  async function getUserProfile() {
    const res = await fetch(api("/profiles/", user_id));
    return await res.json();
  }
  async function getUserCollections() {
    const res = await fetch(api("/collections/user/", user_id));
    return await res.json();
  }
  return {
    profile: await getUserProfile(),
    collections: await getUserCollections()
  }
}
