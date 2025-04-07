import "./Lines.css";
import { motion } from "framer-motion";

export default function Lines({ result }) {
  console.log(result);

  return (
    <>
      <div className="line hor-1"></div>
      <div className="line hor-2"></div>
      <div className="line ver-1"></div>
      <div className="line ver-2"></div>

      {result.pattern !== null ? (
        <motion.div
          className={`game-end-line type-${result.pattern} ${result.state}`}
          animate={{ opacity: [1, 0, 1, 0, 1, 0, 1], transition: { duration: 0.3 } }}
        ></motion.div>
      ) : null}
    </>
  );
}
