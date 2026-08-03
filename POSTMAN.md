# Postman API Tests

Base URL: `http://localhost:3000` (or your `PORT` from `.env`).

## Prerequisites

1. `npm run dev`
2. `.env` has: `POSTGRES_DATABASE_URL`, `AI_DATABASE_URL`, `LLM_*`, `TRAVILY_WEB_SEARCH_API_KEY`, `SCRAPER_API_KEY`

---

## Test 1 — Health

| Method | URL |
|--------|-----|
| GET | `/health` |

---

## Test 2 — Tavily (web-search agent)

| Method | URL |
|--------|-----|
| POST | `/api/agents/web-search-agent/generate` |

**Headers:** `Content-Type: application/json`

**Body:**

```json
{
  "messages": "Find 5 recent articles about solar energy in India"
}
```

---

## Test 3 — Scrape.do (document-reader agent)

| Method | URL |
|--------|-----|
| POST | `/api/agents/document-reader-agent/generate` |

**Body:**

```json
{
  "messages": "Fetch the main content from https://example.com and summarize it in 3 bullet points"
}
```

---

## Test 4 — Full supervisor pipeline

| Method | URL |
|--------|-----|
| POST | `/api/agents/research-orchestrator/generate` |

**Body:**

```json
{
  "messages": "Research AI in education: search for sources, fetch one key URL, summarize, and write a short report.",
  "memory": {
    "thread": "job-postman-001",
    "resource": "user-test-1"
  },
  "maxSteps": 20
}
```

---

## Test 5 — Guardrails (PII redaction)

| Method | URL |
|--------|-----|
| POST | `/api/agents/research-orchestrator/generate` |

**Body:**

```json
{
  "messages": "My email is test@example.com — research renewable energy trends"
}
```

---

## Test 6 — Stream (optional)

| Method | URL |
|--------|-----|
| POST | `/api/agents/research-orchestrator/stream` |

Use the same body as Test 4.

---

## Debug routes

| Method | URL |
|--------|-----|
| GET | `/api/agents` |
| GET | `/openapi.json` |

---

## LangSmith

After Test 2–4, open [smith.langchain.com](https://smith.langchain.com) → project `research-agent` → Traces. Look for `tavily-search` and `fetch-url` tool spans.
