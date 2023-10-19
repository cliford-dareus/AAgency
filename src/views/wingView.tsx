import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWings } from "../utils/data";
import { Plus } from "lucide-react";

const WingView = () => {
  const params = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const data = async () => {
      const d = await getWings();
      const w = d?.find((w) => w.name === params.wingId);
      setData(w);
    };

    data();
  }, [params]);

  return (
    <div className="bg-slate-400 rounded-md p-4">
      {data?.positions?.map((position) => (
        // Position name
        <div className="w-full " key={position.id}>
          <p className="font-bold">{position.position}</p>
          {/* Employee list */}
          <div className="">
            {position.employee.map((g) => (
              <p className="" key={g.name}>{g.name}</p>
            ))}
            <button className="">
              <Plus />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WingView;
