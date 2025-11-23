import { Routes, Route } from "react-router-dom";
import NewTask from "./pages/NewTask";
import Home from "./pages/Home";
import Header from "./components/Header";

export default function App () {
	return (
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/new" element={<NewTask/>}/>
		</Routes>
	);
};
