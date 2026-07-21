from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm.attributes import flag_modified
from sqlalchemy.orm import Session
from app.schemas import Group, GroupCreateRequest, JoinGroupRequest
from app.database import get_db, GroupModel
from typing import List
import uuid
import random
import string

router = APIRouter()

def generate_invite_code():
    return "PADI-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=4))

@router.post("/", response_model=Group)
async def create_group(body: GroupCreateRequest, db: Session = Depends(get_db)):
    group_id = str(uuid.uuid4())[:8]
    group = GroupModel(
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
    db.add(group)
    db.commit()
    db.refresh(group)
    return Group(**group.__dict__)

@router.get("/", response_model=List[Group])
async def list_groups(db: Session = Depends(get_db)):
    groups = db.query(GroupModel).all()
    return [Group(**g.__dict__) for g in groups]

@router.get("/{group_id}", response_model=Group)
async def get_group(group_id: str, db: Session = Depends(get_db)):
    group = db.query(GroupModel).filter(GroupModel.group_id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return Group(**group.__dict__)

@router.post("/join", response_model=Group)
async def join_group(body: JoinGroupRequest, db: Session = Depends(get_db)):
    group = db.query(GroupModel).filter(GroupModel.invite_code == body.invite_code).first()
    if not group:
        raise HTTPException(status_code=404, detail="Invalid invite code")
    
    new_member = {
        "user_id": str(uuid.uuid4())[:8],
        "name": body.member_name,
        "dti_score": 70,
        "payout_position": group.current_members + 1,
        "has_paid_this_cycle": False,
    }
    
    updated_members = list(group.members or []) + [new_member]
    from sqlalchemy.orm.attributes import flag_modified
    group.members = updated_members
    group.current_members = len(updated_members) + 1  # +1 for the admin
    flag_modified(group, "members")
    db.commit()
    db.refresh(group)
    return Group(**group.__dict__)