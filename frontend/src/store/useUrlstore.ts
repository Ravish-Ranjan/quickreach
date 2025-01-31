import { create } from "zustand";
import axiosIns from "@/lib/axios";
import { isAxiosError } from "axios";
import { toast } from "@/hooks/use-toast";

interface urlstoreProps {
	myUrls: null;
	userid: null | undefined | string;
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
	myUrls: null,
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
			set({ myUrls: res.data });
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
			await axiosIns.post(
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
			await axiosIns.delete(`/url/delete/${short_url}`, {
				headers: {
					Authorization: `Bearer ${get().userid}`,
				},
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
