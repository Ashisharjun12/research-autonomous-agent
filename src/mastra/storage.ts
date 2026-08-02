import { PostgresStore } from '@mastra/pg'
import { _config } from '../config/config.js'

export class AIDatabaseClient {
  private static connected = false
  public static storage = new PostgresStore({
    id: 'ai-database-storage',
    connectionString: _config.AI_DATABASE_URL,
    schemaName: 'mastra',
  })

  static async connect(): Promise<void> {
    if (AIDatabaseClient.connected) return
    try {
      await AIDatabaseClient.storage.init()
      AIDatabaseClient.connected = true
      console.log('Successfully connected to the AI (Mastra) database')
    } catch (error) {
      console.error(error, 'AI Database connection failed')
      process.exit(1)
    }
  }

  static getStorage() {
    if (!AIDatabaseClient.connected) {
      throw new Error('AI database not connected')
    }
    return AIDatabaseClient.storage
  }
}

export const aiStorage = AIDatabaseClient.storage