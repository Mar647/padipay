from fastapi import APIRouter

router = APIRouter()

@router.get("/{user_id}")
async def get_passport(user_id: str):
    return {
        "user_id": user_id,
        "name": "Test User",
        "dti_score": 82,
        "cycles_completed": 4,
        "total_saved": 160000,
        "on_time_rate": 0.96,
    }