const truncate = require("truncate-html");

export default async ({ $agility }) => {
  let posts = [];
  const languageCode = $agility.languages[0];

  try {
    // raw posts
    const rawPosts = await $agility.client.getContentList({
      referenceName: "posts",
      languageCode,
    });

    // categories
    const categories = await $agility.client.getContentList({
      referenceName: "categories",
      languageCode,
    });

    posts = rawPosts.map((post) => {
      // get category id
      const categoryID = post.fields.category?.contentid;

      // find matching category
      post.linkedCategory = categories?.find((c) => c.contentID == categoryID);

      // format date
      post.formattedDate = new Date(post.fields.date).toLocaleDateString();
      return post;
    });
  } catch (error) {
    if (console) console.error("Could not load posts list.", error);
  }

  return posts;
};
