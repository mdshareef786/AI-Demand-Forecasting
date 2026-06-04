import { useEffect, useState } from "react"
import API from "../api/api"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts"

function AdvancedAnalytics() {

  const [summary, setSummary] =
    useState({})

  const [kpis, setKpis] =
    useState({})

  const [revenue, setRevenue] =
    useState({})

  const [inventory, setInventory] =
    useState({})

  const [categorySales, setCategorySales] =
    useState([])

  const [regionSales, setRegionSales] =
    useState([])

  useEffect(() => {

    loadAnalytics()

  }, [])

  const loadAnalytics = async () => {

    try {

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

      const kpiRes =
        await API.get(
          "/analytics/kpis",
          { headers }
        )

      const categoryRes =
        await API.get(
          "/analytics/category-sales",
          { headers }
        )

      const regionRes =
        await API.get(
          "/analytics/region-sales",
          { headers }
        )

      const revenueRes =
        await API.get(
          "/revenue/prediction"
        )

      const inventoryRes =
        await API.get(
          "/inventory/risk-analysis",
          { headers }
        )

      setSummary(
        summaryRes.data
      )

      setKpis(
        kpiRes.data
      )

      setCategorySales(
        categoryRes.data
          .category_sales || []
      )

      setRegionSales(
        regionRes.data
          .region_sales || []
      )

      setRevenue(
        revenueRes.data
      )

      setInventory(
        inventoryRes.data
      )

    } catch (error) {

      console.log(error)

    }
  }

  const riskData = [

    {
        name: "High Risk",
        value: inventory.high_risk || 0,
        color: "#ef4444"
    },

    {
        name: "Medium Risk",
        value: inventory.medium_risk || 0,
        color: "#f59e0b"
    },

    {
        name: "Low Risk",
        value: inventory.low_risk || 0,
        color: "#22c55e"
    }

  ]

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Advanced Analytics Center

      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Total Sales</p>

          <h2 className="text-3xl font-bold text-green-400">

            ₹ {kpis.total_sales}
          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Average Sales</p>

          <h2 className="text-3xl font-bold text-blue-400">

            ₹ {kpis.average_sales}
          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Highest Sale</p>

          <h2 className="text-3xl font-bold text-purple-400">

            ₹ {kpis.highest_sale}
          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Revenue Growth</p>

          <h2 className="text-3xl font-bold text-orange-400">

            {revenue.growth_percentage}%
          </h2>

        </div>

      </div>

      <div className="grid xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="mb-4">

            Category Analytics

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={categorySales}
            >

              <XAxis
                dataKey="category"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="total_sales"
                fill="#3b82f6"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="mb-4">

            Region Analytics

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={regionSales}
            >

              <XAxis
                dataKey="region"
              />

              <YAxis />

              <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    color: "#fff"
                }}
              />

              <Bar
                dataKey="total_sales"
                fill="#10b981"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="grid xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="mb-4">

            Revenue Prediction

          </h2>

          <div className="space-y-4">

            <div>

              Current Revenue:

              ₹ {revenue.current_revenue}

            </div>

            <div>

              Predicted Revenue:

              ₹ {revenue.predicted_revenue}

            </div>

            <div>

              Growth:

              {revenue.growth_percentage}%

            </div>

          </div>

        </div>

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="mb-4">

            Inventory Risk

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie

                data={riskData}

                dataKey="value"

                nameKey="name"

              >

                {riskData.map(

                  (entry, index) => (

                    <Cell
                        key={index}
                        fill={entry.color}
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  )
}

export default AdvancedAnalytics