import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

export default function FindLoader() {
  return (
    <motion.div
      exit={{ opacity: [0, 1, 0, 1, 0], transition: { duration: 0.3 } }}
      animate={{ opacity: [1, 0, 1, 0, 1], transition: { duration: 0.3 } }}
      className="loading-container"
    >
      <LoaderCircle className="loading-svg" />
      <LoaderCircle className="loading-svg" />
    </motion.div>
  );
}
