import { useLoaderData } from "react-router-dom";

const WingView = () => {
  const wing = useLoaderData();

  return (
    <div>
      {wing.positions.map((position) => (
        <p>{position.position}</p>
      ))}
    </div>
  );
};

export default WingView;
