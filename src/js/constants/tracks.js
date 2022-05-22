// Bass
import bassC1 from "../../assets/sounds/bass/bass_C_1.mp3";
import bassCm2 from "../../assets/sounds/bass/bass_Cm_2.mp3";
import bassC3 from "../../assets/sounds/bass/bass_c_3.mp3";
import bassC4 from "../../assets/sounds/bass/bass_c_4.mp3";
import bassCm5 from "../../assets/sounds/bass/bass_Cm_5.mp3";
// Guitar
import guitar from "../../assets/sounds/guitar/guitar_c_1.mp3";
// Piano
import piano from "../../assets/sounds/keys/piano_Cm_1.mp3";
// Saxophone
import sax from "../../assets/sounds/sax_Cm_1.mp3";
// Vocals
import vocalsGetBack from "../../assets/sounds/vocals/vocal-get-back.mp3";
import vocalsCmin from "../../assets/sounds/vocals/vocal-loop-first-Cmin.mp3";
import vocalsOutOfMyLane from "../../assets/sounds/vocals/vocal-loop-outofmylane-wet-Cmin.mp3";
import vocalsOwnIt from "../../assets/sounds/vocals/vocal-loop-ownit-wet-Cmin.mp3";
import vocalsUhC from "../../assets/sounds/vocals/vocal-loop-uh-C.mp3";
import vocalsPhrase from "../../assets/sounds/vocals/vocal-phrase-almost-Cmin.mp3";
// Hi Hats / Shaker
import shaker from "../../assets/sounds/hihat/shaker.mp3";
import hatShaker from "../../assets/sounds/hihat/hat_shaker_noisy.mp3";
import hatLive from "../../assets/sounds/hihat/hi_hat_live.mp3";
import hiHat from "../../assets/sounds/hihat/hi-hats.mp3";
import hiHatLive from "../../assets/sounds/hihat/hihat_live_kit.mp3";
// Snare
import clapSnare from "../../assets/sounds/snare/clap_snare.mp3";
import hermanSnare from "../../assets/sounds/snare/herman_snare.mp3";
import snareReverb from "../../assets/sounds/snare/snare_reverb.mp3";
import snareVerse from "../../assets/sounds/snare/snare_verse.mp3";
import snare from "../../assets/sounds/snare/snare.mp3";
// Kick
import kick from "../../assets/sounds/kick/kick_hard.mp3";

export const tracks = [
  {
    id: 1,
    title: "Kick",
    path: [kick],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 0.7,
    color: "#b82e1f",
  },
  {
    id: 2,
    title: "Snare",
    path: [clapSnare, hermanSnare, snareReverb, snareVerse, snare],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 0.7,
    color: "#ff8851",
  },
  {
    id: 3,
    title: "Hi Hat",
    path: [shaker, hatShaker, hatLive, hiHatLive, hiHat],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 0.7,
    color: "#ffc107",
  },
  {
    id: 4,
    title: "Bass",
    path: [bassC1, bassCm2, bassC4, bassCm5, bassC3],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 0.7,
    color: "#166d3b",
  },
  {
    id: 5,
    title: "Guitar",
    path: [guitar],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 0.7,
    color: "#04619f",
  },
  {
    id: 6,
    title: "Saxophone",
    path: [sax],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 0.7,
    color: "#923cb5",
  },
  {
    id: 7,
    title: "Piano",
    path: [piano],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 0.7,
    color: "#f25f85",
  },
  {
    id: 8,
    title: "Vocal",
    path: [
      vocalsOutOfMyLane,
      vocalsOwnIt,
      vocalsCmin,
      vocalsUhC,
      vocalsPhrase,
      vocalsGetBack,
    ],
    currPlay: 0,
    isActive: true,
    isMute: false,
    volume: 0.7,
    color: "#5fdff2",
  },
];
