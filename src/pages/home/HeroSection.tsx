import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import macBook from "../../assets/images/macbook-exposed.png";

const HeroSection = () => {
  const intro = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.25,
        delayChildren: 1,
      },
    },
  };

  const introChildren = {
    hidden: { opacity: 0, y: -200 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: "spring",
        bounce: 0.5,
      },
    },
  };

  const laptop = {
    initial: { y: 0, rotate: 0, scale: 5 },
    animate: {
      rotate: -30,
      scale: 1,
      y: 20,
      transition: {
        duration: 1,
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <div className=" overflow-hidden">
      <Container className="h-screen pt-16 grid grid-cols-1 lg:grid-cols-2 place-content-center">
        <motion.div variants={intro} initial="hidden" animate="visible">
          <motion.h1
            className="text-5xl md:text-8xl font-bold text-nowrap"
            variants={introChildren}
          >
            <span className="text-gray">Don't worry,</span>
            <br />
            <span>We'll fix it.</span>
          </motion.h1>
          <motion.p
            className="text-dark-gray max-w-[50ch] mt-10 mb-5 text-lg"
            variants={introChildren}
          >
            Welcome to
            <span className=" text-primary-foreground font-semibold">
              iRepair
            </span>
            , your one stop place for all kinds of{" "}
            <span className=" text-primary-foreground font-semibold">
              MacBook repairs{" "}
            </span>
            and diagnostics
          </motion.p>
          <motion.div variants={introChildren}>
            <Button>Book a service</Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-10 w-3/4 lg:w-full mx-auto"
          variants={laptop}
          initial="initial"
          animate="animate"
        >
          <img className=" h-[95%] object-contain" src={macBook} />
        </motion.div>
      </Container>
    </div>
  );
};

export default HeroSection;
