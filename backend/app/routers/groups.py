from fastapi import APIRouter, HTTPException
from app.schemas import Group, GroupCreateRequest, JoinGroupRequest, GroupMember
from typing import List
import uuid
import random
import string

router = APIRouter()

# In-memory store (good enough for demo)
groups_db = {}

def generate_invite_code():
    return "PADI-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=4))

@router.post("/", response_model=Group)
async def create_group(body: GroupCreateRequest):
    group_id = str(uuid.uuid4())[:8]
    group = Group(
        group_id=group_id,
        name=body.name,
        contribution_amount=body.contribution_amount,
        frequency=body.frequency,
        max_members=body.max_members,
        current_members=1,
        invite_code=generate_invite_code(),
        next_payout_date=body.start_date,
        total_pooled=0,
        members=[],
    )
    groups_db[group_id] = group
    return group

@router.get("/", response_model=List[Group])
async def list_groups():
    return list(groups_db.values())

@router.get("/{group_id}", response_model=Group)
async def get_group(group_id: str):
    group = groups_db.get(group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return group

@router.post("/join", response_model=Group)
async def join_group(body: JoinGroupRequest):
    for group in groups_db.values():
        if group.invite_code == body.invite_code:
            return group
    raise HTTPException(status_code=404, detail="Invalid invite code")