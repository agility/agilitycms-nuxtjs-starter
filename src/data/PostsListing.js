const truncate = require("truncate-html");

const truncateText = (text, length, clamp) => {
	clamp = clamp || "...";
	var node = document.createElement("div");
	node.innerHTML = text;
	var content = node.textContent;
	return content.length > length ? content.slice(0, length) + clamp : content;
}

export default async ({ $agility }) => {

	let posts = [];
	const languageCode = $agility.languages[0];
	console.log("FETCH POST LISTING")
	try {

		if (process.server) {
			const postsRet = await $agility.client.getContentList({
				referenceName: "posts",
				languageCode,
			});
			posts = postsRet.map((p) => {
				p.excerpt = truncate(p.fields.content, {
					length: 160,
					decodeEntities: true,
					stripTags: true,
					reserveLastWord: true,
				});
				return p;
			});

		} else {

			const postsResClient = await $agility.client.getContentList({
				referenceName: "posts",
				languageCode,
			});

			posts = postsResClient.items.map((p) => {
				p.excerpt = truncateText(p.fields.content, 160);
				return p;
			});

		}


	} catch (error) {
		if (console) console.error("Could not load posts list.", error);
	}

	return posts

}