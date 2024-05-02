import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types"

export const ssr = false; // prevent 500 server error
export const load: LayoutLoad = async () => {
  const user = localStorage.getItem("auth");
  if (!user) {
    redirect(307, "/");
  }
  return {
    user: JSON.parse(localStorage.getItem("auth") as any).user
  }
}
