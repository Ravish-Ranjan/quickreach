export default (mongoDateString: string) => {
	const date = new Date(mongoDateString);
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "short" });
	const year = date.getFullYear();
	let meredian = "AM";
	let hours = date.getHours();
	if (date.getHours() > 11) {
		meredian = "PM";
		hours -= 12;
	}
	const time = `${hours.toString().padStart(2, "0")}:${date
		.getMinutes()
		.toString()
		.padStart(2, "0")} ${meredian}`;
	const getOrdinalSuffix = (day: number) => {
		if (day > 3 && day < 21) return "th";
		switch (day % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	};
	return {
		full: `${time} ${day}${getOrdinalSuffix(day)} ${month}, ${year}`,
		time,
		date: `${day}${getOrdinalSuffix(day)} ${month}, ${year}`,
	};
};
