import { useEffect, useState } from "react"
import API from "../api/api"

function StrategicPlanning() {

  const [targets, setTargets] =
    useState([])

  const [comparison, setComparison] =
    useState([])

  const [recommendations, setRecommendations] =
    useState([])

  const [targetName, setTargetName] =
    useState("")

  const [targetType, setTargetType] =
    useState("annual")

  const [targetValue, setTargetValue] =
    useState("")

  const [forecastValue, setForecastValue] =
    useState("")

  useEffect(() => {

    loadData()

  }, [])

  const loadData = async () => {

    try {

      const targetsResponse =
        await API.get(
          "/strategic-planning/targets"
        )

      setTargets(
        targetsResponse.data
      )

      const compareResponse =
        await API.get(
          "/strategic-planning/compare"
        )

      setComparison(
        compareResponse.data
      )

      const recommendationResponse =
        await API.get(
          "/strategic-planning/recommendations"
        )

      setRecommendations(

        recommendationResponse.data
          .recommendations
      )

    } catch (error) {

      console.log(error)
    }
  }

  const createTarget =
    async () => {

      try {

        await API.post(

          "/strategic-planning/target/create",

          null,

          {
            params: {

              target_name:
                targetName,

              target_type:
                targetType,

              target_value:
                Number(targetValue),

              forecast_value:
                Number(forecastValue)
            }
          }
        )

        setTargetName("")
        setTargetValue("")
        setForecastValue("")

        loadData()

      } catch (error) {

        console.log(error)

        alert(
          "Target creation failed"
        )
      }
    }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Strategic Planning Center

      </h1>

      {/* Create Target */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Create Business Target

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Target Name"
            value={targetName}
            onChange={(e)=>
              setTargetName(
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

            value={targetType}

            onChange={(e)=>
              setTargetType(
                e.target.value
              )
            }

            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          >

            <option value="annual">

              Annual

            </option>

            <option value="quarterly">

              Quarterly

            </option>

            <option value="monthly">

              Monthly

            </option>

          </select>

          <input
            type="number"
            placeholder="Target Value"
            value={targetValue}
            onChange={(e)=>
              setTargetValue(
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
            placeholder="Forecast Value"
            value={forecastValue}
            onChange={(e)=>
              setForecastValue(
                e.target.value
              )
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

        </div>

        <button

          onClick={createTarget}

          className="
          mt-5
          bg-blue-600
          px-6
          py-3
          rounded-xl
          "
        >

          Create Target

        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Total Targets</h3>

          <p className="text-3xl font-bold">

            {targets.length}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Annual Targets</h3>

          <p className="text-3xl font-bold text-green-400">

            {

              targets.filter(

                item =>
                item.target_type ===
                "annual"
              ).length
            }

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Quarterly Targets</h3>

          <p className="text-3xl font-bold text-cyan-400">

            {

              targets.filter(

                item =>
                item.target_type ===
                "quarterly"
              ).length
            }

          </p>

        </div>

      </div>

      {/* Forecast vs Target */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Forecast vs Target Analysis

        </h2>

        <table className="w-full">

          <thead>

            <tr className="text-left">

              <th>Target</th>

              <th>Target Value</th>

              <th>Forecast</th>

              <th>Variance</th>

            </tr>

          </thead>

          <tbody>

            {

              comparison.map(

                (item, index) => (

                  <tr

                    key={index}

                    className="
                    border-t
                    border-slate-800
                    "
                  >

                    <td className="py-3">

                      {item.target}

                    </td>

                    <td>

                      {item.target_value}

                    </td>

                    <td>

                      {item.forecast_value}

                    </td>

                    <td>

                      {

                        item.variance
                      }

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>

      {/* Recommendations */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Planning Recommendations

        </h2>

        <div className="space-y-3">

          {

            recommendations.map(

              (item, index) => (

                <div

                  key={index}

                  className="
                  bg-slate-800
                  p-4
                  rounded-xl
                  "
                >

                  {item}

                </div>

              )

            )

          }

        </div>

      </div>

    </div>

  )
}

export default StrategicPlanning