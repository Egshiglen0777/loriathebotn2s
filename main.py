from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Loria API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/api/chat")
async def chat(payload: dict):
    msg = (payload.get("message") or "").strip()
    if not msg:
        return {"reply": "Say something to Loria!"}
    return {"reply": f"Loria heard: {msg}"}
