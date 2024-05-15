import {
  PUBLIC_API_URL
} from "$env/static/public"

export function api(...params: (string | number | undefined)[]) {
  return `${PUBLIC_API_URL}${params.join('')}`
}
