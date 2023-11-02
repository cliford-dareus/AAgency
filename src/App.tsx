import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/layouts/Root";
import Scheduler from "./views/scheduler";
import WingView from "./views/unitView";
import SingleView from "./views/singleView";

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
        {
          path: ':wingId',
          element: <SingleView />
        }
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
