import { useEffect, useState } from "react"
import API from "../api/api"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts"

function AccuracyCenter() {

  const [dashboard, setDashboard] =
    useState({})

  const [trends, setTrends] =
    useState([])

  const [models, setModels] =
    useState([])

  const [report, setReport] =
    useState({})

  useEffect(() => {

    loadAccuracy()

  }, [])

  const loadAccuracy = async () => {

    try {

      const dashboardRes =
        await API.get(
          "/accuracy/dashboard"
        )

      const trendRes =
        await API.get(
          "/accuracy/trends"
        )

      const modelRes =
        await API.get(
          "/accuracy/improvements"
        )

      const reportRes =
        await API.get(
          "/accuracy/evaluation-report"
        )

      setDashboard(
        dashboardRes.data
      )

      setTrends(
        trendRes.data.trend || []
      )

      setModels(

        (modelRes.data.models || []).map(

            (item) => ({

            model : item.model,

            improvement: Number(
                item.improvement.replace("%","")
            )

            })

        )

       )

      setReport(
        reportRes.data
      )

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Forecast Accuracy Center

      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Accuracy</p>

          <h2 className="text-3xl font-bold text-green-400">

            {dashboard.accuracy}

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>MAPE</p>

          <h2 className="text-3xl font-bold text-blue-400">

            {dashboard.mape}

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>MAE</p>

          <h2 className="text-3xl font-bold text-orange-400">

            {dashboard.mae}

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>RMSE</p>

          <h2 className="text-3xl font-bold text-purple-400">

            {dashboard.rmse}

          </h2>

        </div>

      </div>

      <div className="grid xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="mb-4 font-bold">

            Accuracy Trend

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart
              data={trends}
            >

              <CartesianGrid />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Line

                type="monotone"

                dataKey="accuracy"

                stroke="#22c55e"

                strokeWidth={3}

              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="mb-4 font-bold">

            Model Improvements

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={models}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="model" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                    dataKey="improvement"
                    fill="#3b82f6"
                    />
                </BarChart>
            </ResponsiveContainer>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Evaluation Report

        </h2>

        <div className="space-y-3">

          <div>

            Status:

            <span className="text-green-400 ml-2">

              {report.status}

            </span>

          </div>

          <div>

            {report.report}

          </div>

        </div>

      </div>

    </div>

  )
}

export default AccuracyCenter