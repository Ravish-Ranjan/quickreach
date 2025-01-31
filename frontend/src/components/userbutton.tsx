import { UserButton, useUser } from "@clerk/clerk-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
	CreditCard,
	HeartHandshake,
	HelpCircle,
	LogOut,
	Settings,
	User,
} from "lucide-react";

function Userbutton() {
	const { user } = useUser();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<UserButton
					showName
					appearance={{
						elements: {
							avatarBox:
								"size-8 text-sm font-medium leading-none",
						},
					}}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					<div className="flex flex-col">
						<span>{user?.fullName || "User"}</span>
						<span className="text-xs text-muted-foreground">
							{user?.primaryEmailAddress?.emailAddress}
						</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<User className="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<CreditCard className="mr-2 h-4 w-4" />
					<span>Billing</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Settings className="mr-2 h-4 w-4" />
					<span>Settings</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<HeartHandshake className="mr-2 h-4 w-4" />
					<span>Invite Friends</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<HelpCircle className="mr-2 h-4 w-4" />
					<span>Help & Support</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default Userbutton;
