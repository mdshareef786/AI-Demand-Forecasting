import { useEffect, useState } from "react"
import API from "../api/api"

function ForecastApproval() {

  const [approvals, setApprovals] =
    useState([])

  const [forecastId, setForecastId] =
    useState("")

  const [submittedBy, setSubmittedBy] =
    useState("")

  const [comments, setComments] =
    useState("")

  const [approvedBy, setApprovedBy] =
    useState("")

  useEffect(() => {

    loadApprovals()

  }, [])

  const loadApprovals = async () => {

    try {

      const response =
        await API.get(
          "/forecast-approval/history"
        )

      setApprovals(
        response.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  const submitForecast =
    async () => {

      try {

        await API.post(

          "/forecast-approval/submit",

          null,

          {
            params: {

              forecast_id:
                Number(forecastId),

              submitted_by:
                Number(submittedBy),

              comments
            }
          }
        )

        setForecastId("")
        setSubmittedBy("")
        setComments("")

        loadApprovals()

      } catch (error) {

        console.log(error)

        alert(
          "Submission failed"
        )
      }
    }

  const approveForecast =
    async (id) => {

      try {

        await API.put(

          `/forecast-approval/approve/${id}`,

          null,

          {
            params: {

              approved_by:
                Number(approvedBy)
            }
          }
        )

        loadApprovals()

      } catch (error) {

        console.log(error)
      }
    }

  const rejectForecast =
    async (id) => {

      try {

        await API.put(

          `/forecast-approval/reject/${id}`,

          null,

          {
            params: {

              approved_by:
                Number(approvedBy)
            }
          }
        )

        loadApprovals()

      } catch (error) {

        console.log(error)
      }
    }

  const approvedCount =

    approvals.filter(

      item =>
      item.status === "approved"

    ).length

  const rejectedCount =

    approvals.filter(

      item =>
      item.status === "rejected"

    ).length

  const pendingCount =

    approvals.filter(

      item =>
      item.status === "pending"

    ).length

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Forecast Approval Center

      </h1>

      {/* Submit */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Submit Forecast

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="Forecast ID"
            value={forecastId}
            onChange={(e)=>
              setForecastId(
                e.target.value
              )
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

          <input
            type="number"
            placeholder="Submitted By"
            value={submittedBy}
            onChange={(e)=>
              setSubmittedBy(
                e.target.value
              )
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

          <input
            type="text"
            placeholder="Comments"
            value={comments}
            onChange={(e)=>
              setComments(
                e.target.value
              )
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            md:col-span-2
            "
          />

        </div>

        <button

          onClick={submitForecast}

          className="
          mt-5
          bg-blue-600
          px-6
          py-3
          rounded-xl
          "
        >

          Submit Forecast

        </button>

      </div>

      {/* Approver */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Approval User

        </h2>

        <input
          type="number"
          placeholder="Approved By User ID"
          value={approvedBy}
          onChange={(e)=>
            setApprovedBy(
              e.target.value
            )
          }
          className="
          bg-slate-800
          p-3
          rounded-xl
          w-full
          "
        />

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Approved

          </h3>

          <p className="text-3xl font-bold text-green-400">

            {approvedCount}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Rejected

          </h3>

          <p className="text-3xl font-bold text-red-400">

            {rejectedCount}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Pending

          </h3>

          <p className="text-3xl font-bold text-yellow-400">

            {pendingCount}

          </p>

        </div>

      </div>

      {/* History */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Approval History

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left">

                <th>ID</th>

                <th>Forecast</th>

                <th>Status</th>

                <th>Comments</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {

                approvals.map(

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

                        {item.forecast_id}

                      </td>

                      <td>

                        <span

                          className={

                            item.status === "approved"

                            ?

                            "text-green-400"

                            :

                            item.status === "rejected"

                            ?

                            "text-red-400"

                            :

                            "text-yellow-400"
                          }

                        >

                          {item.status}

                        </span>

                      </td>

                      <td>

                        {item.comments}

                      </td>

                      <td className="space-x-2">

                        <button

                          onClick={() =>
                            approveForecast(
                              item.id
                            )
                          }

                          className="
                          bg-green-600
                          px-3 py-1
                          rounded-lg
                          "
                        >

                          Approve

                        </button>

                        <button

                          onClick={() =>
                            rejectForecast(
                              item.id
                            )
                          }

                          className="
                          bg-red-600
                          px-3 py-1
                          rounded-lg
                          "
                        >

                          Reject

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

    </div>

  )
}

export default ForecastApproval