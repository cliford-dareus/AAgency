import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { RootState } from "@/app/store";
import { Group, Shifts, Units } from "@/utils/type";
import { fetchShifts } from "@/features/shifts/shiftSlice";
import { useEffect } from "react";

type Props = {
  unit: Units[];
};

const ShiftCard = ({ unit }: Props) => {
  const dispatch = useAppDispatch();
  const shifts = useAppSelector((state: RootState) => state.shifts.shifts);

  const groupShift = (args: Shifts[]) => {
    return args?.reduce((acc, shift) => {
      if (acc[shift.name]) {
        acc[shift.name] = [...acc[shift.name], shift];
      } else {
        acc[shift?.name] = [shift];
      }
      return acc;
    }, {} as { [key: string]: Group[] });
  };

  const positions = Object.keys(groupShift(shifts))?.map((shift) => {
    const item = groupShift(shifts)[shift];
    const singleItem = {
      title: shift,
      content: item,
    };

    return singleItem;
  });

  useEffect(() => {
    dispatch(fetchShifts(unit[0].id));
  }, [unit[0].id]);

  return (
    <div className="">
      {positions.map((position) => (
        <div className="mb-4" key={position.title}>
          <p className="font-bold">{position.title}</p>

          <div className="flex gap-4">
            {position.content.map((content) => (
              <div
                className="w-[200px] bg-white px-4 py-2 rounded-sm mt-1"
                key={content.id}
              >
                <div>
                  <p className="text-center">
                    {content.name} {content.time}
                  </p>
                  {content.employee?.map((employee) => (
                    <p key={employee.id}>{employee.user.name}</p>
                  ))}
                </div>
                <Button>
                  <Plus />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShiftCard;
