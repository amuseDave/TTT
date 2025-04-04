import { useDispatch, useSelector } from "react-redux";
import "./PrivateToggle.css";
import getWebSocket from "../../../../web-socket/ws";
import { useEffect, useRef } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { uiActions } from "../../../../store/uiSlicer";
import { playAudio } from "../../../../utils/utils";
import { audioRef } from "../../../AudioAndTitle/AudioAndTitle";
import { animate, AnimatePresence, motion } from "framer-motion";
export default function PrivateToggle() {
  const dispatch = useDispatch();

  const privacyContRef = useRef();

  const isPrivate = useSelector((state) => state.game.isPrivate);
  const isPrivacyLoading = useSelector((state) => state.ui.isPrivacyLoading);

  const isConnectedServer = useSelector((state) => state.ui.isConnectedServer);
  const player2 = useSelector((state) => state.game.player2);

  useEffect(() => {
    if (!player2 && isConnectedServer) {
      animate(privacyContRef.current, { opacity: [1, 0, 1, 0, 1] }, { duration: 0.3 });
      playAudio(audioRef);
      setTimeout(() => {
        playAudio(audioRef, 0.6);
      }, 150);
    }
  }, [isPrivacyLoading]);

  function togglePrivate() {
    if (isPrivacyLoading) return;

    dispatch(uiActions.isPrivacyLoading(true));
    // Test out UI delay
    setTimeout(() => {
      getWebSocket().send(JSON.stringify({ action: "toggle-privacy" }));
    }, 2000);
  }

  return (
    <>
      <AnimatePresence>
        {!player2 && isConnectedServer && (
          <motion.div
            exit={{ opacity: [1, 0, 1, 0, 1, 0], transition: { duration: 0.3 } }}
            ref={privacyContRef}
            onClick={togglePrivate}
            className={`private-toggle-container ${isPrivate ? "left" : "right"}`}
          >
            <div className="private-svg-placeholder">
              {isPrivacyLoading ? (
                <>
                  <LoaderCircle className="spinner" />
                  <LoaderCircle className="spinner" />
                </>
              ) : isPrivate ? (
                <>
                  <EyeOff />
                  <EyeOff />
                </>
              ) : (
                <>
                  <Eye />
                  <Eye />
                </>
              )}
            </div>

            <div className="box-toggler">
              <div className="toggler"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
