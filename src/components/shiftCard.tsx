import { Group } from "@/utils/type";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

type Props = {
  unit: { [key: string]: Group };
};

const ShiftCard = ({ unit }: Props) => {
  const positions = Object.keys(unit)?.map((shift) => {
    const item = unit[shift];
    const singleItem = {
      title: shift,
      content: item,
    };

    return singleItem;
  });

  return (
    <div className="">
      {positions.map((position) => (
        <div className="mb-4" key={position.title}>
          <p className="font-bold">{position.title}</p>
          
          <div className="w-[200px] bg-white px-4 py-2 rounded-sm mt-1">
            <p className="text-center">
              {position.content.name} {position.content.time}
            </p>
            {position.content.employee?.map((employee) => (
              <p key={employee.id}>{employee.user.name}</p>
            ))}

            <Button>
              <Plus />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShiftCard;
