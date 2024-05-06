import type { UserProfile } from "$lib/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {

  async function get(): Promise<UserProfile> {
    return (await fetch('http://localhost:8000/profiles/' + 8)).json();
  }

  return {
    user: await get()
  }
}
