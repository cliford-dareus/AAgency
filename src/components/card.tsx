import { useAppSelector } from "@/app/hooks";
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

type Props = {
  content: Group;
};

const CardComponent = ({ content }: Props) => {
  const users = useAppSelector((state: RootState) => state.user);

  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle className="text-base self-center font-normal">
          {content.name} {content.time}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {content.employee?.map((employee) => (
          <p key={employee.id}>{employee.user.name}</p>
        ))}
      </CardContent>
      <CardFooter>
        <Popover>
          <PopoverTrigger className="w-full">
            <Button className="w-full">
              <Plus />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <h3 className="mb-1">Employees</h3>
            <hr />
            {users.user.map((user) => (
              <div className="h-[30px] bg-slate-400 mt-2 rounded-sm flex items-center px-4">
                <p className="w-full cursor-pointer select-none">{user.name}</p>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
