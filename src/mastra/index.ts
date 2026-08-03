import {Mastra} from "@mastra/core"
import { universalGateway } from "./gateway.js";
import { taskAgent } from "./agents/task-agent.js";
import { aiStorage } from "./storage.js";


const mastra = new Mastra({
    gateways:{ universalGateway: universalGateway},
    storage: aiStorage,
    agents:{taskAgent}
    

});


export default mastra;