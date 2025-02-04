import { Muted, Small, Large } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerTrigger,
	DrawerClose,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUrlstore from "@/store/useUrlstore";
import { useAuth } from "@clerk/clerk-react";
import {
	ChartSplineIcon,
	Copy,
	Link2,
	Trash,
	ChevronFirst,
	ChevronLeft,
	ChevronRight,
	ChevronLast,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import formatDate from "../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Loading from "@/components/loading"

const limit = 10;

function DashBoard() {
	const { myUrls, getMyUrls, isGettingMyUrls, setUserid, addUrl, deleteUrl } =
		useUrlstore();
	const [page, setPage] = useState(1);
	const { isSignedIn, userId } = useAuth();
	const [url, setUrl] = useState("");
	const [isvalid, setIsvalid] = useState(true);
	const navigate = useNavigate();
	const origin = typeof window !== "undefined" ? window.location.origin : "";

	const isValidUrl = (url: string) => {
		const urlRegex =
			/^(https?|ftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}(\/[^\s]*)?$/;
		if (url === "" || urlRegex.test(url)) {
			setIsvalid(true);
		} else {
			setIsvalid(false);
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (url.trim() === "") {
			toast({
				title: "Error",
				description: "Please enter a url",
				variant: "destructive",
			});
		} else if (isvalid) {
			addUrl(url);
			setUrl("");
		}
	};

	const handleDelete = (short_url: string) => {
		deleteUrl(short_url);
		if (myUrls.urls.length === 1) {
			setPage(page - 1);
			getMyUrls(page);
		}
	};

	const handleCopyClick = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			toast({
				title: "Short Url copied to clipboard",
				description: text,
			});
		} catch (error) {
			toast({
				title: "Error copying text to clipbard",
				description: `${
					(error as Error).message
				}. Check if clipbard is disabled for this site`,
				variant: "destructive",
			});
		}
	};

	const renderPageButtons = () => {
		const buttons = [];
		for (let i = 1; i <= (myUrls?.totalPages ?? 1); i++) {
			buttons.push(
				<Button
					key={i}
					variant={myUrls?.currentPage == i ? "default" : "outline"}
					onClick={() => setPage(i)}
					className="mx-1"
				>
					{i}
				</Button>
			);
		}
		return buttons;
	};

	useEffect(() => {
		if (isSignedIn) {
			setUserid(userId);
			getMyUrls(page);
		}
	}, [getMyUrls, page, isSignedIn, userId, setUserid]);

	if (isGettingMyUrls) return <Loading />;
	return (
		<div className="flex flex-col items-center w-full gap-4 p-8">
			{/* url form */}
			<form className="w-full max-w-4xl" onSubmit={handleSubmit}>
				<Label htmlFor="url" className="text-lg">
					Enter a url to make it short
				</Label>
				<div
					className={`flex items-start justify-center gap-2 flex-1 flex-wrap sm:flex-nowrap sm:justify-between`}
				>
					<div className="grid w-full">
						<Input
							type="url"
							id="url"
							name="url"
							value={url}
							onChange={(e) => {
								setUrl(e.target.value);
								isValidUrl(e.target.value.trim());
							}}
							placeholder="eg. https://google.com"
							className="w-full"
						/>
						{!isvalid && (
							<p className="text-xs text-red-500">
								Please enter a valid url
							</p>
						)}
					</div>
					<Button type="submit" className="w-full sm:w-fit">
						Get Short Url
					</Button>
				</div>
			</form>
			{/* display urls */}
			<Large className="max-w-4xl mt-8">Your urls</Large>
			<div className="justify-start w-full max-w-4xl gap-4 p-2 rounded-lg shadow-2xl felx felx-col h-96">
				{myUrls.urls.length > 0 &&
					myUrls.urls.map((url, i) => (
						<div
							key={url?.short_url}
							className="flex flex-wrap items-center justify-between gap-2 p-2 border rounded sm:flex-nowrap"
						>
							<div className="flex flex-wrap items-center justify-start w-full gap-1 sm:w-2/3 sm:flex-nowrap sm:gap-2">
								<Small>{(page - 1) * limit + i + 1}.</Small>
								<a
									href={url?.original_url}
									target="_blank"
									rel="noreferrer"
									className="overflow-hidden w-fit sm:w-1/2 text-ellipsis whitespace-nowrap"
								>
									<Button
										variant="link"
										className="flex justify-start w-full p-0 overflow-hidden h-fit text-ellipsis whitespace-nowrap"
									>
										{origin}/{url?.short_url}
									</Button>
								</a>
								<Muted className="overflow-hidden w-fit sm:w-1/2 text-ellipsis whitespace-nowrap">
									( {url?.original_url} )
								</Muted>
							</div>
							<div className="flex items-center justify-end gap-2">
								<Muted>{formatDate(url?.createdAt).full}</Muted>
								<Button
									title="Copy short url"
									variant="ghost"
									className="p-0 px-1"
									onClick={() =>
										handleCopyClick(
											`${origin}/${url?.short_url}`
										)
									}
								>
									<Copy />
								</Button>
								<Button
									className="p-0 px-1"
									title="Get url analytics"
									variant="ghost"
									onClick={() =>
										navigate(
											`/page/analytics/${url?.short_url}`
										)
									}
								>
									<ChartSplineIcon className="p-0" />
								</Button>
								<Drawer>
									<DrawerTrigger asChild>
										<Button
											className="p-0 px-1"
											variant="ghost"
											title="Delete url"
										>
											<Trash
												size={20}
												color="hsl(0,50%,50%)"
											/>
										</Button>
									</DrawerTrigger>
									<DrawerContent>
										<DrawerHeader>
											<DrawerTitle>
												Are you absolutely sure to
												delete the url?
											</DrawerTitle>
											<DrawerDescription>
												<div className="flex items-center justify-center gap-2 my-2 sm:justify-start">
													<Small className="text-zinc-900 dark:text-zinc-50">
														{origin}/
														{url?.short_url}
													</Small>
													<Muted className="text-ellipsis">
														( {url?.original_url} )
													</Muted>
												</div>
												This action cannot be undone.
											</DrawerDescription>
										</DrawerHeader>
										<DrawerFooter className="sm:flex-row">
											<Button
												onClick={() =>
													handleDelete(url?.short_url)
												}
												disabled={isGettingMyUrls}
											>
												Submit
											</Button>
											<DrawerClose asChild>
												<Button variant="outline">
													Cancel
												</Button>
											</DrawerClose>
										</DrawerFooter>
									</DrawerContent>
								</Drawer>
							</div>
						</div>
					))}
				{(!myUrls || myUrls.urls.length < 1) && (
					<div className="flex flex-col items-center justify-center w-full h-96">
						<Link2 size={100} />
						<Muted className="text-xl text-center">
							You don't have any shortered urls
						</Muted>
					</div>
				)}
			</div>
			{/* pagination */}
			<div className="flex items-center justify-center mt-4 space-x-2">
				<Button
					onClick={() => setPage(1)}
					disabled={myUrls?.currentPage == 1}
					variant="outline"
				>
					<ChevronFirst />
				</Button>
				<Button
					onClick={() =>
						setPage(
							parseInt(myUrls?.currentPage?.toString() ?? "0") - 1
						)
					}
					disabled={myUrls?.currentPage == 1}
					variant="outline"
				>
					<ChevronLeft />
				</Button>
				{renderPageButtons()}
				<Button
					onClick={() =>
						setPage(
							parseInt(myUrls?.currentPage?.toString() ?? "0") + 1
						)
					}
					disabled={myUrls?.currentPage == (myUrls?.totalPages ?? 1)}
					variant="outline"
				>
					<ChevronRight />
				</Button>
				<Button
					onClick={() => setPage(myUrls?.totalPages ?? 1)}
					disabled={myUrls?.currentPage == (myUrls?.totalPages ?? 1)}
					variant="outline"
				>
					<ChevronLast />
				</Button>
			</div>
		</div>
	);
}

export default DashBoard;
