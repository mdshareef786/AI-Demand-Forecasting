from app.models.organization import (
    Organization
)


# ==========================
# CREATE ORGANIZATION
# ==========================

def create_organization(

    db,

    name,

    industry,

    country,

    email,

    phone
):

    organization = Organization(

        name=name,

        industry=industry,

        country=country,

        email=email,

        phone=phone
    )

    db.add(
        organization
    )

    db.commit()

    db.refresh(
        organization
    )

    return organization


# ==========================
# GET ALL ORGANIZATIONS
# ==========================

def get_organizations(
    db
):

    return db.query(

        Organization

    ).order_by(

        Organization.created_at.desc()

    ).all()


# ==========================
# GET ORGANIZATION
# ==========================

def get_organization(

    db,

    organization_id
):

    return db.query(

        Organization

    ).filter(

        Organization.id
        ==
        organization_id

    ).first()


# ==========================
# UPDATE ORGANIZATION
# ==========================

def update_organization(

    db,

    organization_id,

    data
):

    organization = get_organization(

        db,

        organization_id
    )

    if not organization:

        return None

    if "name" in data:

        organization.name = data[
            "name"
        ]

    if "industry" in data:

        organization.industry = data[
            "industry"
        ]

    if "country" in data:

        organization.country = data[
            "country"
        ]

    if "email" in data:

        organization.email = data[
            "email"
        ]

    if "phone" in data:

        organization.phone = data[
            "phone"
        ]

    if "is_active" in data:

        organization.is_active = data[
            "is_active"
        ]

    db.commit()

    db.refresh(
        organization
    )

    return organization


# ==========================
# DELETE ORGANIZATION
# ==========================

def delete_organization(

    db,

    organization_id
):

    organization = get_organization(

        db,

        organization_id
    )

    if not organization:

        return False

    db.delete(
        organization
    )

    db.commit()

    return True