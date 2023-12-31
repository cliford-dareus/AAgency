import { FormEvent, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Pencil, Plus } from "lucide-react";
import { fetchUnit, updateUnitFetch } from "@/features/units/unitSlice";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const WingView = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const scheduleDate = useOutletContext();
  const units = useAppSelector((state: RootState) => state.unit.unit);
  const [value, setValue] = useState("");

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

  const onSubmits = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUnitFetch({
        boardname: params.wingId as string,
        sch_id: scheduleDate as string,
        newLead: value,
      })
    );
  };

  // console.log(units);

  useEffect(() => {
    if (params.wingId === undefined) return;
    const promise = dispatch(
      fetchUnit({ boardName: params.wingId, scheduleId: `sch_${scheduleDate}` })
    );
    return () => {
      promise.abort();
    };
  }, [params, dispatch, scheduleDate]);

  return (
    <ScrollArea className="h-[calc(100vh-299px)] bg-slate-400 rounded-md p-4 ">
      {units && units?.length === 0 ? (
        <div className="">
          <Dialog>
            <DialogTrigger>
              <Button className="bg-blue-400 flex px-4">
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
      ) : (
        <div className="">
          <div className="flex gap-4 items-center">
            <p className="font-bold">
              Lead Nurse :{" "}
              <span className="font-normal ml-2">{units && units[0].lead}</span>{" "}
            </p>

            <Popover>
              <PopoverTrigger>
                <Pencil size={16} />
              </PopoverTrigger>
              <PopoverContent>
                <h3>Change the lead name</h3>
                <div>
                  <form onSubmit={onSubmits}>
                    <Input
                      defaultValue={units[0].lead}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </form>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <ShiftCard
            unit={units}
            scheduleDate={scheduleDate as string}
            boardName={params.wingId as string}
          />

          <Dialog>
            <DialogTrigger>
              <Button className="bg-blue-400 flex px-4">
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
      <ScrollBar className="" />
    </ScrollArea>
  );
};

export default WingView;
