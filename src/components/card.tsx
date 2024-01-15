import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Plus } from "lucide-react";
import { RootState } from "@/app/store";
import { Button } from "./ui/button";
import { Group } from "@/utils/type";
import EmployeeList from "./employeeList";
import { addEmployeeToShift } from "@/features/employee/employeeSlice";

type Props = {
  content: Group;
  scheduleDate: string;
};

const CardComponent = ({ content, scheduleDate }: Props) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.user);
  // console.log(scheduleDate);

  return (
    <Card className="w-[250px] rounded-sm">
      <CardHeader>
        <CardTitle className="text-base self-center font-normal">
          {content.name} {content.time}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {content.employee?.map((employee) => (
          <EmployeeList
            key={employee.id}
            employee={employee}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Popover>
          <PopoverTrigger className="w-full">
            <Button className="w-full bg-transparent text-black hover:bg-slate-400">
              <Plus />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <h3 className="mb-1">Employees</h3>
            <hr />
            {users.user.length !== 0 ? (
              users.user.map((user) => (
                <div
                  className="h-[30px] bg-slate-400 mt-2 rounded-sm flex items-center px-4"
                  onClick={() => {
                    dispatch(
                      addEmployeeToShift({
                        userId: user.id,
                        shiftId: content.id,
                        scheduleId: `sch_${scheduleDate}`
                      })
                    );
                  }}
                >
                  <p className="w-full cursor-pointer select-none">
                    {user.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="select-none"> No Employee Available.</p>
            )}
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
