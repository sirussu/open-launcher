import EventBus from '@/services/EventBus'
import RenderedIpc from "@/events/ipcs/RenderedIpc";

export default new EventBus(new RenderedIpc())
