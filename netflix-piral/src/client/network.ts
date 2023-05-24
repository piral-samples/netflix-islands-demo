export async function updateStore(store: string, item: any) {
  await fetch("/", {
    method: "PATCH",
    body: JSON.stringify({
      store,
      item,
    }),
  });
}

export async function renderFragment(name: string, params: any) {
  const query = Object.entries(params)
    .map(
      ([name, value]) =>
        `${encodeURIComponent(name)}=${encodeURIComponent(value as string)}`
    )
    .join("&");

  const suffix = query ? `?${query}` : "";
  const path = btoa(name);

  const res = await fetch(`/fragment/${path}${suffix}`, {
    method: "GET",
  });

  return res.text();
}
