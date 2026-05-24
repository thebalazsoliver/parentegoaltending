export async function onRequest({ env }) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=3600",
  };

  const token = env.INSTAGRAM_ACCESS_TOKEN;
  const userId = env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return new Response(JSON.stringify({ posts: [] }), { status: 200, headers });
  }

  try {
    const url = new URL(`https://graph.instagram.com/${userId}/media`);
    url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
    url.searchParams.set("access_token", token);

    const response = await fetch(url.toString());
    if (!response.ok) {
      return new Response(JSON.stringify({ posts: [] }), { status: 200, headers });
    }

    const data = await response.json();
    const posts = (data.data || []).slice(0, 3).map((post) => ({
      id: post.id,
      title: "Instagram Post",
      caption: post.caption || "View the latest training update on Instagram.",
      permalink: post.permalink,
      media_url: post.media_url,
      thumbnail_url: post.thumbnail_url,
      media_type: post.media_type,
    }));

    return new Response(JSON.stringify({ posts }), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify({ posts: [] }), { status: 200, headers });
  }
}
