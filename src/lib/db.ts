import { createClient } from '@libsql/client'
import { existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'

const DB_PATH = process.env.DATABASE_URL || 'file:./data/feedback.db'

// Ensure data directory exists
try {
  const url = new URL(DB_PATH)
  if (url.protocol === 'file:') {
    const filePath = url.pathname.replace(/^\//, '')
    mkdirSync(dirname(filePath), { recursive: true })
  }
} catch {}

// Singleton client
let _client: ReturnType<typeof createClient> | null = null

export function getDb() {
  if (!_client) {
    _client = createClient({ url: DB_PATH })
    // Init table inline
    _client.execute(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        score INTEGER NOT NULL CHECK(score >= 0 AND score <= 10),
        comment TEXT,
        source TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
  }
  return _client
}
