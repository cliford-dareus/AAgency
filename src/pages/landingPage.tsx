import { ContainerScroll } from "@/components/ui/scroll-container";
import LandingImage from "@/assets/706shots_so.png";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/productcard";

export const products = [
  {
    title: "Vacation Planning",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Nursing Home Management",
    link: "https://cursor.so",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Office Management",
    link: "https://userogue.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },

  {
    title: "Classroom Management",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

type Props = {};

const LandingPage = (props: Props) => {
  const direction = "left";
  const pauseOnHover = true;
  const speed: string = "slow";
  const [start, setStart] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const firstRow = products.slice(0, 5);

  useEffect(() => {
    addAnimation();
  }, []);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <>
      <section className="h-screen container mx-auto">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-3xl font-semibold text-black dark:text-white">
                Welcome To 706shots
              </h1>
              <p className="text-4xl md:text-[6rem] font-bold mt-1 leading-[0.9]">
                The place where you can view all your shots
              </p>
            </>
          }
        >
          <img
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            src={LandingImage}
            alt="Landing Page"
            width={1400}
            height={720}
          />
        </ContainerScroll>
      </section>

      <section className=" mx-auto mt-64 py-10">
        <div className="container mx-auto flex gap-4 justify-between">
          <div className="w-[30%]">
            <h2 className="text-3xl font-semibold text-black dark:text-white">
              Features to solve your problem management issues
            </h2>
            <p className="text-black dark:text-white mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
              rerum iure doloribus molestias delectus adipisci.
            </p>
          </div>
          <div className="w-[30%]">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
              non.
            </p>
          </div>
        </div>

        <div className="h-[500px] mt-8 flex items-center justify-center">
          <motion.div
            ref={containerRef}
            className={cn(
              "scroller relative z-20  overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
            )}
          >
            <div
              ref={scrollerRef}
              className={cn(
                " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                start && "animate-scroll ",
                pauseOnHover && "hover:[animation-play-state:paused]"
              )}
            >
              {firstRow.map((product) => (
                <ProductCard product={product} key={product.title} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto mt-8 py-10">
        <div className="w-[50%] mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-black dark:text-white">
            Easy Employee Management, Built to save you time
          </h2>
          <p className="text-black dark:text-white mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
            rerum iure doloribus molestias delectus adipisci.
          </p>
        </div>
        <div className="h-[800px]"></div>
      </section>
    </>
  );
};

export default LandingPage;
