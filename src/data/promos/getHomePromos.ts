import { getPromos } from "./getPromos";

export async function getHomePromos() {
  const store = await getPromos();
  return store.home;
}
