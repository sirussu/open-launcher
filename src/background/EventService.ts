import EventBus from "@/services/EventBus";
import MainIpc from "@/events/ipcs/MainIpc";

export default new EventBus(new MainIpc())
