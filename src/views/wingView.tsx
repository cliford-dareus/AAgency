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

  function onSubmit() {}

  useEffect(() => {
    if (params.wingId === undefined) return;
    dispatch(fetchUnit(params.wingId!));
  }, [params]);


  return (
    <div className="bg-slate-400 rounded-md p-4">
      {units.shifts ? (
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
                  <UnitForm onSubmit={onSubmit} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div>
          {units?.shifts?.map((position) => (
            <div className="w-full " key={position.id}>
              <p className="font-bold">{position.position}</p>

              <div className="">
                {position?.employee.map((g) => (
                  <p className="" key={g.name}>
                    {g.name}
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
