import { useEffect, useState } from "react"
import API from "../api/api"

function ExecutiveCommandCenter() {

  const [dashboard, setDashboard] =
    useState({})

  const [metrics, setMetrics] =
    useState({})

  const [insights, setInsights] =
    useState([])

  const [summary, setSummary] =
    useState("")

  const [alerts, setAlerts] =
    useState([])

  useEffect(() => {

    loadData()

  }, [])

  const loadData = async () => {

    try {

      const dashboardResponse =
        await API.get(
          "/executive-command/dashboard"
        )

      setDashboard(
        dashboardResponse.data
      )

      const metricsResponse =
        await API.get(
          "/executive-command/forecast-metrics"
        )

      setMetrics(
        metricsResponse.data
      )

      const insightsResponse =
        await API.get(
          "/executive-command/strategic-insights"
        )

      setInsights(
        insightsResponse.data.insights
      )

      const summaryResponse =
        await API.get(
          "/executive-command/business-summary"
        )

      setSummary(
        summaryResponse.data.summary
      )

      const alertsResponse =
        await API.get(
          "/executive-command/alerts"
        )

      setAlerts(
        alertsResponse.data.alerts
      )

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Executive Command Center

      </h1>

      <div className="grid md:grid-cols-5 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">
          <h3>Organizations</h3>
          <p className="text-3xl font-bold text-cyan-400">
            {dashboard.organizations}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">
          <h3>Active Users</h3>
          <p className="text-3xl font-bold text-green-400">
            {dashboard.active_users}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">
          <h3>Forecasts</h3>
          <p className="text-3xl font-bold text-yellow-400">
            {dashboard.total_forecasts}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">
          <h3>Accuracy</h3>
          <p className="text-3xl font-bold text-purple-400">
            {dashboard.forecast_accuracy}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">
          <h3>Growth</h3>
          <p className="text-3xl font-bold text-pink-400">
            {dashboard.business_growth}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">
          <h3>Forecast Revenue</h3>
          <p className="text-2xl font-bold">
            ₹{metrics.forecast_revenue}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">
          <h3>Forecast Demand</h3>
          <p className="text-2xl font-bold">
            {metrics.forecast_demand}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">
          <h3>Forecast Growth</h3>
          <p className="text-2xl font-bold">
            {metrics.forecast_growth}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">
          <h3>Forecast Accuracy</h3>
          <p className="text-2xl font-bold">
            {metrics.accuracy}
          </p>
        </div>

      </div>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Strategic Insights

        </h2>

        <div className="space-y-3">

          {insights.map((item, index) => (

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

          ))}

        </div>

      </div>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Business Summary

        </h2>

        <div
          className="
          bg-slate-800
          p-5
          rounded-xl
          "
        >
          {summary}
        </div>

      </div>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Executive Alerts

        </h2>

        <div className="space-y-3">

          {alerts.map((item, index) => (

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
              {item}
            </div>

          ))}

        </div>

      </div>

    </div>

  )
}

export default ExecutiveCommandCenter