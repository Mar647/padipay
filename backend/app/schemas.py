from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class OnboardRequest(BaseModel):
    phone: str
    bvn: str

class OnboardResponse(BaseModel):
    user_id: str
    token: str
    name: str
    phone: str

class GroupCreateRequest(BaseModel):
    name: str
    contribution_amount: int
    frequency: str
    max_members: int
    start_date: str

class GroupMember(BaseModel):
    user_id: str
    name: str
    dti_score: int
    payout_position: int
    has_paid_this_cycle: bool

class Group(BaseModel):
    group_id: str
    name: str
    contribution_amount: int
    frequency: str
    max_members: int
    current_members: int
    invite_code: str
    next_payout_date: str
    total_pooled: int
    members: List[GroupMember]

class JoinGroupRequest(BaseModel):
    invite_code: str

class Notification(BaseModel):
    id: str
    type: str
    message: str
    read: bool
    created_at: datetime