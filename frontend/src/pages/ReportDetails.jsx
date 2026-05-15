import { useEffect, useState } from "react"

import API from "../api/api"

import {
  FileText,
  BrainCircuit,
  TrendingUp,
  IndianRupee,
  CalendarDays,
  BarChart3,
  Activity
} from "lucide-react"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

import { motion } from "framer-motion"

import Skeleton from "react-loading-skeleton"

import "react-loading-skeleton/dist/skeleton.css"

import toast from "react-hot-toast"


function ReportDetails() {

  const [forecast, setForecast] =
    useState([])

  const [metrics, setMetrics] =
    useState(null)

  const [summary, setSummary] =
    useState(null)

  const [loading, setLoading] =
    useState(true)


  useEffect(() => {

    fetchReportDetails()

  }, [])


  // ==================================
  // FETCH REPORT DATA
  // ==================================

  const fetchReportDetails = async () => {

    try {

      setLoading(true)

      const token =
        localStorage.getItem("token")

      const headers = {

        Authorization: `Bearer ${token}`
      }


      // ==================================
      // FORECAST DATA
      // ==================================

      const forecastResponse = await API.get(

        "/forecast/predict?future_months=6",

        { headers }
      )

      setForecast(
        forecastResponse.data.forecast
      )

      setMetrics({

        model:
          forecastResponse.data.model,

        mape:
          forecastResponse.data.forecast_error_mape,

        mae:
          forecastResponse.data.mae,

        rmse:
          forecastResponse.data.rmse
      })


      // ==================================
      // SUMMARY DATA
      // ==================================

      const summaryResponse = await API.get(

        "/analytics/summary",

        { headers }
      )

      setSummary(
        summaryResponse.data
      )

    }

    catch (error) {

      console.log(error)

      toast.error(
        "Failed to load report details"
      )
    }

    finally {

      setLoading(false)
    }
  }


  // ==================================
  // KPI CARDS
  // ==================================

  const cards = [

    {
      title: "Forecast Model",

      value:
        metrics?.model || "N/A",

      icon: <BrainCircuit size={24} />,

      gradient:
        "from-blue-500 to-cyan-500"
    },

    {
      title: "MAPE Accuracy",

      value:
        `${metrics?.mape || 0}%`,

      icon: <TrendingUp size={24} />,

      gradient:
        "from-green-500 to-emerald-500"
    },

    {
      title: "Total Revenue",

      value:
        `₹ ${summary?.total_sales || 0}`,

      icon: <IndianRupee size={24} />,

      gradient:
        "from-purple-500 to-pink-500"
    },

    {
      title: "Forecast Months",

      value: "6 Months",

      icon: <CalendarDays size={24} />,

      gradient:
        "from-orange-500 to-yellow-500"
    }
  ]


  return (

    <div className="min-h-screen text-white">


      {/* HEADER */}

      <div className="mb-10">

        <div className="flex items-center gap-4 mb-4">

          <FileText
            size={42}
            className="text-cyan-400"
          />

          <h1 className="text-3xl md:text-5xl font-bold">

            Forecast Report Details

          </h1>

        </div>

        <p className="text-slate-400 text-sm md:text-lg">

          Enterprise AI forecasting insights and business intelligence analytics

        </p>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {

          loading

            ? Array(4).fill(0).map(

                (_, index) => (

                  <Skeleton
                    key={index}
                    height={120}
                    borderRadius={24}
                    baseColor="#1e293b"
                    highlightColor="#334155"
                  />
                )
              )

            : cards.map((card, index) => (

                <motion.div

                  key={index}

                  initial={{
                    opacity: 0,
                    y: 30
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  transition={{
                    delay: index * 0.1
                  }}

                  className={`

                    bg-gradient-to-br
                    ${card.gradient}

                    rounded-3xl
                    p-6

                    shadow-2xl
                  `}
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm opacity-80">

                        {card.title}

                      </p>

                      <h2 className="text-2xl font-bold mt-3 break-words">

                        {card.value}

                      </h2>

                    </div>

                    <div className="bg-white/20 p-4 rounded-2xl">

                      {card.icon}

                    </div>

                  </div>

                </motion.div>
              ))
        }

      </div>


      {/* FORECAST CHART */}

      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl mb-10">

        <div className="flex items-center gap-3 mb-8">

          <BarChart3 size={28} />

          <h2 className="text-2xl md:text-3xl font-bold">

            AI Forecast Analytics

          </h2>

        </div>

        {

          loading

            ? (

              <Skeleton
                height={400}
                borderRadius={20}
                baseColor="#1e293b"
                highlightColor="#334155"
              />
            )

            : (

              <ResponsiveContainer
                width="100%"
                height={400}
              >

                <LineChart data={forecast}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                  />

                  <YAxis stroke="#94a3b8" />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="predicted_revenue"
                    stroke="#06b6d4"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>
            )
        }

      </div>


      {/* METRICS */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">


        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          <div className="flex items-center gap-3 mb-5">

            <TrendingUp
              className="text-green-400"
            />

            <h3 className="text-2xl font-bold">

              MAPE Accuracy

            </h3>

          </div>

          <p className="text-5xl font-bold text-green-400">

            {metrics?.mape || 0}%

          </p>

          <p className="text-slate-400 mt-4">

            Mean Absolute Percentage Error

          </p>

        </div>


        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          <div className="flex items-center gap-3 mb-5">

            <Activity
              className="text-blue-400"
            />

            <h3 className="text-2xl font-bold">

              MAE Metric

            </h3>

          </div>

          <p className="text-5xl font-bold text-blue-400">

            {metrics?.mae || 0}

          </p>

          <p className="text-slate-400 mt-4">

            Mean Absolute Error

          </p>

        </div>


        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          <div className="flex items-center gap-3 mb-5">

            <BrainCircuit
              className="text-purple-400"
            />

            <h3 className="text-2xl font-bold">

              RMSE Metric

            </h3>

          </div>

          <p className="text-5xl font-bold text-purple-400">

            {metrics?.rmse || 0}

          </p>

          <p className="text-slate-400 mt-4">

            Root Mean Square Error

          </p>

        </div>

      </div>


      {/* AI INSIGHTS */}

      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold mb-8">

          AI Forecast Insights

        </h2>


        <div className="space-y-6 text-slate-300 leading-relaxed">

          <p>

            • The forecasting engine analyzed historical sales patterns
            and generated predictive business intelligence insights
            using advanced machine learning algorithms.

          </p>

          <p>

            • Revenue trends indicate stable business growth with
            seasonal forecasting adjustments and optimized prediction accuracy.

          </p>

          <p>

            • Forecast metrics such as MAPE, MAE, and RMSE were
            calculated to evaluate forecasting performance and model reliability.

          </p>

          <p>

            • Regional analytics and product performance metrics
            contribute to strategic business planning and demand forecasting.

          </p>

        </div>

      </div>

    </div>
  )
}

export default ReportDetails