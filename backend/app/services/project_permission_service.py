from app.models.project_permission import (
    ProjectPermission
)


def assign_permission(
    db,
    project_id,
    user_id,
    role
):

    permission = ProjectPermission(
        project_id=project_id,
        user_id=user_id,
        role=role
    )

    db.add(permission)

    db.commit()

    db.refresh(permission)

    return permission


def get_permissions(
    db,
    project_id
):

    return db.query(
        ProjectPermission
    ).filter(
        ProjectPermission.project_id == project_id
    ).all()


def remove_permission(
    db,
    permission_id
):

    permission = db.query(
        ProjectPermission
    ).filter(
        ProjectPermission.id == permission_id
    ).first()

    if not permission:
        return False

    db.delete(permission)

    db.commit()

    return True