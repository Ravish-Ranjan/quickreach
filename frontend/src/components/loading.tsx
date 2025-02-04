import { Muted } from "./Typography";

function loading() {
	return <div className="max-w-4xl h-96 grid justify-center items-center">
		<Muted className="text-3xl">Loading...</Muted>
	</div>;
}

export default loading;
