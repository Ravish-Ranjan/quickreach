import { model, Schema } from "mongoose";

const clickSchema = new Schema(
	{
		ipaddress: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true }
);

const urlSchema = new Schema(
	{
		original_url: {
			type: String,
			required: true,
		},
		short_url: {
			type: String,
			required: true,
		},
		owner: {
			type: String,
			required: true,
		},
		clicks: [clickSchema],
	},
	{ timestamps: true }
);

const Url = model("Url", urlSchema);
export default Url;
