import { useEffect, useState } from "react"

import API from "../api/api"

import { motion } from "framer-motion"

import {
  Users,
  Database,
  BrainCircuit,
  FileText,
  Shield,
  Trash2,
  UserX,
  UserCheck,
  Activity
} from "lucide-react"


function AdminDashboard() {

  const [summary, setSummary] =
    useState({})

  const [users, setUsers] =
    useState([])

  const [datasets, setDatasets] =
    useState([])

  const [reports, setReports] =
    useState([])

  const [activities, setActivities] =
    useState([])

  const [loading, setLoading] =
    useState(false)


  useEffect(() => {

    fetchAdminData()

  }, [])


  // ==================================
  // FETCH ADMIN DATA
  // ==================================

  const fetchAdminData = async () => {

    try {

      setLoading(true)

      const token =
        localStorage.getItem("token")

      const headers = {

        Authorization: `Bearer ${token}`
      }

      const summaryResponse = await API.get(

        "/admin/dashboard-summary",

        { headers }
      )

      const usersResponse = await API.get(

        "/admin/users",

        { headers }
      )

      const datasetsResponse = await API.get(

        "/admin/datasets",

        { headers }
      )

      const reportsResponse = await API.get(

        "/admin/reports",

        { headers }
      )

      const activityResponse = await API.get(

        "/admin/forecast-activities",

        { headers }
      )

      setSummary(
        summaryResponse.data
      )

      setUsers(
        usersResponse.data.users
      )

      setDatasets(
        datasetsResponse.data.datasets
      )

      setReports(
        reportsResponse.data.reports
      )

      setActivities(
        activityResponse.data.forecast_activities
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
  // DISABLE USER
  // ==================================

  const disableUser = async (id) => {

    try {

      const token =
        localStorage.getItem("token")

      await API.put(

        `/admin/disable-user/${id}`,

        {},

        {

          headers: {

            Authorization: `Bearer ${token}`
          }
        }
      )

      fetchAdminData()

    }

    catch (error) {

      console.log(error)
    }
  }


  // ==================================
  // ENABLE USER
  // ==================================

  const enableUser = async (id) => {

    try {

      const token =
        localStorage.getItem("token")

      await API.put(

        `/admin/enable-user/${id}`,

        {},

        {

          headers: {

            Authorization: `Bearer ${token}`
          }
        }
      )

      fetchAdminData()

    }

    catch (error) {

      console.log(error)
    }
  }


  // ==================================
  // DELETE USER
  // ==================================

  const deleteUser = async (id) => {

    try {

      const token =
        localStorage.getItem("token")

      await API.delete(

        `/admin/delete-user/${id}`,

        {

          headers: {

            Authorization: `Bearer ${token}`
          }
        }
      )

      fetchAdminData()

    }

    catch (error) {

      console.log(error)
    }
  }


  // ==================================
  // ANALYTICS CARDS
  // ==================================

  const cards = [

    {
      title: "Total Users",

      value: summary.total_users || 0,

      icon: <Users size={24} />,

      gradient:
        "from-blue-500 to-cyan-500"
    },

    {
      title: "Datasets",

      value: summary.total_datasets || 0,

      icon: <Database size={24} />,

      gradient:
        "from-purple-500 to-pink-500"
    },

    {
      title: "Forecasts",

      value: summary.total_forecasts || 0,

      icon: <BrainCircuit size={24} />,

      gradient:
        "from-green-500 to-emerald-500"
    },

    {
      title: "Reports",

      value: summary.total_reports || 0,

      icon: <FileText size={24} />,

      gradient:
        "from-orange-500 to-yellow-500"
    }
  ]


  return (

    <div className="min-h-screen text-white">


      {/* HEADER */}

      <div className="mb-10">

        <div className="flex items-center gap-4 mb-4">

          <Shield
            size={42}
            className="text-red-400"
          />

          <h1 className="text-3xl md:text-5xl font-bold">

            Admin Dashboard

          </h1>

        </div>

        <p className="text-slate-400 text-sm md:text-lg">

          Enterprise administration and system monitoring panel

        </p>

      </div>


      {/* ANALYTICS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {

          cards.map((card, index) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 20
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

                  <h2 className="text-3xl font-bold mt-3">

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


      {/* USERS TABLE */}

      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl mb-10 overflow-x-auto">

        <h2 className="text-2xl md:text-3xl font-bold mb-8">

          User Management

        </h2>


        <table className="w-full min-w-[900px]">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-5">

                Name

              </th>

              <th className="text-left py-5">

                Email

              </th>

              <th className="text-left py-5">

                Role

              </th>

              <th className="text-left py-5">

                Status

              </th>

              <th className="text-left py-5">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {

              users.map((user) => (

                <tr
                  key={user.id}
                  className="border-b border-slate-800"
                >

                  <td className="py-5">

                    {user.name}

                  </td>

                  <td className="py-5">

                    {user.email}

                  </td>

                  <td className="py-5">

                    <span className="bg-blue-500/20 text-blue-400 px-3 py-2 rounded-full text-sm">

                      {user.role}

                    </span>

                  </td>

                  <td className="py-5">

                    {

                      user.is_active

                        ? (

                          <span className="bg-green-500/20 text-green-400 px-3 py-2 rounded-full text-sm">

                            Active

                          </span>
                        )

                        : (

                          <span className="bg-red-500/20 text-red-400 px-3 py-2 rounded-full text-sm">

                            Disabled

                          </span>
                        )
                    }

                  </td>

                  <td className="py-5">

                    <div className="flex gap-3">

                      {

                        user.is_active

                          ? (

                            <button

                              onClick={() =>
                                disableUser(user.id)
                              }

                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-xl transition"
                            >

                              <UserX size={18} />

                            </button>
                          )

                          : (

                            <button

                              onClick={() =>
                                enableUser(user.id)
                              }

                              className="bg-green-500/20 hover:bg-green-500/30 text-green-400 p-3 rounded-xl transition"
                            >

                              <UserCheck size={18} />

                            </button>
                          )
                      }

                      <button

                        onClick={() =>
                          deleteUser(user.id)
                        }

                        className="bg-slate-700 hover:bg-slate-600 p-3 rounded-xl transition"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>


      {/* DATASETS */}

      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl mb-10 overflow-x-auto">

        <h2 className="text-2xl md:text-3xl font-bold mb-8">

          Dataset Monitoring

        </h2>


        <table className="w-full min-w-[700px]">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-5">

                Filename

              </th>

              <th className="text-left py-5">

                Uploaded By

              </th>

              <th className="text-left py-5">

                Created At

              </th>

            </tr>

          </thead>

          <tbody>

            {

              datasets.map((dataset) => (

                <tr
                  key={dataset.id}
                  className="border-b border-slate-800"
                >

                  <td className="py-5">

                    {dataset.filename}

                  </td>

                  <td className="py-5">

                    User #{dataset.uploaded_by}

                  </td>

                  <td className="py-5">

                    {

                      new Date(
                        dataset.created_at
                      ).toLocaleString()
                    }

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>


      {/* REPORTS */}

      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl mb-10 overflow-x-auto">

        <h2 className="text-2xl md:text-3xl font-bold mb-8">

          Reports Monitoring

        </h2>


        <table className="w-full min-w-[700px]">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-5">

                Report Name

              </th>

              <th className="text-left py-5">

                Type

              </th>

              <th className="text-left py-5">

                Created At

              </th>

            </tr>

          </thead>

          <tbody>

            {

              reports.map((report) => (

                <tr
                  key={report.id}
                  className="border-b border-slate-800"
                >

                  <td className="py-5">

                    {report.report_name}

                  </td>

                  <td className="py-5">

                    {report.report_type}

                  </td>

                  <td className="py-5">

                    {

                      new Date(
                        report.created_at
                      ).toLocaleString()
                    }

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>


      {/* FORECAST ACTIVITIES */}

      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl overflow-x-auto">

        <div className="flex items-center gap-3 mb-8">

          <Activity size={28} />

          <h2 className="text-2xl md:text-3xl font-bold">

            Forecast Activities

          </h2>

        </div>


        <table className="w-full min-w-[900px]">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-5">

                User

              </th>

              <th className="text-left py-5">

                Model

              </th>

              <th className="text-left py-5">

                MAPE

              </th>

              <th className="text-left py-5">

                MAE

              </th>

              <th className="text-left py-5">

                RMSE

              </th>

              <th className="text-left py-5">

                Date

              </th>

            </tr>

          </thead>

          <tbody>

            {

              activities.map((activity, index) => (

                <tr
                  key={index}
                  className="border-b border-slate-800"
                >

                  <td className="py-5">

                    User #{activity.user_id}

                  </td>

                  <td className="py-5">

                    {activity.model_used}

                  </td>

                  <td className="py-5 text-cyan-400 font-bold">

                    {activity.mape}

                  </td>

                  <td className="py-5">

                    {activity.mae}

                  </td>

                  <td className="py-5">

                    {activity.rmse}

                  </td>

                  <td className="py-5">

                    {

                      new Date(
                        activity.created_at
                      ).toLocaleString()
                    }

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default AdminDashboard