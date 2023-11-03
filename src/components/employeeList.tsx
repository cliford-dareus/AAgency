import { Employee } from "@/utils/type";
import { Button } from "./ui/button";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
// import { useAppDispatch } from "@/app/hooks";

type Props = {
  employee: Employee;
};

const EmployeeList = ({ employee }: Props) => {
  // const dispatch = useAppDispatch();
  const [hover, setHover] = useState(false);

  return (
    <div
      className="bg-slate-400 w-full rounded-sm px-4 py-1 flex justify-between cursor-pointer items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p key={employee.id}>{employee.user.name}</p>
      {hover && (
        <Button
          className="h-[20px] p-1 bg-slate-300 rounded-s"
          onClick={() => {}}
        >
          <MoreHorizontal />
        </Button>
      )}
    </div>
  );
};

export default EmployeeList;
