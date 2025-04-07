import { useSelector } from "react-redux";
import "./MenuDivider.css";
import { motion } from "framer-motion";

export default function MenuDivider() {
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  const isStartingSolo = useSelector((state) => state.ui.isStartingSolo);

  return (
    <motion.div
      className={`divider ${isConnectedServer || isStartingSolo ? "duo" : "solo"} ${
        isConnectedServer || isStartingSolo ? "extra-margin" : ""
      }`}
      layout
    ></motion.div>
  );
}
