import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { fetchSchedules } from "../../features/scheduler/schedulerSlice";
import { Units } from "../type";

const useGetUnitName = (date: string) => {
  const [units, setUnits] = useState<Units[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [ refresh, setRefresh] = useState('');
  const dispatch = useAppDispatch();
  const schedule = useAppSelector(
    (state: RootState) => state.shedule.schedules
  );
  const status = useAppSelector((state) => state.shedule.isLoading);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchSchedules());
  }, [refresh, dispatch]);
  
  useEffect(() => {
    if (schedule.length !== 0) {
      const id = `sch_${date}`;
      const selectedSchedule = schedule.find((sched) => sched.id == id);
      setUnits(selectedSchedule?.units ? selectedSchedule.units : []);
      setLoading(false);
    }
  }, [schedule, date]);

  return { schedule, units, loading, status, setRefresh };
};

export default useGetUnitName;
