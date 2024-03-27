import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./components/layouts/Root";
import Scheduler from "./views/scheduler";
import WingView from "./views/unitView";
import SingleView from "./views/singleView";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/landingPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Landing Page Routes */}
      <Route path="/" element={<Root />} errorElement={<div>error</div>}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* Protected Routes  */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Scheduler />} />
        <Route path="/unit" element={<WingView />} />
        <Route path="/single" element={<SingleView />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
      </Route>

      <Route path="/login" element={<div>Login</div>} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
