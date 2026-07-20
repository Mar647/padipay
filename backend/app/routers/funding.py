from fastapi import APIRouter, HTTPException
from app.services.monnify import create_reserved_account

router = APIRouter()

# In-memory store
virtual_accounts_db = {}

@router.post("/create-account/{group_id}")
async def create_virtual_account(group_id: str, group_name: str, email: str):
    try:
        account = await create_reserved_account(group_id, group_name, email)
        virtual_accounts_db[group_id] = account
        return account
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Monnify error: {str(e)}")

@router.get("/virtual-account/{group_id}")
async def get_virtual_account(group_id: str):
    account = virtual_accounts_db.get(group_id)
    if not account:
        raise HTTPException(status_code=404, detail="No virtual account found for this group")
    return account

@router.post("/webhook/monnify")
async def monnify_webhook(payload: dict):
    event_type = payload.get("eventType")
    if event_type == "SUCCESSFUL_TRANSACTION":
        event_data = payload.get("eventData", {})
        amount = event_data.get("amountPaid", 0)
        reference = event_data.get("product", {}).get("reference", "")
        print(f"Payment received: ₦{amount} — ref: {reference}")
    return {"status": "received"}