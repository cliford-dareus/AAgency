import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { useSearchParams } from "react-router-dom";

const SingleView = () => {
  const [searchParams] = useSearchParams();
  const units = useAppSelector((state: RootState) => state.unit)

  // const boardName = searchParams.get("boa") ?? "";
  // const scheduleDate = searchParams.get("sch") ?? "";



  return <div>SingleView</div>;
};

export default SingleView;
