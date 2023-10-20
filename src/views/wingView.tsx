import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";
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
import UnitForm from "@/components/Forms/unitForm";

const WingView = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const units = useAppSelector((state: RootState) => state.unit.unit);

  // console.log(units);

  

  useEffect(() => {
    if (params.wingId === undefined) return;
    dispatch(fetchUnit(params.wingId!));
  }, [params]);

  return (
    <div className="bg-slate-400 rounded-md p-4">
      {units?.shifts.length === 0 ? (
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
                  <UnitForm />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div>
          {units.shifts &&
            units?.shifts.map((shift) => (
              <div className="w-full " key={shift.id}>
                <p className="font-bold">
                  {shift.name} {shift.time}
                </p>

                <div className="">
                  {shift.employees &&
                    shift?.employees.map((employee) => (
                      <p className="" key={employee.name}>
                        {employee.name}
                      </p>
                    ))}

                  <button className="">
                    <Plus />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default WingView;
