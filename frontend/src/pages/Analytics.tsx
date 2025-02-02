import useUrlstore from "@/store/useUrlstore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Analytics() {
	const { short_url } = useParams();
	const { isGettingAnalytics, getAnalytics, analytics } = useUrlstore();

	useEffect(() => {
		if (short_url) {
			getAnalytics(short_url);
		}
		console.log("short_url", short_url);
	}, [getAnalytics, short_url]);

	if (!short_url) return <div>Invalid URL</div>;
	if (isGettingAnalytics) return <div>Loading...</div>;
	return <div>{JSON.stringify(analytics)}</div>;
}

export default Analytics;
