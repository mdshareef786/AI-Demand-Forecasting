from sqlalchemy import create_engine

from sqlalchemy.orm import (
    declarative_base,
    sessionmaker
)

from dotenv import load_dotenv

import os


# ==================================
# LOAD ENV VARIABLES
# ==================================

load_dotenv()


# ==================================
# DATABASE URL
# ==================================

DATABASE_URL = os.getenv(
    "DATABASE_URL"
)


# ==================================
# VALIDATE DATABASE URL
# ==================================

if not DATABASE_URL:

    raise ValueError(

        "DATABASE_URL is missing in .env file"
    )


# ==================================
# DATABASE ENGINE
# ==================================

engine = create_engine(

    DATABASE_URL,

    pool_pre_ping=True,

    pool_recycle=300,

    echo=False
)


# ==================================
# SESSION CONFIG
# ==================================

SessionLocal = sessionmaker(

    autocommit=False,

    autoflush=False,

    bind=engine
)


# ==================================
# BASE MODEL
# ==================================

Base = declarative_base()


# ==================================
# DATABASE DEPENDENCY
# ==================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()