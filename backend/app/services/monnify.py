import httpx
import base64
import os
from dotenv import load_dotenv

load_dotenv()

MONNIFY_BASE_URL = os.getenv("MONNIFY_BASE_URL")
API_KEY = os.getenv("MONNIFY_API_KEY")
SECRET_KEY = os.getenv("MONNIFY_SECRET_KEY")
CONTRACT_CODE = os.getenv("MONNIFY_CONTRACT_CODE")


async def get_auth_token() -> str:
    credentials = base64.b64encode(f"{API_KEY}:{SECRET_KEY}".encode()).decode()
    async with httpx.AsyncClient() as client:
        res = await client.post(
            f"{MONNIFY_BASE_URL}/api/v1/auth/login",
            headers={"Authorization": f"Basic {credentials}"},
        )
        res.raise_for_status()
        return res.json()["responseBody"]["accessToken"]


async def create_reserved_account(group_id: str, group_name: str, email: str) -> dict:
    token = await get_auth_token()
    async with httpx.AsyncClient() as client:
        res = await client.post(
            f"{MONNIFY_BASE_URL}/api/v2/bank-transfer/reserved-accounts",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "accountReference": f"padipay-group-{group_id}",
                "accountName": f"PadiPay - {group_name}",
                "currencyCode": "NGN",
                "contractCode": CONTRACT_CODE,
                "customerEmail": email,
                "customerName": group_name,
                "getAllAvailableBanks": False,
                "preferredBanks": ["035"],
            },
        )
        res.raise_for_status()
        return res.json()["responseBody"]