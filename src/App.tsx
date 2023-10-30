import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/layouts/Root";
import Scheduler from "./views/scheduler";
import WingView from "./views/unitView";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "scheduler",
          element: <Scheduler />,
          children: [
            {
              path: "",
              element: <h1>Home</h1>,
            },
            {
              path: ":wingId",
              element: <WingView />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
