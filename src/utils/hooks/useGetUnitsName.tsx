import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { fetchSchedules } from "../../features/scheduler/schedulerSlice";
import { Units } from "../type";
import { useSearchParams } from "react-router-dom";

const useGetUnitName = (date: string) => {
  const [units, setUnits] = useState<Units[] | undefined>();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const schedule = useAppSelector(
    (state: RootState) => state.shedule.schedules
  );

  useEffect(() => {
    dispatch(fetchSchedules());
    if (schedule.length > 0) {
      const id = `sch_${date}`;
      const selectedSchedule = schedule.find((sched) => sched.id == id);
      setUnits(selectedSchedule?.units ? selectedSchedule.units : []);
    }
  }, [date]);

  return { schedule, units };
};

export default useGetUnitName;
