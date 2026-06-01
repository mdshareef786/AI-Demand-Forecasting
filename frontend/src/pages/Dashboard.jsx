import { useEffect, useState } from "react"
import API from "../api/api"

import GlobalSearch from "../components/GlobalSearch"
import ForecastFilter from "../components/ForecastFilter"
import KpiCard from "../components/KpiCard"

import {
  IndianRupee,
  Database,
  TrendingUp,
  BrainCircuit
} from "lucide-react"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from "recharts"

function Dashboard() {

  const [summary, setSummary] = useState({})
  const [kpis, setKpis] = useState({})

  const [monthlySales, setMonthlySales] = useState([])
  const [forecast, setForecast] = useState([])
  const [regionSales, setRegionSales] = useState([])
  const [categorySales, setCategorySales] = useState([])

  const [selectedRegion, setSelectedRegion] =
    useState("All Regions")

  const [showForecast, setShowForecast] =
    useState(true)

  const [showRegion, setShowRegion] =
    useState(true)

  const [showCategory, setShowCategory] =
    useState(true)

  useEffect(() => {

    loadDashboard()

  }, [])

  const loadDashboard = async () => {

    const token =
      localStorage.getItem("token")

    const headers = {

      Authorization:
        `Bearer ${token}`
    }

    const summaryRes =
      await API.get(
        "/analytics/summary",
        { headers }
      )

    setSummary(summaryRes.data)

    const kpiRes =
      await API.get(
        "/analytics/kpis",
        { headers }
      )

    setKpis(kpiRes.data)

    const salesRes =
      await API.get(
        "/analytics/monthly-sales",
        { headers }
      )

    setMonthlySales(
      salesRes.data.monthly_sales || []
    )

    const forecastRes =
      await API.get(
        "/forecast/predict?future_months=6",
        { headers }
      )

    setForecast(
      forecastRes.data.forecast || []
    )

    const regionRes =
      await API.get(
        "/analytics/region-sales",
        { headers }
      )

    setRegionSales(
      regionRes.data.region_sales || []
    )

    const categoryRes =
      await API.get(
        "/analytics/category-sales",
        { headers }
      )

    setCategorySales(
      categoryRes.data.category_sales || []
    )
  }

  const downloadSummary = async () => {

    try {

      const token =
        localStorage.getItem("token")

      const res =
        await API.get(
          "/export/summary",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      alert(
        JSON.stringify(
          res.data,
          null,
          2
        )
      )

    } catch {

      alert(
        "Unable to download summary"
      )
    }
  }

  const filteredRegions =

    selectedRegion === "All Regions"

      ? regionSales

      : regionSales.filter(

        item =>

          item.region === selectedRegion
      )

  const cards = [

    {
      title: "Total Revenue",
      value: `₹ ${kpis.total_sales || 0}`,
      icon: <IndianRupee size={20} />,
      gradient: "from-blue-500 to-cyan-500"
    },

    {
      title: "Dataset Records",
      value: summary.total_rows || 0,
      icon: <Database size={20} />,
      gradient: "from-pink-500 to-purple-500"
    },

    {
      title: "Best Performing Product",
      value:
        summary.top_products
          ?
          Object.keys(
            summary.top_products
          )[0]
          :
          "N/A",

      icon: <TrendingUp size={20} />,
      gradient: "from-green-500 to-emerald-500"
    },

    {
      title: "Peak Sales Value",
      value: `₹ ${kpis.highest_sale || 0}`,
      icon: <BrainCircuit size={20} />,
      gradient: "from-orange-500 to-yellow-500"
    }

  ]

  return (

    <div className="space-y-8 text-white">

      <GlobalSearch />

      <ForecastFilter
        onFilter={(m, r) => {
          setSelectedRegion(r)
        }}
      />

      <div className="flex flex-wrap gap-3">

        <button
          onClick={() =>
            setShowForecast(
              !showForecast
            )
          }
          className="bg-blue-600 px-4 py-2 rounded-xl"
        >
          Demand Forecasting
        </button>

        <button
          onClick={() =>
            setShowRegion(
              !showRegion
            )
          }
          className="bg-purple-600 px-4 py-2 rounded-xl"
        >
          Regional Intelligence
        </button>

        <button
          onClick={() =>
            setShowCategory(
              !showCategory
            )
          }
          className="bg-green-600 px-4 py-2 rounded-xl"
        >
          Category Insights
        </button>

        <button
          onClick={downloadSummary}
          className="bg-orange-600 px-4 py-2 rounded-xl"
        >
          Executive Report
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {
          cards.map((card, index) => (

            <KpiCard

              key={index}

              title={card.title}

              value={card.value}

              icon={card.icon}

              gradient={card.gradient}

            />

          ))
        }

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="mb-4">

            Monthly Revenue

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart
              data={monthlySales}
            >

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                dataKey="sales"
                stroke="#3b82f6"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {
          showForecast && (

            <div className="bg-slate-900 p-6 rounded-3xl">

              <h2 className="mb-4">

                Forecast

              </h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <LineChart
                  data={forecast}
                >

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    dataKey="predicted_revenue"
                    stroke="#10b981"
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          )
        }

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {
          showRegion && (

            <div className="bg-slate-900 p-6 rounded-3xl">

              <h2 className="mb-4">

                Region Analytics

              </h2>

              <ResponsiveContainer
                width="100%"
                height={350}
              >

                <BarChart
                  data={filteredRegions}
                >

                  <XAxis dataKey="region" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="total_sales"
                    fill="#8b5cf6"
                    onClick={(data) => {

                      alert(
                        `${data.region}
Sales: ${data.total_sales}`
                      )

                    }}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          )
        }

        {
          showCategory && (

            <div className="bg-slate-900 p-6 rounded-3xl">

              <h2 className="mb-4">

                Category Analytics

              </h2>

              <ResponsiveContainer
                width="100%"
                height={350}
              >

                <BarChart
                  data={categorySales}
                >

                  <XAxis dataKey="category" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="total_sales"
                    fill="#22c55e"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          )
        }

      </div>

    </div>

  )
}

export default Dashboard