import { playAudio } from "../../utils/utils";

export default function startLobby({ data, store, gameActions, audioRef }) {
  store.dispatch(gameActions.initiateLobbyClient(data));
  playAudio(audioRef);
}
