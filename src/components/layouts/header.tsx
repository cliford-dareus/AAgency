import { BookMarkedIcon, MoreHorizontal, Plus } from "lucide-react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
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
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { fetchBoard, updateBoard } from "@/features/board/boardSlice";
import { z } from "zod";
import { UnitSchema } from "@/utils/schema";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";

type Props = {
  onSubmit: (data: z.infer<typeof UnitSchema>) => void;
  dayParam: string;
};

const NavHeader = ({ onSubmit, dayParam }: Props) => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const board = useSelector((state: RootState) => state.board);
  const currentBoard = board.board.find((b) => b.name === param.wingId);

  const onSubmits = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateBoard({
        id: currentBoard?.id as string,
        newName: value,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchBoard());
  }, []);

  useEffect(() => {
    navigate(board && board.board?.length > 0 ? `${board.board[0]?.name}` : "");
  }, [board]);

  // console.log(board);
  // console.log(dayParam);

  return (
    <div>
      <div className="flex mt-4 border-b items-center h-[40px]">
        <ul className="flex h-full items-center">
          {board.board?.map((unit) => (
            <li key={unit.name} className=" h-full flex items-center">
              <NavLink
                className={({ isActive }) =>
                  [
                    isActive
                      ? "border-b-2 border-b-blue-500 h-full w-full px-4 flex items-center"
                      : "h-full px-4 flex items-center",
                  ].join(" ")
                }
                to={unit.name}
              >
                {unit.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* <Plus /> */}

        <div className="flex gap-8 items-center ml-auto">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal />
            </PopoverTrigger>
            <PopoverContent>
              <h2>Unit Options</h2>

              <div className="">
                <div className="flex gap-2 items-center mt-4">
                  <BookMarkedIcon />
                  <form onSubmit={onSubmits}>
                    <Input
                      className=""
                      defaultValue={currentBoard?.name}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </form>
                </div>
                <div className="flex">
                  Delete Unit
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Dialog>
            <DialogTrigger>
              <Button className="bg-blue-400 flex px-4">
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
