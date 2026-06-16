import { useEffect, useState } from "react"
import API from "../api/api"

function KPIManagement() {

  const [kpis, setKpis] =
    useState([])

  const [trends, setTrends] =
    useState([])

  const [alerts, setAlerts] =
    useState([])

  const [kpiName, setKpiName] =
    useState("")

  const [targetValue, setTargetValue] =
    useState("")

  const [currentValue, setCurrentValue] =
    useState("")

  const [threshold, setThreshold] =
    useState("")

  useEffect(() => {

    loadData()

  }, [])

  const loadData = async () => {

    try {

      const kpiResponse =
        await API.get("/kpis/")

      setKpis(
        kpiResponse.data
      )

      const trendResponse =
        await API.get(
          "/kpis/trends"
        )

      setTrends(
        trendResponse.data
      )

      const alertResponse =
        await API.get(
          "/kpis/alerts"
        )

      setAlerts(
        alertResponse.data.alerts
      )

    } catch (error) {

      console.log(error)
    }
  }

  const createKPI =
    async () => {

      try {

        await API.post(

          "/kpis/create",

          null,

          {
            params: {

              kpi_name:
                kpiName,

              target_value:
                Number(
                  targetValue
                ),

              current_value:
                Number(
                  currentValue
                ),

              threshold:
                Number(
                  threshold
                )
            }
          }
        )

        setKpiName("")
        setTargetValue("")
        setCurrentValue("")
        setThreshold("")

        loadData()

      } catch (error) {

        console.log(error)

        alert(
          "KPI creation failed"
        )
      }
    }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        KPI Management Center

      </h1>

      {/* Create KPI */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Create KPI

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="KPI Name"
            value={kpiName}
            onChange={(e)=>
              setKpiName(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Target Value"
            value={targetValue}
            onChange={(e)=>
              setTargetValue(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Current Value"
            value={currentValue}
            onChange={(e)=>
              setCurrentValue(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Threshold"
            value={threshold}
            onChange={(e)=>
              setThreshold(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

        </div>

        <button

          onClick={createKPI}

          className="
          mt-5
          bg-blue-600
          px-6
          py-3
          rounded-xl
          "
        >

          Create KPI

        </button>

      </div>

      {/* KPI Summary */}

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Total KPIs</h3>

          <p className="text-3xl font-bold">

            {kpis.length}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>KPI Alerts</h3>

          <p className="text-3xl font-bold text-red-400">

            {alerts.length}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>KPI Trends</h3>

          <p className="text-3xl font-bold text-green-400">

            {trends.length}

          </p>

        </div>

      </div>

      {/* KPI Table */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          KPI Performance

        </h2>

        <table className="w-full">

          <thead>

            <tr className="text-left">

              <th>KPI</th>

              <th>Target</th>

              <th>Current</th>

              <th>Threshold</th>

            </tr>

          </thead>

          <tbody>

            {

              kpis.map(

                (item) => (

                  <tr

                    key={item.id}

                    className="
                    border-t
                    border-slate-800
                    "
                  >

                    <td className="py-3">

                      {item.kpi_name}

                    </td>

                    <td>

                      {item.target_value}

                    </td>

                    <td>

                      {item.current_value}

                    </td>

                    <td>

                      {item.threshold}

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>

      {/* KPI Trends */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          KPI Achievement Trends

        </h2>

        <div className="space-y-3">

          {

            trends.map(

              (item, index) => (

                <div

                  key={index}

                  className="
                  bg-slate-800
                  p-4
                  rounded-xl
                  "
                >

                  <div>

                    {item.kpi}

                  </div>

                  <div className="text-green-400">

                    Achievement:

                    {" "}

                    {

                      item.achievement_percent

                    }%

                  </div>

                </div>

              )

            )

          }

        </div>

      </div>

      {/* KPI Alerts */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          KPI Alerts

        </h2>

        <div className="space-y-3">

          {

            alerts.map(

              (item, index) => (

                <div

                  key={index}

                  className="
                  bg-red-500/10
                  border
                  border-red-500
                  p-4
                  rounded-xl
                  "
                >

                  <div>

                    {item.kpi}

                  </div>

                  <div>

                    {item.message}

                  </div>

                </div>

              )

            )

          }

        </div>

      </div>

    </div>

  )
}

export default KPIManagement