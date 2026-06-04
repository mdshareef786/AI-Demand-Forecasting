import { useEffect, useState } from "react"
import API from "../api/api"

function AIInsights() {

  const [insights, setInsights] =
    useState([])

  const [recommendations, setRecommendations] =
    useState([])

  const [demand, setDemand] =
    useState({})

  const [behavior, setBehavior] =
    useState({})

  const [spike, setSpike] =
    useState({})

  const [stock, setStock] =
    useState({})

  const [inventory, setInventory] =
    useState({})

  useEffect(() => {

    loadInsights()

  }, [])

  const loadInsights = async () => {

    try {

      const generateRes =
        await API.get(
          "/insights/generate"
        )

      const demandRes =
        await API.get(
          "/insights/recommendation"
        )

      const behaviorRes =
        await API.get(
          "/insights/customer-behavior"
        )

      const spikeRes =
        await API.get(
          "/insights/demand-spike"
        )

      const stockRes =
        await API.get(
          "/insights/low-stock"
        )

      const inventoryRes =
        await API.get(
          "/insights/inventory-ai"
        )

      setInsights(
        generateRes.data.insights || []
      )

      setRecommendations(
        generateRes.data.recommendations || []
      )

      setDemand(
        demandRes.data
      )

      setBehavior(
        behaviorRes.data
      )

      setSpike(
        spikeRes.data
      )

      setStock(
        stockRes.data
      )

      setInventory(
        inventoryRes.data
      )

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        AI Insights Engine

      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Demand Recommendation</p>

          <h2 className="text-green-400 font-bold mt-2">

            {
              JSON.stringify(
                demand
              )
            }

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Customer Behavior</p>

          <h2 className="text-blue-400 font-bold mt-2">

            {
              JSON.stringify(
                behavior
              )
            }

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Demand Spike</p>

          <h2 className="text-orange-400 font-bold mt-2">

            {
              JSON.stringify(
                spike
              )
            }

          </h2>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <p>Low Stock Alert</p>

          <h2 className="text-red-400 font-bold mt-2">

            {
              JSON.stringify(
                stock
              )
            }

          </h2>

        </div>

      </div>

      <div className="grid xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="font-bold mb-4">

            AI Insights

          </h2>

          <div className="space-y-3">

            {

              insights.map(

                (item, index)=>(

                  <div

                    key={index}

                    className="
                    bg-slate-800
                    p-3
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

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="font-bold mb-4">

            Business Recommendations

          </h2>

          <div className="space-y-3">

            {

              recommendations.map(

                (item, index)=>(

                  <div

                    key={index}

                    className="
                    bg-slate-800
                    p-3
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

      </div>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          AI Inventory Optimization

        </h2>

        <pre className="text-green-400">

          {

            JSON.stringify(

              inventory,

              null,

              2

            )

          }

        </pre>

      </div>

    </div>

  )
}

export default AIInsights