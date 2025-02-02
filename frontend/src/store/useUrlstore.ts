import { create } from "zustand";
import axiosIns from "@/lib/axios";
import { isAxiosError } from "axios";
import { toast } from "@/hooks/use-toast";

interface clicksProps {
	ipaddress: string;
	createdAt: string;
}

interface urlProps {
	_id: string;
	original_url: string;
	short_url: string;
	createdAt: string;
	updatedAt: string;
	clicks: clicksProps[];
	owner: string;
}

interface myUrlsProps {
	currentPage: number;
	totalPages: number;
	totalCount: number;
	urls: urlProps[];
}

interface analyticsProps {
	original_url: string;
	short_url: string;
	clicks: clicksProps[];
}

interface urlstoreProps {
	myUrls: myUrlsProps;
	userid: null | undefined | string;
	analytics: analyticsProps | null;
	isGettingMyUrls: boolean;
	isGettingAnalytics: boolean;
	isAddingUrl: boolean;
	isDeletingUrl: boolean;
	getMyUrls: (page?: number) => Promise<void>;
	getAnalytics: (page: string) => Promise<void>;
	setUserid: (userid: string | null | undefined) => void;
	addUrl: (original_url: string) => void;
	deleteUrl: (short_url: string) => void;
}

export default create<urlstoreProps>((set, get) => ({
	myUrls: { currentPage: 0, totalPages: 0, totalCount: 0, urls: [] },
	userid: null,
	analytics: null,
	isGettingMyUrls: false,
	isGettingAnalytics: false,
	isAddingUrl: false,
	isDeletingUrl: false,
	getMyUrls: async (page?: number) => {
		if (!page) page = 1;
		try {
			set({ isGettingMyUrls: true });
			const res = await axiosIns.get(`/url/myurls/${page}`, {
				headers: {
					Authorization: `Bearer ${get().userid}`,
				},
			});
			set({ myUrls: res.data });
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(
					"Error getting my urls :",
					error.response?.data?.message
				);
				toast({
					title: "Error getting my urls",
					description: error.response?.data?.message,
					variant: "destructive",
				});
			} else {
				console.log(error);
			}
		} finally {
			set({ isGettingMyUrls: false });
		}
	},
	getAnalytics: async (short_url: string) => {
		if (!get().userid) return;
		try {
			set({ isGettingAnalytics: true });
			const res = await axiosIns.get(`/url/analytics/${short_url}`, {
				headers: {
					Authorization: `Bearer ${get().userid}`,
				},
			});
			set({ analytics: res.data });
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(
					"Error getting url analytics :",
					error.response?.data?.message
				);
				toast({
					title: "Error getting url analytics",
					description: error.response?.data?.message,
					variant: "destructive",
				});
			} else {
				console.log(error);
			}
		} finally {
			set({ isGettingAnalytics: false });
		}
	},
	addUrl: async (original_url: string) => {
		try {
			set({ isAddingUrl: true });
			const res = await axiosIns.post(
				"/url/new",
				{
					original_url,
				},
				{
					headers: {
						Authorization: `Bearer ${get().userid}`,
					},
				}
			);
			const prev = get().myUrls;
			const newD = {
				...prev,
				urls: [
					{
						_id: res.data._id,
						original_url: res.data.original_url,
						short_url: res.data.short_url,
						createdAt: res.data.createdAt,
						updatedAt: res.data.updatedAt,
						clicks: res.data.clicks,
						owner: res.data.owner,
					},
					...(prev?.urls || []),
				],
				totalCount: prev?.totalCount ? prev.totalCount + 1 : 1,
				totalPages: Math.ceil((prev?.totalCount + 1 || 0) / 10),
			};
			set({ myUrls: newD });
			toast({
				title: "Url created",
				description: res.data.message,
				variant: "default",
			});
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(
					"Error creating new url :",
					error.response?.data?.message
				);
				toast({
					title: "Error creating new url",
					description: error.response?.data?.message,
					variant: "destructive",
				});
			} else {
				console.log(error);
			}
		} finally {
			set({ isAddingUrl: false });
		}
	},
	deleteUrl: async (short_url: string) => {
		try {
			set({ isDeletingUrl: true });
			const res = await axiosIns.delete(`/url/delete/${short_url}`, {
				headers: {
					Authorization: `Bearer ${get().userid}`,
				},
			});
			const prev = get().myUrls;
			const newD = {
				...prev,
				urls: prev?.urls.filter((url) => url.short_url !== short_url),
				totalCount: prev?.totalCount ? prev.totalCount - 1 : 0,
				totalPages: Math.ceil((prev?.totalCount - 1 || 0) / 10),
			};
			set({ myUrls: newD });
			toast({
				title: "Url deleted successfully",
				description: res.data.message,
			});
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(
					"Error deleting url :",
					error.response?.data?.message
				);
				toast({
					title: "Error deleting url",
					description: error.response?.data?.message,
					variant: "destructive",
				});
			} else {
				console.log(error);
			}
		} finally {
			set({ isDeletingUrl: false });
		}
	},
	setUserid: (userid: string | null | undefined) => {
		if (userid) set({ userid: userid });
		else set({ userid: null });
	},
}));
