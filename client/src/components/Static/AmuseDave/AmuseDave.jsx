import { useEffect } from "react";
import "./AmuseDave.css";
import { motion, useAnimate } from "framer-motion";

export default function AmuseDave() {
  const [amuseDaveRef, animate] = useAnimate();
  useEffect(() => {
    const intervalID = setInterval(() => {
      animate(
        amuseDaveRef.current,
        { opacity: [0.3, 1, 0.3, 1, 0.3, 1, 0.3] },
        { duration: 0.4 }
      );
    }, 15000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);
  return (
    <motion.div whileHover={{ opacity: 1 }} ref={amuseDaveRef} className="amuseDave">
      <a href="https://youtube.com/@amusedave" target="_blank">
        made by amuseDave
      </a>
    </motion.div>
  );
}
