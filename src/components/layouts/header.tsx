import { Plus } from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UnitForm from "../Forms/unitForm";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { fetchBoard } from "@/features/board/boardSlice";
import { z } from "zod";
import { UnitSchema } from "@/utils/schema";
import { DialogDescription } from "@radix-ui/react-dialog";

type Props = {
  onSubmit: (data: z.infer<typeof UnitSchema>) => void;
  dayParam: string
};

const NavHeader = ({ onSubmit, dayParam }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const board = useSelector((state: RootState) => state.board);

  useEffect(() => {
    dispatch(fetchBoard());
  }, []);

  useEffect(() => {
    navigate(board && board.board?.length > 0 ? `${board.board[0]?.name}` : "");
  }, [board]);

  // console.log(board)
  // console.log(dayParam)

  return (
    <div>
      <div className="flex mt-4 border-b items-center pb-4">
        <ul className="flex">
          {board.board?.map((unit) => (
            <li
              key={unit.name}
              className="px-8 border-r border-slate-500 font-semibold"
            >
              <Link to={unit.name}>{unit.name}</Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-2 px-4 items-center">
          <Dialog>
            <DialogTrigger>
              <Button className="bg-blue-400 flex px-4 py-1">
                <Plus />
                <p>New Unit</p>
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Unit/Wing</DialogTitle>
                <DialogDescription>
                  Create a new unit for {dayParam}
                </DialogDescription>
                <UnitForm onSubmit={onSubmit} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
