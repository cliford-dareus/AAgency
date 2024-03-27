import { ContainerScroll } from "@/components/ui/scroll-container";
import LandingImage from "@/assets/706shots_so.png";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      <section className="h-screen container mx-auto">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Welcome To 706shots
              </h1>
              <p className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                The place where you can view all your shots
              </p>
            </>
          }
        >
          <img src={LandingImage} alt="Landing Page" />
        </ContainerScroll>
      </section>

      <section className="h-screen container mx-auto mt-4">
        
      </section>

      <section className="h-screen container mx-auto mt-4"></section>

    </div>
  );
};

export default LandingPage;
