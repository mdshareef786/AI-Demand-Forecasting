import { useEffect, useState } from "react"
import API from "../api/api"

function NotificationCenter() {

  const [preferences, setPreferences] =
    useState([])

  const [announcements, setAnnouncements] =
    useState([])

  const [history, setHistory] =
    useState([])

  const [roleNotifications, setRoleNotifications] =
    useState({})

  const [userId, setUserId] =
    useState("")

  const [emailNotifications, setEmailNotifications] =
    useState(true)

  const [forecastNotifications, setForecastNotifications] =
    useState(true)

  const [reportNotifications, setReportNotifications] =
    useState(true)

  const [organizationId, setOrganizationId] =
    useState("")

  const [title, setTitle] =
    useState("")

  const [message, setMessage] =
    useState("")

  useEffect(() => {

    loadData()

  }, [])

  const loadData = async () => {

    try {

      const prefResponse =
        await API.get(
          "/notification-center/preferences"
        )

      setPreferences(
        prefResponse.data
      )

      const annResponse =
        await API.get(
          "/notification-center/announcements"
        )

      setAnnouncements(
        annResponse.data
      )

      const historyResponse =
        await API.get(
          "/notification-center/history"
        )

      setHistory(
        historyResponse.data.history || []
      )

      const roleResponse =
        await API.get(
          "/notification-center/role-based"
        )

      setRoleNotifications(
        roleResponse.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  const createPreference =
    async () => {

      try {

        await API.post(

          "/notification-center/preferences/create",

          null,

          {
            params: {

              user_id:
                Number(userId),

              email_notifications:
                emailNotifications,

              forecast_notifications:
                forecastNotifications,

              report_notifications:
                reportNotifications
            }
          }
        )

        loadData()

      } catch (error) {

        console.log(error)
      }
    }

  const createAnnouncement =
    async () => {

      try {

        await API.post(

          "/notification-center/announcements/create",

          null,

          {
            params: {

              organization_id:
                Number(organizationId),

              title,

              message
            }
          }
        )

        setTitle("")
        setMessage("")

        loadData()

      } catch (error) {

        console.log(error)
      }
    }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Notification Center

      </h1>

      {/* Preferences */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold text-xl mb-4">

          Notification Preferences

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="User ID"
            value={userId}
            onChange={(e)=>
              setUserId(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <div className="space-y-2">

            <label className="block">

              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={()=>
                  setEmailNotifications(
                    !emailNotifications
                  )
                }
              />

              <span className="ml-2">

                Email Notifications

              </span>

            </label>

            <label className="block">

              <input
                type="checkbox"
                checked={forecastNotifications}
                onChange={()=>
                  setForecastNotifications(
                    !forecastNotifications
                  )
                }
              />

              <span className="ml-2">

                Forecast Notifications

              </span>

            </label>

            <label className="block">

              <input
                type="checkbox"
                checked={reportNotifications}
                onChange={()=>
                  setReportNotifications(
                    !reportNotifications
                  )
                }
              />

              <span className="ml-2">

                Report Notifications

              </span>

            </label>

          </div>

        </div>

        <button

          onClick={createPreference}

          className="
          mt-5
          bg-blue-600
          px-6 py-3
          rounded-xl
          "
        >

          Save Preferences

        </button>

      </div>

      {/* Announcements */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold text-xl mb-4">

          Organization Announcement

        </h2>

        <div className="grid gap-4">

          <input
            type="number"
            placeholder="Organization ID"
            value={organizationId}
            onChange={(e)=>
              setOrganizationId(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e)=>
              setTitle(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e)=>
              setMessage(
                e.target.value
              )
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

        </div>

        <button

          onClick={createAnnouncement}

          className="
          mt-5
          bg-green-600
          px-6 py-3
          rounded-xl
          "
        >

          Publish Announcement

        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Preferences</h3>

          <p className="text-3xl font-bold">

            {preferences.length}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Announcements</h3>

          <p className="text-3xl font-bold text-cyan-400">

            {announcements.length}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>History</h3>

          <p className="text-3xl font-bold text-green-400">

            {history.length}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3>Roles</h3>

          <p className="text-3xl font-bold text-yellow-400">

            {
              Object.keys(
                roleNotifications
              ).length
            }

          </p>

        </div>

      </div>

      {/* Notification History */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold text-xl mb-4">

          Notification History

        </h2>

        <div className="space-y-3">

          {

            history.map(

              (item, index) => (

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

              )

            )

          }

        </div>

      </div>

      {/* Role Based Notifications */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold text-xl mb-4">

          Role-Based Notifications

        </h2>

        <pre className="bg-slate-800 p-4 rounded-xl overflow-auto">

          {

            JSON.stringify(

              roleNotifications,

              null,

              2

            )

          }

        </pre>

      </div>

    </div>

  )
}

export default NotificationCenter