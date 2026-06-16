import { useEffect, useState } from "react"
import API from "../api/api"

function ForecastGovernance() {

  const [records, setRecords] =
    useState([])

  const [dashboard, setDashboard] =
    useState({})

  const [forecastId, setForecastId] =
    useState("")

  const [version, setVersion] =
    useState("")

  const [status, setStatus] =
    useState("draft")

  const [changeSummary, setChangeSummary] =
    useState("")

  useEffect(() => {

    loadData()

  }, [])

  const loadData = async () => {

    try {

      const recordsResponse =
        await API.get(
          "/forecast-governance/"
        )

      setRecords(
        recordsResponse.data
      )

      const dashboardResponse =
        await API.get(
          "/forecast-governance/dashboard"
        )

      setDashboard(
        dashboardResponse.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  const createGovernance = async () => {

    try {

      await API.post(

        "/forecast-governance/create",

        null,

        {
          params: {

            forecast_id:
              Number(forecastId),

            version,

            modified_by:
              1,

            remarks:
              changeSummary
          }
        }
      )

      setForecastId("")
      setVersion("")
      setStatus("draft")
      setChangeSummary("")

      loadData()

    } catch (error) {

      console.log(error)

      alert(
        "Governance record creation failed"
      )
    }
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Forecast Governance Center

      </h1>

      {/* Create Governance */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Create Governance Record

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
            className="bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Version"
            value={version}
            onChange={(e)=>
              setVersion(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <select
            value={status}
            onChange={(e)=>
              setStatus(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          >

            <option value="draft">
              Draft
            </option>

            <option value="review">
              Review
            </option>

            <option value="approved">
              Approved
            </option>

            <option value="archived">
              Archived
            </option>

          </select>

          <input
            type="text"
            placeholder="Change Summary"
            value={changeSummary}
            onChange={(e)=>
              setChangeSummary(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

        </div>

        <button

          onClick={createGovernance}

          className="
          mt-5
          bg-blue-600
          px-6
          py-3
          rounded-xl
          "
        >

          Create Record

        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Total Records</h3>

          <p className="text-3xl font-bold">

            {
              dashboard.total_records || 0
            }

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Draft</h3>

          <p className="text-3xl font-bold text-yellow-400">

            {
              dashboard.draft || 0
            }

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Approved</h3>

          <p className="text-3xl font-bold text-green-400">

            {
              dashboard.approved || 0
            }

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Archived</h3>

          <p className="text-3xl font-bold text-red-400">

            {
              dashboard.archived || 0
            }

          </p>

        </div>

      </div>

      {/* Governance Records */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Governance Records

        </h2>

        <table className="w-full">

          <thead>

            <tr className="text-left">

              <th>Forecast</th>

              <th>Version</th>

              <th>Status</th>

              <th>Summary</th>

            </tr>

          </thead>

          <tbody>

            {

              records.map(

                (item) => (

                  <tr

                    key={item.id}

                    className="
                    border-t
                    border-slate-800
                    "
                  >

                    <td className="py-3">

                      {item.forecast_id}

                    </td>

                    <td>

                      {item.version}

                    </td>

                    <td>

                      {item.lifecycle_status}

                    </td>

                    <td>

                      {item.change_summary}

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  )
}

export default ForecastGovernance