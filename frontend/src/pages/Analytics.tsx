import { useParams } from "react-router-dom";

function Analytics() {
	const { short_url } = useParams();
	
	return <div>Analytics</div>;
}

export default Analytics;
