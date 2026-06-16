from app.models.organization_user import (
    OrganizationUser
)


# ==========================
# ADD USER TO ORGANIZATION
# ==========================

def add_user_to_organization(

    db,

    organization_id,

    user_id,

    role
):

    member = OrganizationUser(

        organization_id=organization_id,

        user_id=user_id,

        role=role
    )

    db.add(member)

    db.commit()

    db.refresh(member)

    return member


# ==========================
# GET ORGANIZATION USERS
# ==========================

def get_organization_users(

    db,

    organization_id
):

    return db.query(

        OrganizationUser

    ).filter(

        OrganizationUser.organization_id
        ==
        organization_id

    ).all()


# ==========================
# UPDATE ROLE
# ==========================

def update_user_role(

    db,

    member_id,

    role
):

    member = db.query(

        OrganizationUser

    ).filter(

        OrganizationUser.id
        ==
        member_id

    ).first()

    if not member:

        return None

    member.role = role

    db.commit()

    db.refresh(member)

    return member


# ==========================
# REMOVE USER
# ==========================

def remove_user_from_organization(

    db,

    member_id
):

    member = db.query(

        OrganizationUser

    ).filter(

        OrganizationUser.id
        ==
        member_id

    ).first()

    if not member:

        return False

    db.delete(member)

    db.commit()

    return True