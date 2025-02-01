import { Muted, Small } from "@/components/Typography";
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
import { toast } from "@/hooks/use-toast";
import useUrlstore from "@/store/useUrlstore";
import { useAuth } from "@clerk/clerk-react";
import { Link2, Trash } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const limit = 10;

function DashBoard() {
	const { myUrls, getMyUrls, isGettingMyUrls, setUserid, addUrl, deleteUrl } =
		useUrlstore();
	const [page] = useState(1);
	const { isSignedIn, userId } = useAuth();
	const [url, setUrl] = useState("");
	const [isvalid, setIsvalid] = useState(true);
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
	};

	useEffect(() => {
		if (isSignedIn) {
			setUserid(userId);
			getMyUrls(page);
		}
	}, [getMyUrls, page, isSignedIn, userId, setUserid]);

	if (isGettingMyUrls || !myUrls) return <div>Loading ... </div>;
	return (
		<div className="flex flex-col items-center w-full p-8">
			{/* url form */}
			<form className="w-full max-w-3xl" onSubmit={handleSubmit}>
				<Label htmlFor="url">Enter a url to make it short</Label>
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
			<div className="w-full max-w-3xl mt-8">
				{myUrls.urls.length > 0 &&
					myUrls.urls.map((url, i) => (
						<div
							key={url?.short_url}
							className="flex items-center justify-start gap-2"
						>
							<Small>{(page - 1) * limit + i + 1}.</Small>
							<a
								href={url?.original_url}
								target="_blank"
								rel="noreferrer"
							>
								<Button variant="link" className="p-0">
									{origin}/{url?.short_url}
								</Button>
							</a>
							<Muted className="text-ellipsis">
								( {url?.original_url} )
							</Muted>
							<Drawer>
								<DrawerTrigger>
									<Trash size={20} />
								</DrawerTrigger>
								<DrawerContent>
									<DrawerHeader>
										<DrawerTitle>
											Are you absolutely sure to delete
											the url?
										</DrawerTitle>
										<DrawerDescription>
											<div className="flex items-center justify-center gap-2 my-2 sm:justify-start">
												<Small className="text-zinc-50">
													{origin}/{url?.short_url}
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
		</div>
	);
}

export default DashBoard;
