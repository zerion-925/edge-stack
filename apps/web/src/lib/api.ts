import type { AppType } from "@edge-stack/api";
import { hc } from "hono/client";

const api = hc<AppType>("/api");

export async function listItems(q: string) {
  const response = await api.items.$get({ query: { q } });
  if (!response.ok) {
    throw new Error("Could not load items.");
  }
  return response.json();
}
export async function addItem(name: string) {
  const response = await api.items.$post({ json: { name } });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(
      "message" in body ? body.message : "Could not create item."
    );
  }
  return body;
}
