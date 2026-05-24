export default async function handler(req, res) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

  if (!token || !userId) {
    return res.status(200).json({ posts: [] });
  }

  try {
    const url = new URL(`https://graph.instagram.com/${userId}/media`);
    url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
    url.searchParams.set("access_token", token);

    const response = await fetch(url.toString());
    if (!response.ok) {
      return res.status(200).json({ posts: [] });
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

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(200).json({ posts: [] });
  }
}
