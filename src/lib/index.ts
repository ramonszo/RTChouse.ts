import { Shrughouse, ShrughouseData, ShrughouseEvents } from "../types";

import ShrughouseOptions from "./Options";

import User from "./User";
import Room from "./Room";
import Utils from "./Utils";

import Panel from "../components/Panel";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";
import Listener from "../components/Listener";
import RoomComponent from "../components/Room";
import RoomActions from "../components/RoomActions";
import RoomPreview from "../components/RoomPreview";
import Speaker from "../components/Speaker";

function Shrughouse(
  customOptions: Partial<typeof ShrughouseOptions> = {}
): Shrughouse {
  const options = { ...ShrughouseOptions, ...customOptions };

  const data: ShrughouseData = {
    user: {
      name: undefined,
      stream: undefined,
      streamType: undefined,
    },
    room: {
      name: undefined,
      members: [],
    },
    streams: [],
  };

  const events: ShrughouseEvents = {
    data: [],
    user: [],
    room: [],
    "room:member": [],
    media: [],
    error: [],
  };

  const utils = Utils({ options, data, events });
  const room = Room({ options, data, events });
  const user = User({ options, data, events });

  return {
    uid: utils.getUuid(),
    user: {
      set: user.set,
    },
    room: {
      set: room.set,
      start: room.start,
    },
    components: {
      Panel,
      Container,
      Footer,
      Form,
      Header,
      Listener,
      Room: RoomComponent,
      RoomActions,
      RoomPreview,
      Speaker,
    },
    events: events,
    on: utils.addEventListener,
  };
}

if (typeof window !== "undefined") {
  (window as any).Shrughouse = Shrughouse;
}

export default Shrughouse;

export {
  Shrughouse,
  Panel,
  Container,
  Footer,
  Form,
  Header,
  Listener,
  RoomComponent as Room,
  RoomActions,
  RoomPreview,
  Speaker,
};
