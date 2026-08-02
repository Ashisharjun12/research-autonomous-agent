import {config} from 'dotenv'
config();

const {PORT, 
    LLM_MODEL, 
    LLM_API_KEY, 
    LLM_BASE_URL,
    AI_DATABASE_URL,
    POSTGRES_DATABASE_URL,
   
} = process.env;

export const _config = {
PORT,
LLM_MODEL,
LLM_API_KEY,
LLM_BASE_URL,
AI_DATABASE_URL,
POSTGRES_DATABASE_URL,
}
