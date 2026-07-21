from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db, VirtualAccountModel
from app.services.monnify import create_reserved_account

router = APIRouter()

@router.post("/create-account/{group_id}")
async def create_virtual_account(group_id: str, group_name: str, email: str, db: Session = Depends(get_db)):
    # Check if account already exists
    existing = db.query(VirtualAccountModel).filter(VirtualAccountModel.group_id == group_id).first()
    if existing:
        return existing

    try:
        account = await create_reserved_account(group_id, group_name, email)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Monnify error: {str(e)}")

    virtual_account = VirtualAccountModel(
        group_id=group_id,
        account_number=account["accounts"][0]["accountNumber"],
        account_name=account["accountName"],
        bank_name=account["accounts"][0]["bankName"],
        bank_code=account["accounts"][0]["bankCode"],
        reservation_reference=account["reservationReference"],
    )
    db.add(virtual_account)
    db.commit()
    db.refresh(virtual_account)
    return virtual_account

@router.get("/virtual-account/{group_id}")
async def get_virtual_account(group_id: str, db: Session = Depends(get_db)):
    account = db.query(VirtualAccountModel).filter(VirtualAccountModel.group_id == group_id).first()
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