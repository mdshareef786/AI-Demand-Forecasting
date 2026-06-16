from app.models.workflow import Workflow
from app.models.workflow_execution import WorkflowExecution


def create_workflow(

    db,

    name,

    workflow_type
):

    workflow = Workflow(

        name=name,

        workflow_type=workflow_type
    )

    db.add(workflow)

    db.commit()

    db.refresh(workflow)

    return workflow


def get_workflows(db):

    return db.query(

        Workflow

    ).all()


def get_workflow(

    db,

    workflow_id
):

    return db.query(

        Workflow

    ).filter(

        Workflow.id
        ==
        workflow_id

    ).first()


def run_workflow(

    db,

    workflow_id
):

    workflow = get_workflow(

        db,

        workflow_id
    )

    if not workflow:

        return None

    execution = WorkflowExecution(

        workflow_id=workflow.id,

        status="completed",

        execution_message=
        f"{workflow.name} executed successfully"
    )

    db.add(execution)

    db.commit()

    db.refresh(execution)

    return execution


def get_executions(db):

    return db.query(

        WorkflowExecution

    ).order_by(

        WorkflowExecution.executed_at.desc()

    ).all()