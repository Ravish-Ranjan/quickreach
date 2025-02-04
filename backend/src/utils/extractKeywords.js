import extractor from "keyword-extractor";

function formatUrl(url) {
	return url.replace(/(^\w+:|^)\/\//, "").split(/\.|\//);
}

export default function extract(url, limit = 2) {
	const formattedUrl = formatUrl(url);
	const keywords = extractor.extract(formattedUrl.join(" "), {
		language: "en",
		remove_digits: false,
	});
	if (limit > formattedUrl.length) {
		limit = Math.floor(formattedUrl.length / 2);
		if (limit < 1) limit = 1;	
	}
	return keywords.slice(0, limit);
}
