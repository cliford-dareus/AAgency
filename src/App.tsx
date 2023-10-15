import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/layouts/Root";
import Scheduler from "./views/scheduler";
import { loader as wingLoader } from "./views/scheduler";
import WingView from "./views/wingView";
import { getWings } from "./utils/data";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Scheduler />,
          loader: wingLoader,
          children: [{
            path: "scheduler/:wingId",
            element: <WingView />,
            loader: async({params}) => {
              const wings = await getWings()
              console.log(params.wingId)
              return wings?.find(w => w.name === params.wingId)
            }
          }]
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
