import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Pencil, Plus } from "lucide-react";
import { fetchUnit } from "@/features/units/unitSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ShiftCard from "@/components/shiftCard";
import ShiftForm from "@/components/Forms/shiftForm";
import { ShiftSchema } from "@/utils/schema";
import { addShifts } from "@/features/shifts/shiftSlice";
import { z } from "zod";

const WingView = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const scheduleDate = useOutletContext();
  const units = useAppSelector((state: RootState) => state.unit.unit);

  const onSubmit = (data: z.infer<typeof ShiftSchema>) => {
    const unitId = units[0]?.id ?? "";
    const { name, time } = data;
    try {
      dispatch(
        addShifts({
          unitId,
          name,
          time,
          scheduleDate: scheduleDate as string,
          boardName: params.wingId!,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(units);

  useEffect(() => {
    if (params.wingId === undefined) return;
    dispatch(
      fetchUnit({ boardName: params.wingId, scheduleId: `sch_${scheduleDate}` })
    );
  }, [params, dispatch, scheduleDate]);

  return (
    <div className="bg-slate-400 rounded-md p-4">
      {units && units?.length === 0 ? (
        <div>
          <div>
            <Dialog>
              <DialogTrigger>
                <Button className="bg-blue-400 flex px-4 py-1">
                  <Plus />
                  <p>New shift</p>
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Shift/Position</DialogTitle>
                  <ShiftForm onSubmit={onSubmit} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="flex gap-4 items-center">
            <p>Lead Nurse : {units[0].lead}</p>
            <Pencil size={16}/>
          </div>

          <ShiftCard unit={units} />
          <Dialog>
            <DialogTrigger>
              <Button className="bg-blue-400 flex px-4 py-1">
                <Plus />
                <p>New shift</p>
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Shift/Position</DialogTitle>
                <ShiftForm onSubmit={onSubmit} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default WingView;
