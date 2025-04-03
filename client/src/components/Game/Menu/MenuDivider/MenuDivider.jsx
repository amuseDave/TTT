import { useSelector } from "react-redux";
import "./MenuDivider.css";
import { motion } from "framer-motion";

export default function MenuDivider() {
  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);

  return (
    <motion.div layout className="menu-divider">
      <div className={`divider ${isConnectedServer ? "duo" : "solo"}`}></div>
      <div className={`divider ${isConnectedServer ? "duo" : "solo"}`}></div>
    </motion.div>
  );
}
