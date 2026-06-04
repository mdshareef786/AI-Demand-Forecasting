import { useEffect, useState } from "react"
import API from "../api/api"

function RealtimeMonitor() {

  const [sales, setSales] =
    useState({})

  const [background, setBackground] =
    useState({})

  const [audit, setAudit] =
    useState({})

  useEffect(() => {

    loadRealtime()

    const interval = setInterval(
      loadRealtime,
      5000
    )

    return () =>
      clearInterval(interval)

  }, [])

  const loadRealtime = async () => {

    try {

      const token =
        localStorage.getItem("token")

      const headers = {

        Authorization:
          `Bearer ${token}`
      }

      const salesRes =
        await API.get(
          "/realtime/sales-monitor"
        )

      const backgroundRes =
        await API.get(
          "/background/run"
        )

      const auditRes =
        await API.get(
          "/audit/admin-action",
          { headers }
        )

      setSales(
        salesRes.data
      )

      setBackground(
        backgroundRes.data
      )

      setAudit(
        auditRes.data
      )

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Real-Time Monitor

      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Current Sales</p>

          <h2 className="text-3xl font-bold text-green-400">

            ₹ {sales.current_sales}

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Active Users</p>

          <h2 className="text-3xl font-bold text-blue-400">

            {sales.active_users}

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Forecast Refresh</p>

          <h2 className="text-3xl font-bold text-orange-400">

            {

              sales.forecast_refresh

              ?

              "Active"

              :

              "Inactive"

            }

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>System Status</p>

          <h2 className="text-3xl font-bold text-green-400">

            Live

          </h2>

        </div>

      </div>

      <div className="grid xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="font-bold mb-4">

            Live Monitoring

          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Timestamp</span>

              <span>

                {sales.timestamp}

              </span>

            </div>

            <div className="flex justify-between">

              <span>Status</span>

              <span className="text-green-400">

                {sales.status}

              </span>

            </div>

          </div>

        </div>

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="font-bold mb-4">

            Background Jobs

          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Task Status</span>

              <span className="text-blue-400">

                {

                  background.message

                }

              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Audit Activity

        </h2>

        <pre className="text-green-400">

          {

            JSON.stringify(

              audit,

              null,

              2

            )

          }

        </pre>

      </div>

    </div>

  )
}

export default RealtimeMonitor