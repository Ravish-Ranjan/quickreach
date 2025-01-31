import { connect } from "mongoose";

export default async (database_url) => {
	try {
		const conn = await connect(database_url);
		console.log(`Connected to database : ${conn.connection.host}`);
	} catch (error) {
		console.error("Error connecting to Database : ", error.message);
	}
};
