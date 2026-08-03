import {config} from 'dotenv'
config();

const {PORT, 
    LLM_MODEL, 
    LLM_API_KEY, 
    LLM_BASE_URL,
    AI_DATABASE_URL,
    POSTGRES_DATABASE_URL,
    LANGSMITH_API_KEY,
   
} = process.env;

export const _config = {
PORT,
LLM_MODEL,
LLM_API_KEY,
LLM_BASE_URL,
AI_DATABASE_URL,
POSTGRES_DATABASE_URL,
LANGSMITH_API_KEY,
}
