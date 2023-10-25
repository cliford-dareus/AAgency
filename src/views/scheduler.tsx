import { months } from "../utils/common";
import { Outlet, useParams } from "react-router-dom";
import useGetCalenda from "../utils/hooks/useGetCalenda";
import { Search, ChevronLeft, ChevronRight, Settings } from "lucide-react";

import * as z from "zod";
import { UnitSchema } from "@/utils/schema";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/app/hooks";
import { addUnitFetch } from "@/features/units/unitSlice";
import NavHeader from "@/components/layouts/header";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UnitEditForm from "@/components/Forms/unitEditForm";

const Scheduler = () => {
  const params = useParams()
  const dispatch = useAppDispatch();
  const { currentDay, setCurrentDay, dayParam, currentScheduleDay } =
    useGetCalenda();

  const onSubmit = async (data: z.infer<typeof UnitSchema>) => {
    const scheduleDate = dayParam;
    const { lead, boardName } = data;

    try {
      await dispatch(
        addUnitFetch({ boardName, lead, scheduleDate, description: "schedule" })
      ).unwrap();

      // setRefresh(data);
    } catch (error) {
      console.log(error);
    }
  };

  // if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full h-full px-4">
      <div className="container mx-auto h-full">
        <div className="pt-4">
          <h1 className="text-[2rem] font-bold">Scheduler</h1>

          <div className="flex h-[35px] items-center mt-8">
            <div className="w-[350px] bg-slate-400 flex rounded-full h-full items-center px-4">
              <Search />
              <Input
                className="bg-transparent h-full flex-1 placeholder:text-white px-4 outline-none border-none"
                type="text"
                placeholder="search..."
              />
            </div>

            <div className="flex ml-8 bg-slate-400 rounded-full h-full items-center px-4 gap-4">
              <div
                className=""
                onClick={() =>
                  setCurrentDay(
                    new Date(
                      currentScheduleDay.year,
                      currentScheduleDay.month,
                      currentScheduleDay.number - 1
                    )
                  )
                }
              >
                <ChevronLeft />
              </div>

              <p>
                {currentScheduleDay.number} {months[currentDay.getMonth()]}{" "}
                {currentDay.getFullYear()}
              </p>

              <div
                className=""
                onClick={() =>
                  setCurrentDay(
                    new Date(
                      currentScheduleDay.year,
                      currentScheduleDay.month,
                      currentScheduleDay.number + 1
                    )
                  )
                }
              >
                <ChevronRight />
              </div>
            </div>

            <div className="bg-slate-400 flex rounded-full h-full items-center px-4 ml-auto">
              Profile
            </div>
          </div>

          {/* Board Header Nav */}
          <NavHeader onSubmit={onSubmit} dayParam={dayParam} />

          <div className="">
            <div className="my-4 flex justify-between">
              <h2 className="font-bold">SHIFT/POSITION</h2>
              <Popover>
                <PopoverTrigger>
                  <Settings />
                </PopoverTrigger>
                <PopoverContent align='end'>
                  <h2 className="font-bold">Edit {params.wingId}</h2>
                  <UnitEditForm scheduleDate={dayParam} unit={params.wingId!}/>
                </PopoverContent>
              </Popover>
            </div>
            <Outlet context={dayParam} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
