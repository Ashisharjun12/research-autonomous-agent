import {Mastra} from "@mastra/core"
import { universalGateway } from "./gateway.js";
import { researchAgent } from "./agents/research-agent.js";
import { webSearchAgent } from "./agents/web-search-agent.js";
import { summarizerAgent } from "./agents/summarizer-agent.js";
import { reportWriterAgent } from "./agents/report-writter-agent.js";
import { aiStorage } from "./storage.js";
import { researchMemory } from "./memory.js";
import { agentObservability } from "./agent-observability.js";


const mastra = new Mastra({
    observability:agentObservability,
    gateways:{ universalGateway: universalGateway},
    storage: aiStorage,
    agents:{
        researchAgent,
        webSearchAgent,
        summarizerAgent,
        reportWriterAgent,
    },
    memory:{ 
        research:researchMemory
    }
    
});


export default mastra;