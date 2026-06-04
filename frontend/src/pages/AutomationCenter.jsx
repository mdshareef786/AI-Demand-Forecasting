import { useEffect, useState } from "react"
import API from "../api/api"

function AutomationCenter() {

  const [schedules, setSchedules] =
    useState([])

  const [scheduleName, setScheduleName] =
    useState("")

  const [intervalType, setIntervalType] =
    useState("daily")

  const [futureMonths, setFutureMonths] =
    useState(6)

  const [modelName, setModelName] =
    useState("prophet")

  useEffect(() => {

    loadSchedules()

  }, [])

  const loadSchedules = async () => {

    try {

      const token =
        localStorage.getItem("token")

      const response =
        await API.get(
          "/automation/schedules",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      setSchedules(
        response.data
      )

    } catch (error) {

      console.log(error)

    }
  }

  const createSchedule = async () => {

    try {

      const token =
        localStorage.getItem("token")

      await API.post(

        "/automation/create-schedule",

        null,

        {
          params: {

            schedule_name:
              scheduleName,

            interval_type:
              intervalType,

            future_months:
              futureMonths,

            model_name:
              modelName
          },

          headers: {

            Authorization:
            `Bearer ${token}`
          }
        }
      )

      setScheduleName("")

      loadSchedules()

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Smart Automation Center

      </h1>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Create Forecast Schedule

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input

            type="text"

            placeholder="Schedule Name"

            value={scheduleName}

            onChange={(e)=>

              setScheduleName(
                e.target.value
              )
            }

            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

          <select

            value={intervalType}

            onChange={(e)=>

              setIntervalType(
                e.target.value
              )
            }

            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          >

            <option value="daily">
              Daily
            </option>

            <option value="weekly">
              Weekly
            </option>

            <option value="monthly">
              Monthly
            </option>

          </select>

          <select

            value={modelName}

            onChange={(e)=>

              setModelName(
                e.target.value
              )
            }

            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          >

            <option value="prophet">
              Prophet
            </option>

            <option value="linear">
              Linear Regression
            </option>

            <option value="ensemble">
              Ensemble
            </option>

          </select>

          <input

            type="number"

            min="1"

            max="24"

            value={futureMonths}

            onChange={(e)=>

              setFutureMonths(
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

          onClick={createSchedule}

          className="
          mt-4
          bg-blue-600
          px-6
          py-3
          rounded-xl
          "
        >

          Create Schedule

        </button>

      </div>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Scheduled Forecast Jobs

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left">

                <th>Name</th>

                <th>Interval</th>

                <th>Model</th>

                <th>Months</th>

                <th>Alert</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {

                schedules.map(

                  (item) => (

                    <tr

                      key={item.id}

                      className="
                      border-t
                      border-slate-800
                      "
                    >

                      <td className="py-3">

                        {item.schedule_name}

                      </td>

                      <td>

                        {item.interval_type}

                      </td>

                      <td>

                        {item.model_name}

                      </td>

                      <td>

                        {item.future_months}

                      </td>

                      <td>

                        {

                          item.auto_alert

                          ?

                          "Enabled"

                          :

                          "Disabled"

                        }

                      </td>

                      <td>

                        <span

                          className={

                            item.is_active

                            ?

                            "text-green-400"

                            :

                            "text-red-400"
                          }

                        >

                          {

                            item.is_active

                            ?

                            "Active"

                            :

                            "Inactive"
                          }

                        </span>

                      </td>

                    </tr>

                  )
                )

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )
}

export default AutomationCenter