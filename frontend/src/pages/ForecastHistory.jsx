import { useEffect, useState } from "react"
import API from "../api/api"

function ForecastHistory() {

  const [history, setHistory] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    loadHistory()

  }, [])

  const loadHistory = async () => {

    try {

      const response =
        await API.get(
          "/forecast/history"
        )

      setHistory(
        response.data
      )

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Forecast History

      </h1>

      <div className="bg-slate-900 rounded-3xl p-6 overflow-x-auto">

        {

          loading

          ?

          (

            <p>

              Loading forecast history...

            </p>

          )

          :

          (

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-700">

                  <th className="text-left py-3">

                    Model

                  </th>

                  <th className="text-left py-3">

                    Months
                  </th>

                  <th className="text-left py-3">

                    Accuracy
                  </th>

                  <th className="text-left py-3">

                    MAPE
                  </th>

                  <th className="text-left py-3">

                    MAE
                  </th>

                  <th className="text-left py-3">

                    RMSE
                  </th>

                  <th className="text-left py-3">

                    Time
                  </th>

                  <th className="text-left py-3">

                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  history.map(

                    (item) => (

                      <tr

                        key={item.id}

                        className="
                        border-b
                        border-slate-800
                        "

                      >

                        <td className="py-3">

                          {item.model_used}

                        </td>

                        <td className="py-3">

                          {item.forecast_months}

                        </td>

                        <td className="py-3 text-green-400">

                          {

                            item.prediction_accuracy

                          }%

                        </td>

                        <td className="py-3">

                          {item.mape}

                        </td>

                        <td className="py-3">

                          {item.mae}

                        </td>

                        <td className="py-3">

                          {item.rmse}

                        </td>

                        <td className="py-3">

                          {

                            item.execution_time

                          } sec

                        </td>

                        <td className="py-3">

                          <span

                            className="
                            px-3
                            py-1
                            rounded-full
                            bg-green-600
                            text-white
                            text-xs
                            "
                          >

                            {item.status}

                          </span>

                        </td>

                      </tr>

                    )
                  )

                }

              </tbody>

            </table>

          )

        }

      </div>

    </div>

  )
}

export default ForecastHistory