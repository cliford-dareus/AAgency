import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWings } from "../utils/data";

const WingView = () => {
  const [ data, setData] = useState({})
  const params = useParams()

  useEffect(() => {
    const data = async () => {
      const d = await getWings()
      const w = d?.find(w => w.name === params.wingId)
      setData(w)
    }

    data();
  }, [params])

  return (
    <div className="">
      {data?.positions?.map((position) => (
        <p key={position.id}>{position.position}</p>
      ))}
    </div>
  );
};

export default WingView;
