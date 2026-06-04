import { useEffect, useState } from "react"
import API from "../api/api"

function ExecutiveDashboard() {

  const [dashboard, setDashboard] =
    useState({})

  const [kpis, setKpis] =
    useState({})

  const [costAnalysis, setCostAnalysis] =
    useState({})

  useEffect(() => {

    loadExecutiveDashboard()

  }, [])

  const loadExecutiveDashboard = async () => {

    try {

      const dashboardRes =
        await API.get(
          "/executive/dashboard"
        )

      const kpiRes =
        await API.get(
          "/executive/kpis"
        )

      const costRes =
        await API.get(
          "/executive/cost-analysis"
        )

      setDashboard(
        dashboardRes.data
      )

      setKpis(
        kpiRes.data
      )

      setCostAnalysis(
        costRes.data
      )

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Executive Dashboard

      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p className="text-slate-400">

            Revenue Forecast

          </p>

          <h2 className="text-3xl font-bold mt-3 text-green-400">

            ₹ {dashboard.revenue_forecast}

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p className="text-slate-400">

            Profit Forecast

          </p>

          <h2 className="text-3xl font-bold mt-3 text-blue-400">

            ₹ {dashboard.profit_forecast}

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p className="text-slate-400">

            Estimated Cost

          </p>

          <h2 className="text-3xl font-bold mt-3 text-orange-400">

            ₹ {dashboard.estimated_cost}

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p className="text-slate-400">

            Growth Rate

          </p>

          <h2 className="text-3xl font-bold mt-3 text-purple-400">

            {dashboard.growth_rate}

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p className="text-slate-400">

            Business Health

          </p>

          <h2 className="text-3xl font-bold mt-3 text-cyan-400">

            {dashboard.business_health}

          </h2>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="text-xl font-bold mb-5">

            Business KPIs

          </h2>

          <div className="space-y-4">

            <div>

              Revenue Growth:

              <span className="ml-2 text-green-400">

                {kpis.revenue_growth}

              </span>

            </div>

            <div>

              Profit Margin:

              <span className="ml-2 text-blue-400">

                {kpis.profit_margin}

              </span>

            </div>

            <div>

              Forecast Accuracy:

              <span className="ml-2 text-purple-400">

                {kpis.forecast_accuracy}

              </span>

            </div>

            <div>

              Inventory Health:

              <span className="ml-2 text-cyan-400">

                {kpis.inventory_health}

              </span>

            </div>

          </div>

        </div>

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="text-xl font-bold mb-5">

            Cost Analysis

          </h2>

          <div className="space-y-4">

            <div>

              Operational Cost:

              <span className="ml-2 text-orange-400">

                ₹ {costAnalysis.operational_cost}

              </span>

            </div>

            <div>

              Inventory Cost:

              <span className="ml-2 text-orange-400">

                ₹ {costAnalysis.inventory_cost}

              </span>

            </div>

            <div>

              Marketing Cost:

              <span className="ml-2 text-orange-400">

                ₹ {costAnalysis.marketing_cost}

              </span>

            </div>

            <div>

              Other Cost:

              <span className="ml-2 text-orange-400">

                ₹ {costAnalysis.other_cost}

              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default ExecutiveDashboard