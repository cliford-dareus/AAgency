import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const ProductCard = ({
    product,
  }: {
    product: {
      title: string;
      link: string;
      thumbnail: string;
    };
  }) => {
    return (
      <motion.div
        whileHover={{
          y: -5,
        }}
        key={product.title}
        className="group/product h-96 w-[30rem] relative flex-shrink-0 rounded-lg overflow-hidden"
      >
        <Link to={product.link} className="block group-hover/product:shadow-2xl ">
          <img
            src={product.thumbnail}
            height="600"
            width="600"
            className="object-cover object-left-top absolute h-full w-full inset-0"
            alt={product.title}
          />
        </Link>
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-lg"></div>
        <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
          {product.title}
        </h2>
      </motion.div>
    );
  };