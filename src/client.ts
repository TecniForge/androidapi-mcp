import { ApiResponse } from "./types.js";

const BASE_URL = "https://androidapi.net/api";

function getSecret(): string {
  const secret = process.env.ANDROIDAPI_SECRET;
  if (!secret) throw new Error("ANDROIDAPI_SECRET environment variable is not set.");
  return secret;
}

export async function apiGet<T = unknown>(
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<ApiResponse<T>> {
  const url = new URL(BASE_URL + path);
  url.searchParams.set("secret", getSecret());
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && String(v) !== "")
      url.searchParams.set(k, String(v));
  }
  const res = await fetch(url.toString(), {
    headers: { "Accept": "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json() as Promise<ApiResponse<T>>;
}

export async function apiPostForm<T = unknown>(
  path: string,
  body: Record<string, string | number | undefined> = {}
): Promise<ApiResponse<T>> {
  const form = new FormData();
  form.append("secret", getSecret());
  for (const [k, v] of Object.entries(body)) {
    if (v !== undefined && v !== null && String(v) !== "")
      form.append(k, String(v));
  }
  const res = await fetch(BASE_URL + path, { method: "POST", body: form });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json() as Promise<ApiResponse<T>>;
}

export async function apiPostUrlEncoded<T = unknown>(
  path: string,
  body: Record<string, string | number | undefined> = {}
): Promise<ApiResponse<T>> {
  const params = new URLSearchParams();
  params.set("secret", getSecret());
  for (const [k, v] of Object.entries(body)) {
    if (v !== undefined && v !== null && String(v) !== "")
      params.set(k, String(v));
  }
  const res = await fetch(BASE_URL + path, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json() as Promise<ApiResponse<T>>;
}
