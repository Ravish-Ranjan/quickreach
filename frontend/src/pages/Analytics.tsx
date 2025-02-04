import useUrlstore from "@/store/useUrlstore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { H2, Muted, Small, H3 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import formatDate from "@/utils/formatDate";
import Loading from "@/components/loading"


function Analytics() {
	const { short_url } = useParams();
	const { isGettingAnalytics, getAnalytics, analytics, userid } =
		useUrlstore();
	const origin = typeof window !== "undefined" ? window.location.origin : "";

	useEffect(() => {
		if (short_url && userid) {
			getAnalytics(short_url);
		}
	}, [short_url, userid, getAnalytics]);

	if (!short_url) return <PageNotFound />;
	if (isGettingAnalytics) return <Loading />;
	return (
		<div className="container flex flex-col items-start max-w-4xl gap-2 p-8">
			<H2>Analytics</H2>
			<div className="grid">
				<Small className="text-lg">
					Original Url :{" "}
					<Button variant="link" className="text-base">
						<a href={analytics?.original_url}>
							{analytics?.original_url}
						</a>
					</Button>
				</Small>
				<Muted className="flex items-start text-base">
					Shorterened Url :
					<div className="pl-4">
						{" "}
						{origin}/{analytics?.short_url}
					</div>
				</Muted>
			</div>
			<div className="flex items-center justify-between w-full gap-2 mt-8 mb-4">
				<H3>Clicks</H3>
				<Muted>total clicks : {analytics?.clicks.length}</Muted>
			</div>
			<div className="flex flex-col w-full gap-2 overflow-y-auto rounded h-96">
				{analytics && analytics.clicks.length > 0 ? (
					analytics?.clicks.map((val, i) => (
						<div
							key={i}
							className="flex items-center gap-2 p-2 border rounded-lg"
						>
							<Small>{i + 1}. </Small>
							<Small>By : {val.ipaddress}</Small>
							<Muted className="ml-auto mr-6">
								{formatDate(val.createdAt).full}
							</Muted>
						</div>
					))
				) : (
					<span>No clicks yet</span>
				)}
			</div>
		</div>
	);
}

export default Analytics;
