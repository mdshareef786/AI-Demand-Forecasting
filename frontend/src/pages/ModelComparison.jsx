import { useEffect, useState } from "react"
import API from "../api/api"

function ModelComparison() {

  const [comparison, setComparison] =
    useState([])

  const [bestModel, setBestModel] =
    useState("")

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    loadComparison()

  }, [])

  const loadComparison = async () => {

    try {

      const response =
        await API.get(
          "/forecast/compare-models"
        )

      setComparison(
        response.data.comparison
      )

      setBestModel(
        response.data.best_model
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

        Model Comparison Center

      </h1>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold">

          Best Forecast Model

        </h2>

        <div className="mt-4">

          <span
            className="
            bg-green-600
            px-4
            py-2
            rounded-xl
            font-bold
            "
          >
            🏆 {bestModel}
          </span>

        </div>

      </div>

      <div className="bg-slate-900 rounded-3xl p-6 overflow-x-auto">

        {

          loading

          ?

          (

            <p>

              Loading comparison...

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

                    MAPE

                  </th>

                  <th className="text-left py-3">

                    MAE

                  </th>

                  <th className="text-left py-3">

                    RMSE

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  comparison.map(

                    (model, index)=>(

                      <tr

                        key={index}

                        className="
                        border-b
                        border-slate-800
                        "

                      >

                        <td className="py-4">

                          {

                            model.model
                          }

                        </td>

                        <td className="py-4 text-green-400">

                          {

                            model.mape
                          }

                        </td>

                        <td className="py-4">

                          {

                            model.mae
                          }

                        </td>

                        <td className="py-4">

                          {

                            model.rmse
                          }

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

export default ModelComparison