import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Sheet, SheetContent } from "../ui/sheet";

type Props = {
  createScheduleModalActive: boolean;
  setCreateScheduleModalActive: any;
};

const CreateScheduleModal = ({
  createScheduleModalActive,
  setCreateScheduleModalActive,
}: Props) => {
  return (
    <>
      {createScheduleModalActive && (
        <>
          <Sheet triggerFn={setCreateScheduleModalActive} />
          <SheetContent classnames="top-[50%] left-[50%] absolute -translate-x-[50%] -translate-y-[50%] rounded-lg bg-slate-100">
            <div className="">
              <label htmlFor="">Organization</label>
              <Input type="text" />

              <label htmlFor="">Supervisor</label>

              <Button>Create</Button>
            </div>
          </SheetContent>
        </> 
      )}
    </>
  );
};

export default CreateScheduleModal;
