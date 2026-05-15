import { useEffect, useState } from "react"

import API from "../api/api"

import { motion } from "framer-motion"

import {
  BrainCircuit,
  TrendingUp,
  Activity,
  BarChart3,
  Filter,
  Scale
} from "lucide-react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"


function Forecast() {

  const [forecastData, setForecastData] =
    useState([])

  const [forecastError, setForecastError] =
    useState(0)

  const [model, setModel] =
    useState("")

  const [category, setCategory] =
    useState("")

  const [product, setProduct] =
    useState("")

  const [months, setMonths] =
    useState(6)

  const [loading, setLoading] =
    useState(false)

  const [comparisonData, setComparisonData] =
    useState(null)

  const [compareLoading, setCompareLoading] =
    useState(false)


  useEffect(() => {

    fetchForecast()

  }, [])


  // ==================================
  // FETCH FORECAST
  // ==================================

  const fetchForecast = async () => {

    try {

      setLoading(true)

      const token =
        localStorage.getItem("token")

      let url =
        `/forecast/predict?future_months=${months}`

      if (category) {

        url += `&category=${category}`
      }

      if (product) {

        url += `&product=${product}`
      }

      const response = await API.get(

        url,

        {

          headers: {

            Authorization: `Bearer ${token}`
          }
        }
      )

      setForecastData(
        response.data.forecast
      )

      setForecastError(
        response.data.forecast_error_mape
      )

      setModel(
        response.data.model
      )

    }

    catch (error) {

      console.log(error)
    }

    finally {

      setLoading(false)
    }
  }


  // ==================================
  // COMPARE MODELS
  // ==================================

  const compareModels = async () => {

    try {

      setCompareLoading(true)

      const token =
        localStorage.getItem("token")

      let url =
        `/forecast/compare-models?future_months=${months}`

      if (category) {

        url += `&category=${category}`
      }

      if (product) {

        url += `&product=${product}`
      }

      const response = await API.get(

        url,

        {

          headers: {

            Authorization: `Bearer ${token}`
          }
        }
      )

      setComparisonData(
        response.data
      )

    }

    catch (error) {

      console.log(error)
    }

    finally {

      setCompareLoading(false)
    }
  }


  // ==================================
  // KPI CARDS
  // ==================================

  const cards = [

    {
      title: "AI Model",

      value: model,

      icon: <BrainCircuit size={24} />,

      gradient:
        "from-blue-500 to-cyan-500"
    },

    {
      title: "Forecast Error",

      value: `${forecastError}%`,

      icon: <Activity size={24} />,

      gradient:
        "from-red-500 to-orange-500"
    },

    {
      title: "Forecast Months",

      value: forecastData.length,

      icon: <TrendingUp size={24} />,

      gradient:
        "from-purple-500 to-pink-500"
    },

    {
      title: "Prediction Status",

      value: "Active",

      icon: <BarChart3 size={24} />,

      gradient:
        "from-green-500 to-emerald-500"
    }
  ]


  return (

    <div className="min-h-screen text-white">


      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-3xl md:text-5xl font-bold leading-tight">

          AI Forecast Intelligence

        </h1>

        <p className="text-slate-400 mt-3 text-sm md:text-lg">

          Advanced Prophet-based business demand forecasting system

        </p>

      </div>


      {/* FILTER SECTION */}

      <motion.div

        initial={{
          opacity: 0,
          y: 20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl mb-10"
      >

        <div className="flex items-center gap-3 mb-6">

          <Filter size={24} />

          <h2 className="text-xl md:text-2xl font-bold">

            Forecast Filters

          </h2>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

          <input
            type="text"
            placeholder="Category (Technology)"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none w-full"
          />

          <input
            type="text"
            placeholder="Product (Chair)"
            value={product}
            onChange={(e) =>
              setProduct(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none w-full"
          />

          <select
            value={months}
            onChange={(e) =>
              setMonths(Number(e.target.value))
            }
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none w-full"
          >

            <option value={3}>
              3 Months
            </option>

            <option value={6}>
              6 Months
            </option>

            <option value={12}>
              12 Months
            </option>

          </select>

          <button

            onClick={fetchForecast}

            className="bg-blue-600 hover:bg-blue-700 transition rounded-xl font-semibold py-3 px-4"
          >

            {

              loading

                ? "Generating..."

                : "Generate Forecast"
            }

          </button>


          <button

            onClick={compareModels}

            className="bg-purple-600 hover:bg-purple-700 transition rounded-xl font-semibold py-3 px-4 flex items-center justify-center gap-2"
          >

            <Scale size={18} />

            {

              compareLoading

                ? "Comparing..."

                : "Compare Models"
            }

          </button>

        </div>

      </motion.div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {

          cards.map((card, index) => (

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
                duration: 0.4,
                delay: index * 0.1
              }}

              whileHover={{
                scale: 1.03
              }}

              className={`

                bg-gradient-to-br
                ${card.gradient}

                rounded-3xl
                p-5 md:p-6

                shadow-2xl
                border
                border-white/10
              `}
            >

              <div className="flex items-center justify-between gap-4">

                <div className="flex-1">

                  <p className="text-sm opacity-80">

                    {card.title}

                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold mt-3 break-words">

                    {card.value}

                  </h2>

                </div>

                <div className="bg-white/20 p-4 rounded-2xl shrink-0">

                  {card.icon}

                </div>

              </div>

            </motion.div>
          ))
        }

      </div>


      {/* FORECAST CHART */}

      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.5
        }}

        className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl mb-10 overflow-x-auto"
      >

        <div className="mb-8">

          <h2 className="text-2xl md:text-3xl font-bold">

            Future Revenue Prediction

          </h2>

          <p className="text-slate-400 mt-2 text-sm md:text-base">

            AI-generated forecast trend analysis using Prophet forecasting

          </p>

        </div>


        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <LineChart data={forecastData}>

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
              stroke="#10b981"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </motion.div>


      {/* MODEL COMPARISON */}

      {

        comparisonData && (

          <motion.div

            initial={{
              opacity: 0,
              y: 40
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl mb-10"
          >

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">

              <div>

                <h2 className="text-2xl md:text-3xl font-bold">

                  AI Model Comparison

                </h2>

                <p className="text-slate-400 mt-2">

                  Prophet vs Linear Regression performance analysis

                </p>

              </div>


              <div className="bg-green-500/20 text-green-400 px-5 py-3 rounded-2xl font-semibold w-fit">

                Best Model:
                {" "}
                {comparisonData.best_model}

              </div>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>

                  <tr className="border-b border-slate-700">

                    <th className="text-left py-5 text-slate-300">

                      Model

                    </th>

                    <th className="text-left py-5 text-slate-300">

                      MAPE

                    </th>

                    <th className="text-left py-5 text-slate-300">

                      MAE

                    </th>

                    <th className="text-left py-5 text-slate-300">

                      RMSE

                    </th>

                    <th className="text-left py-5 text-slate-300">

                      Recommendation

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {

                    comparisonData.comparison.map(

                      (item, index) => (

                        <tr
                          key={index}
                          className="border-b border-slate-800"
                        >

                          <td className="py-5 font-semibold">

                            {item.model}

                          </td>

                          <td className="py-5 text-cyan-400 font-bold">

                            {item.mape}

                          </td>

                          <td className="py-5">

                            {item.mae}

                          </td>

                          <td className="py-5">

                            {item.rmse}

                          </td>

                          <td className="py-5">

                            {

                              item.model === comparisonData.best_model

                                ? (

                                  <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">

                                    Recommended

                                  </span>
                                )

                                : (

                                  <span className="bg-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm">

                                    Alternative

                                  </span>
                                )
                            }

                          </td>

                        </tr>
                      )
                    )
                  }

                </tbody>

              </table>

            </div>

          </motion.div>
        )
      }


      {/* AI INSIGHTS */}

      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.6
        }}

        className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl mb-10"
      >

        <h2 className="text-2xl md:text-3xl font-bold mb-8">

          AI Forecast Insights

        </h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">

            <h3 className="text-lg md:text-xl font-semibold mb-3">

              Trend Analysis

            </h3>

            <p className="text-slate-400 leading-relaxed text-sm md:text-base">

              Prophet model identified long-term sales growth and seasonal demand patterns.

            </p>

          </div>


          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">

            <h3 className="text-lg md:text-xl font-semibold mb-3">

              Forecast Quality

            </h3>

            <p className="text-slate-400 leading-relaxed text-sm md:text-base">

              Current forecast error is {forecastError}% MAPE based on unseen validation data.

            </p>

          </div>


          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">

            <h3 className="text-lg md:text-xl font-semibold mb-3">

              Business Recommendation

            </h3>

            <p className="text-slate-400 leading-relaxed text-sm md:text-base">

              Use forecasting insights to optimize inventory planning and future sales strategy.

            </p>

          </div>

        </div>

      </motion.div>


      {/* TABLE */}

      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.7
        }}

        className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl overflow-x-auto"
      >

        <h2 className="text-2xl md:text-3xl font-bold mb-8">

          Future Predictions

        </h2>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[600px]">

            <thead>

              <tr className="border-b border-slate-700">

                <th className="text-left py-5 text-slate-300">

                  Forecast Month

                </th>

                <th className="text-left py-5 text-slate-300">

                  Predicted Revenue

                </th>

                <th className="text-left py-5 text-slate-300">

                  Status

                </th>

              </tr>

            </thead>

            <tbody>

              {

                forecastData.map((item) => (

                  <tr
                    key={item.month}
                    className="border-b border-slate-800"
                  >

                    <td className="py-5 font-medium">

                      {item.month}

                    </td>

                    <td className="py-5 text-green-400 font-bold">

                      ₹ {item.predicted_revenue.toLocaleString()}

                    </td>

                    <td className="py-5">

                      <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">

                        Predicted

                      </span>

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </motion.div>

    </div>
  )
}

export default Forecast