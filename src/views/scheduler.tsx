import { Outlet, useParams } from "react-router-dom";
import { Settings } from "lucide-react";

import * as z from "zod";
import { UnitSchema } from "@/utils/schema";
import { useAppDispatch } from "@/app/hooks";
import { addUnitFetch } from "@/features/units/unitSlice";
import NavHeader from "@/components/layouts/header";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UnitEditForm from "@/components/Forms/unitEditForm";
import { useState } from "react";
import TopBar from "@/components/topbar/topBar";

const Scheduler = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [dayParam, setDayParam] = useState<string>("");

  const onSubmit = async (data: z.infer<typeof UnitSchema>) => {
    const scheduleDate = dayParam;
    const { lead, boardName } = data;

    try {
      await dispatch(
        addUnitFetch({ boardName, lead, scheduleDate, description: "schedule" })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full px-4">
      <div className="container mx-auto h-full">
        <div className="pt-4">
          <h1 className="text-[2rem] font-bold">Scheduler</h1>

          {/* Top Bar with search and profile */}
          <TopBar setDayParam={setDayParam} />

          {/* Board Header Nav */}
          <NavHeader onSubmit={onSubmit} dayParam={dayParam} />

          <div className="">
            <div className="my-4">
              <h2 className="font-bold">SHIFT/POSITION</h2>
              {/* <Popover>
                <PopoverTrigger>
                  <Settings />
                </PopoverTrigger>
                <PopoverContent align="end">
                  <h2 className="font-bold">Edit {params.wingId}</h2>
                  <UnitEditForm scheduleDate={dayParam} unit={params.wingId!} />
                </PopoverContent>
              </Popover> */}
            </div>
            <Outlet context={dayParam} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
