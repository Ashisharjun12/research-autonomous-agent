import { _config } from "@/config/config.js";
import * as mainSchema from "@/modules/auth/auth.schema.js";
import { PostgresPoolSingleton } from "./provider/postgres-pool.singleton.js";
import { PostgresSingleton } from "./provider/postgres.singleton.js";

function requireUrl(url: string | undefined, name: string): string {
    if (!url) {
        throw new Error(`${name} is missing from environment — check your .env file`);
    }
    return url;
}

class DbFactory {
    static getMainDatabase() {
        return PostgresSingleton.getInstance(
            requireUrl(_config.POSTGRES_DATABASE_URL, "POSTGRES_DATABASE_URL"),
            mainSchema,
        );
    }

    static getAIDatabase() {
        return PostgresPoolSingleton.getInstance(
            requireUrl(_config.AI_DATABASE_URL, "AI_DATABASE_URL"),
        );
    }

    static async connectAppDatabase(): Promise<void> {
        await DbFactory.getMainDatabase().connect();
    }

    static async connectAI(): Promise<void> {
        await DbFactory.getAIDatabase().connect();
    }
}

export default DbFactory;
