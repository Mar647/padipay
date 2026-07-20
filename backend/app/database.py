from sqlalchemy import create_engine, Column, String, Integer, Boolean, Float, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./padipay.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class GroupModel(Base):
    __tablename__ = "groups"

    group_id = Column(String, primary_key=True)
    name = Column(String)
    contribution_amount = Column(Integer)
    frequency = Column(String)
    max_members = Column(Integer)
    current_members = Column(Integer, default=1)
    invite_code = Column(String, unique=True)
    next_payout_date = Column(String)
    total_pooled = Column(Integer, default=0)
    members = Column(JSON, default=[])


class VirtualAccountModel(Base):
    __tablename__ = "virtual_accounts"

    group_id = Column(String, primary_key=True)
    account_number = Column(String)
    account_name = Column(String)
    bank_name = Column(String)
    bank_code = Column(String)
    reservation_reference = Column(String)


def init_db():
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()