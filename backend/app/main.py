from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, groups, funding, notifications, passport

app = FastAPI(title="PadiPay API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(groups.router, prefix="/groups", tags=["Groups"])
app.include_router(funding.router, prefix="/funding", tags=["Funding"])
app.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
app.include_router(passport.router, prefix="/passport", tags=["Passport"])

@app.get("/health")
def health():
    return {"status": "ok"}