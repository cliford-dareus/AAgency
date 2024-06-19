import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./components/layouts/Root";
import Scheduler from "./views/scheduler";
import SingleView from "./views/singleView";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/landingPage";
import SchedulerLayout from "./components/layouts/scheduler-layout";
import Schedule from "./views/schedule";
import AdminRoutes from "./components/AdminRoutes";
import AdminLayout from "./components/layouts/admin-layout";
import Dashboard from "./views/dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Landing Page Routes */}
      <Route path="/" element={<Root />} errorElement={<div>error</div>}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* Protected Routes  */}
      <Route element={<ProtectedRoute />}>
        <Route element={<SchedulerLayout />}>
          <Route path="/schedule" element={<Schedule />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoutes />}>
        <Route element={<AdminLayout />}>
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/single" element={<SingleView />} />
        </Route>
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
