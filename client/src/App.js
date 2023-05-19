import './App.scss';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Main from './components/Main/Main';

const AppLayout = () => {
	return <Outlet />;
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <Main />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
