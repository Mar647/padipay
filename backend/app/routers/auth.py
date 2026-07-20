from fastapi import APIRouter
from app.schemas import OnboardRequest, OnboardResponse

router = APIRouter()

@router.post("/onboard", response_model=OnboardResponse)
async def onboard(body: OnboardRequest):
    # TODO: verify BVN, save to DB, generate real JWT
    return OnboardResponse(
        user_id="usr_001",
        token="jwt-token-placeholder",
        name="Test User",
        phone=body.phone,
    )