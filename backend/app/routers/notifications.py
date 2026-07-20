from fastapi import APIRouter
from typing import List
from datetime import datetime

router = APIRouter()

@router.get("/")
async def get_notifications():
    return [
        {"id": "n1", "type": "payment_due", "message": "Your contribution of ₦10,000 is due tomorrow.", "read": False, "created_at": datetime.now()},
        {"id": "n2", "type": "payout", "message": "You're next in line for the payout!", "read": True, "created_at": datetime.now()},
    ]