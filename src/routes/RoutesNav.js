import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/start/LoginPage';
import Employees from '../pages/maintenance/admin/Employees';
import AdHome from '../pages/maintenance/admin/AdHome';
import { AuthProvider } from '../AuthContext';
// import PrivateRoutes from './PrivateRoutes';
const RoutesNav = () => {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					{/* <Route
						exact
						path={'/Home'}
						element={
							<PrivateRoutes>
								<Homepage />
							</PrivateRoutes>
						}
					/> */}
					<Route
						exact
						path={'/Login'}
						element={<LoginPage />}
					/>

					<Route
						path={'/Employees'}
						element={<Employees />}
					/>
					<Route
						exact
						path={'/AdHome'}
						element={<AdHome />}
					/>
				</Routes>
			</AuthProvider>
		</Router>
	);
};

export default RoutesNav;
