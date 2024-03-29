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
import SchedulerLayout from "./components/layouts/scheduler-layout";
import Schedule from "./views/schedule";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Landing Page Routes */}
      <Route path="/" element={<Root />} errorElement={<div>error</div>}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* Protected Routes  */}
      <Route element={<ProtectedRoute />}>
        {/* Add a layout for the scheduler dashboard pages */}
        <Route element={<SchedulerLayout />}>
          <Route path="/schedule" element={<Schedule />} />
          {/* <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/unit" element={<WingView />} />
          <Route path="/single" element={<SingleView />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} /> */}
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
