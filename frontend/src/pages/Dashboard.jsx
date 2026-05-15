import { useEffect, useState } from "react"

import API from "../api/api"

import {
  TrendingUp,
  IndianRupee,
  Database,
  BrainCircuit,
  MapPinned,
  BarChart3
} from "lucide-react"

import { motion } from "framer-motion"

import Skeleton from "react-loading-skeleton"

import "react-loading-skeleton/dist/skeleton.css"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"

import toast from "react-hot-toast"


function Dashboard() {

  const [summary, setSummary] =
    useState(null)

  const [monthlySales, setMonthlySales] =
    useState([])

  const [forecast, setForecast] =
    useState([])

  const [regionSales, setRegionSales] =
    useState([])

  const [topRegions, setTopRegions] =
    useState([])

  const [kpis, setKpis] =
    useState(null)

  const [loading, setLoading] =
    useState(true)


  useEffect(() => {

    fetchDashboardData()

  }, [])


  // ==================================
  // FETCH DASHBOARD DATA
  // ==================================

  const fetchDashboardData = async () => {

    try {

      setLoading(true)

      const token =
        localStorage.getItem("token")

      const headers = {

        Authorization: `Bearer ${token}`
      }


      // ==================================
      // SUMMARY
      // ==================================

      const summaryResponse = await API.get(

        "/analytics/summary",

        { headers }
      )

      setSummary(
        summaryResponse.data
      )


      // ==================================
      // MONTHLY SALES
      // ==================================

      const salesResponse = await API.get(

        "/analytics/monthly-sales",

        { headers }
      )

      setMonthlySales(
        salesResponse.data.monthly_sales
      )


      // ==================================
      // FORECAST
      // ==================================

      const forecastResponse = await API.get(

        "/forecast/predict?future_months=6",

        { headers }
      )

      setForecast(
        forecastResponse.data.forecast
      )


      // ==================================
      // REGION SALES
      // ==================================

      const regionResponse = await API.get(

        "/analytics/region-sales",

        { headers }
      )

      if (
        regionResponse.data.region_sales
      ) {

        setRegionSales(
          regionResponse.data.region_sales
        )
      }


      // ==================================
      // TOP REGIONS
      // ==================================

      const topRegionResponse = await API.get(

        "/analytics/top-regions",

        { headers }
      )

      if (
        topRegionResponse.data.top_regions
      ) {

        setTopRegions(
          topRegionResponse.data.top_regions
        )
      }


      // ==================================
      // KPI ANALYTICS
      // ==================================

      const kpiResponse = await API.get(

        "/analytics/kpis",

        { headers }
      )

      setKpis(
        kpiResponse.data
      )

    }

    catch (error) {

      console.log(error)

      toast.error(
        "Failed to load dashboard data"
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
      title: "Total Revenue",

      value: `₹ ${kpis?.total_sales || 0}`,

      icon: <IndianRupee size={24} />,

      gradient:
        "from-blue-500 to-cyan-500"
    },

    {
      title: "Dataset Rows",

      value: summary?.total_rows || 0,

      icon: <Database size={24} />,

      gradient:
        "from-purple-500 to-pink-500"
    },

    {
      title: "Top Product",

      value:

        summary?.top_products

          ? Object.keys(
              summary.top_products
            )[0]

          : "N/A",

      icon: <TrendingUp size={24} />,

      gradient:
        "from-green-500 to-emerald-500"
    },

    {
      title: "Highest Sale",

      value: `₹ ${kpis?.highest_sale || 0}`,

      icon: <BrainCircuit size={24} />,

      gradient:
        "from-orange-500 to-yellow-500"
    }
  ]


  return (

    <div className="min-h-screen text-white">


      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-3xl md:text-5xl font-bold leading-tight">

          Enterprise Analytics Dashboard

        </h1>

        <p className="text-slate-400 mt-3 text-sm md:text-lg">

          Real-time analytics, forecasting intelligence, and regional business insights

        </p>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {

          loading

            ? Array(4).fill(0).map(

                (_, index) => (

                  <div
                    key={index}
                    className="bg-slate-900 rounded-3xl p-6"
                  >

                    <Skeleton
                      height={120}
                      borderRadius={24}
                      baseColor="#1e293b"
                      highlightColor="#334155"
                    />

                  </div>
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
                    p-6

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


      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">


        {/* MONTHLY SALES */}

        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl">

          <div className="flex items-center gap-3 mb-6">

            <BarChart3 size={24} />

            <h2 className="text-xl md:text-2xl font-bold">

              Monthly Revenue Trend

            </h2>

          </div>

          {

            loading

              ? (

                <Skeleton
                  height={350}
                  borderRadius={20}
                  baseColor="#1e293b"
                  highlightColor="#334155"
                />

              )

              : (

                <ResponsiveContainer
                  width="100%"
                  height={350}
                >

                  <LineChart
                    data={monthlySales}
                  >

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
                      dataKey="sales"
                      stroke="#3b82f6"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>
              )
          }

        </div>


        {/* FORECAST */}

        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl">

          <div className="flex items-center gap-3 mb-6">

            <BrainCircuit size={24} />

            <h2 className="text-xl md:text-2xl font-bold">

              AI Forecast Prediction

            </h2>

          </div>

          {

            loading

              ? (

                <Skeleton
                  height={350}
                  borderRadius={20}
                  baseColor="#1e293b"
                  highlightColor="#334155"
                />

              )

              : (

                <ResponsiveContainer
                  width="100%"
                  height={350}
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
                      stroke="#10b981"
                      strokeWidth={4}
                    />

                  </LineChart>

                </ResponsiveContainer>
              )
          }

        </div>

      </div>


      {/* REGION ANALYTICS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">


        {/* REGION SALES */}

        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl">

          <div className="flex items-center gap-3 mb-6">

            <MapPinned size={24} />

            <h2 className="text-xl md:text-2xl font-bold">

              Region Sales Analytics

            </h2>

          </div>

          {

            loading

              ? (

                <Skeleton
                  height={350}
                  borderRadius={20}
                  baseColor="#1e293b"
                  highlightColor="#334155"
                />

              )

              : regionSales.length > 0

                ? (

                  <ResponsiveContainer
                    width="100%"
                    height={350}
                  >

                    <BarChart
                      data={regionSales}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#334155"
                      />

                      <XAxis
                        dataKey="region"
                        stroke="#94a3b8"
                      />

                      <YAxis stroke="#94a3b8" />

                      <Tooltip />

                      <Bar
                        dataKey="total_sales"
                        fill="#8b5cf6"
                      />

                    </BarChart>

                  </ResponsiveContainer>
                )

                : (

                  <div className="h-[350px] flex items-center justify-center text-slate-400">

                    Region analytics not available

                  </div>
                )
          }

        </div>


        {/* TOP REGIONS */}

        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl">

          <h2 className="text-2xl md:text-3xl font-bold mb-8">

            Top Performing Regions

          </h2>


          <div className="space-y-5">

            {

              loading

                ? Array(5).fill(0).map(

                    (_, index) => (

                      <Skeleton
                        key={index}
                        height={80}
                        borderRadius={20}
                        baseColor="#1e293b"
                        highlightColor="#334155"
                      />
                    )
                  )

                : topRegions.length > 0

                  ? (

                    topRegions.map((region) => (

                      <motion.div
                        key={region.region}

                        initial={{
                          opacity: 0,
                          y: 20
                        }}

                        animate={{
                          opacity: 1,
                          y: 0
                        }}

                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/60 border border-slate-700 rounded-2xl px-4 md:px-6 py-5"
                      >

                        <div>

                          <h3 className="text-lg md:text-xl font-semibold">

                            {region.region}

                          </h3>

                          <p className="text-slate-400 text-sm mt-1">

                            Regional Revenue

                          </p>

                        </div>

                        <div className="text-xl md:text-2xl font-bold text-purple-400">

                          ₹ {region.total_sales}

                        </div>

                      </motion.div>
                    ))
                  )

                  : (

                    <p className="text-slate-400">

                      No regional analytics available

                    </p>
                  )
            }

          </div>

        </div>

      </div>


      {/* TOP PRODUCTS */}

      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl">

        <div className="mb-8">

          <h2 className="text-2xl md:text-3xl font-bold">

            Top Performing Products

          </h2>

          <p className="text-slate-400 mt-2 text-sm md:text-base">

            Highest revenue generating products

          </p>

        </div>


        <div className="space-y-5">

          {

            loading

              ? Array(5).fill(0).map(

                  (_, index) => (

                    <Skeleton
                      key={index}
                      height={80}
                      borderRadius={20}
                      baseColor="#1e293b"
                      highlightColor="#334155"
                    />
                  )
                )

              : (

                summary?.top_products

                  ? Object.entries(
                      summary.top_products
                    ).map(

                      ([product, revenue]) => (

                        <motion.div
                          key={product}

                          initial={{
                            opacity: 0,
                            y: 20
                          }}

                          animate={{
                            opacity: 1,
                            y: 0
                          }}

                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/60 border border-slate-700 rounded-2xl px-4 md:px-6 py-5"
                        >

                          <div>

                            <h3 className="text-lg md:text-xl font-semibold break-words">

                              {product}

                            </h3>

                            <p className="text-slate-400 text-sm mt-1">

                              Revenue Generated

                            </p>

                          </div>

                          <div className="text-xl md:text-2xl font-bold text-green-400 break-all">

                            ₹ {revenue}

                          </div>

                        </motion.div>
                      )
                    )

                  : (

                    <p className="text-slate-400">

                      No product analytics available

                    </p>
                  )
              )
          }

        </div>

      </div>

    </div>
  )
}

export default Dashboard