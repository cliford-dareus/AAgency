import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWings } from "../utils/data";

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
    <div className="">
      {data?.positions?.map((position) => (
        <div className="" key={position.id}>
          <p className="font-bold">{position.position}</p>
          <div>
            {position.employee.map((g) => (
              <p key={g.name}>{g.name}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WingView;
