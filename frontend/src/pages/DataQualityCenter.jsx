import { useEffect, useState } from "react"
import API from "../api/api"

function DataQualityCenter() {

  const [records, setRecords] =
    useState([])

  const [scoreSummary, setScoreSummary] =
    useState({})

  const [dashboard, setDashboard] =
    useState({})

  const [datasetName, setDatasetName] =
    useState("")

  const [qualityScore, setQualityScore] =
    useState("")

  const [missingRecords, setMissingRecords] =
    useState("")

  const [validationStatus, setValidationStatus] =
    useState("Valid")

  useEffect(() => {

    loadData()

  }, [])

  const loadData = async () => {

    try {

      const recordsResponse =
        await API.get(
          "/data-quality/"
        )

      setRecords(
        recordsResponse.data
      )

      const scoreResponse =
        await API.get(
          "/data-quality/score"
        )

      setScoreSummary(
        scoreResponse.data
      )

      const dashboardResponse =
        await API.get(
          "/data-quality/dashboard"
        )

      setDashboard(
        dashboardResponse.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  const createRecord =
    async () => {

      try {

        await API.post(

          "/data-quality/create",

          null,

          {
            params: {

              dataset_name:
                datasetName,

              quality_score:
                Number(
                  qualityScore
                ),

              missing_records:
                Number(
                  missingRecords
                ),

              validation_status:
                validationStatus
            }
          }
        )

        setDatasetName("")
        setQualityScore("")
        setMissingRecords("")
        setValidationStatus(
          "Valid"
        )

        loadData()

      } catch (error) {

        console.log(error)

        alert(
          "Record creation failed"
        )
      }
    }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Data Quality Center

      </h1>

      {/* Create Record */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Add Quality Record

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Dataset Name"
            value={datasetName}
            onChange={(e)=>
              setDatasetName(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Quality Score"
            value={qualityScore}
            onChange={(e)=>
              setQualityScore(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Missing Records"
            value={missingRecords}
            onChange={(e)=>
              setMissingRecords(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <select
            value={validationStatus}
            onChange={(e)=>
              setValidationStatus(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          >

            <option value="Valid">
              Valid
            </option>

            <option value="Invalid">
              Invalid
            </option>

          </select>

        </div>

        <button

          onClick={createRecord}

          className="
          mt-5
          bg-blue-600
          px-6
          py-3
          rounded-xl
          "
        >

          Add Record

        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Total Datasets</h3>

          <p className="text-3xl font-bold">

            {
              dashboard.total_datasets || 0
            }

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Average Score</h3>

          <p className="text-3xl font-bold text-green-400">

            {
              scoreSummary.average_score || 0
            }

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>High Quality</h3>

          <p className="text-3xl font-bold text-cyan-400">

            {
              dashboard.high_quality || 0
            }

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Low Quality</h3>

          <p className="text-3xl font-bold text-red-400">

            {
              dashboard.low_quality || 0
            }

          </p>

        </div>

      </div>

      {/* Quality Records */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Dataset Quality Records

        </h2>

        <table className="w-full">

          <thead>

            <tr className="text-left">

              <th>Dataset</th>

              <th>Score</th>

              <th>Missing</th>

              <th>Status</th>

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

                      {item.dataset_name}

                    </td>

                    <td>

                      {item.quality_score}

                    </td>

                    <td>

                      {item.missing_records}

                    </td>

                    <td>

                      <span

                        className={

                          item.validation_status ===
                          "Valid"

                          ?

                          "text-green-400"

                          :

                          "text-red-400"
                        }

                      >

                        {

                          item.validation_status

                        }

                      </span>

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

export default DataQualityCenter