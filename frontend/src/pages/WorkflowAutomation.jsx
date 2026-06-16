import { useEffect, useState } from "react"
import API from "../api/api"

function WorkflowAutomation() {

  const [workflows, setWorkflows] =
    useState([])

  const [executions, setExecutions] =
    useState([])

  const [name, setName] =
    useState("")

  const [workflowType, setWorkflowType] =
    useState("forecast")

  useEffect(() => {

    loadWorkflows()

    loadExecutions()

  }, [])

  const loadWorkflows = async () => {

    try {

      const response =
        await API.get(
          "/workflows/"
        )

      setWorkflows(
        response.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  const loadExecutions =
    async () => {

      try {

        const response =
          await API.get(
            "/workflows/executions/history"
          )

        setExecutions(
          response.data
        )

      } catch (error) {

        console.log(error)
      }
    }

  const createWorkflow =
    async () => {

      try {

        await API.post(

          "/workflows/create",

          null,

          {
            params: {

              name,

              workflow_type:
                workflowType
            }
          }
        )

        setName("")

        loadWorkflows()

      } catch (error) {

        console.log(error)

        alert(
          "Workflow creation failed"
        )
      }
    }

  const runWorkflow =
    async (id) => {

      try {

        await API.post(

          `/workflows/run/${id}`
        )

        loadExecutions()

      } catch (error) {

        console.log(error)

        alert(
          "Workflow execution failed"
        )
      }
    }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Workflow Automation Center

      </h1>

      {/* Create Workflow */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Create Workflow

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Workflow Name"
            value={name}
            onChange={(e)=>
              setName(
                e.target.value
              )
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

          <select

            value={workflowType}

            onChange={(e)=>
              setWorkflowType(
                e.target.value
              )
            }

            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          >

            <option value="forecast">

              Forecast

            </option>

            <option value="report">

              Report

            </option>

            <option value="notification">

              Notification

            </option>

          </select>

        </div>

        <button

          onClick={createWorkflow}

          className="
          mt-5
          bg-blue-600
          px-6
          py-3
          rounded-xl
          "
        >

          Create Workflow

        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Total Workflows

          </h3>

          <p className="text-3xl font-bold">

            {workflows.length}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Executions

          </h3>

          <p className="text-3xl font-bold text-green-400">

            {executions.length}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Active Workflows

          </h3>

          <p className="text-3xl font-bold text-cyan-400">

            {

              workflows.filter(

                item =>
                item.is_active
              ).length
            }

          </p>

        </div>

      </div>

      {/* Workflow List */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Workflow List

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left">

                <th>Name</th>

                <th>Type</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {

                workflows.map(

                  (workflow) => (

                    <tr

                      key={workflow.id}

                      className="
                      border-t
                      border-slate-800
                      "
                    >

                      <td className="py-3">

                        {workflow.name}

                      </td>

                      <td>

                        {workflow.workflow_type}

                      </td>

                      <td>

                        {

                          workflow.is_active

                            ?

                            "Active"

                            :

                            "Inactive"
                        }

                      </td>

                      <td>

                        <button

                          onClick={() =>
                            runWorkflow(
                              workflow.id
                            )
                          }

                          className="
                          bg-green-600
                          px-4 py-1
                          rounded-lg
                          "
                        >

                          Run

                        </button>

                      </td>

                    </tr>

                  )

                )

              }

            </tbody>

          </table>

        </div>

      </div>

      {/* Execution History */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Workflow Execution Logs

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left">

                <th>ID</th>

                <th>Workflow ID</th>

                <th>Status</th>

                <th>Message</th>

                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {

                executions.map(

                  (item) => (

                    <tr

                      key={item.id}

                      className="
                      border-t
                      border-slate-800
                      "
                    >

                      <td className="py-3">

                        {item.id}

                      </td>

                      <td>

                        {item.workflow_id}

                      </td>

                      <td>

                        <span className="text-green-400">

                          {item.status}

                        </span>

                      </td>

                      <td>

                        {item.execution_message}

                      </td>

                      <td>

                        {

                          new Date(

                            item.executed_at

                          ).toLocaleString()

                        }

                      </td>

                    </tr>

                  )

                )

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )
}

export default WorkflowAutomation