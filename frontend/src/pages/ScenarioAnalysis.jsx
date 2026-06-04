import { useEffect, useState } from "react"
import API from "../api/api"

function ScenarioAnalysis() {

  const [baseSales, setBaseSales] =
    useState("100000")

  const [growthRate, setGrowthRate] =
    useState("10")

  const [seasonalityFactor, setSeasonalityFactor] =
    useState("1.2")

  const [demandMultiplier, setDemandMultiplier] =
    useState("1.1")

  const [promotionImpact, setPromotionImpact] =
    useState("5000")

  const [forecastResult, setForecastResult] =
    useState(null)

  const [savedScenarios, setSavedScenarios] =
    useState([])

  useEffect(() => {

    loadScenarios()

  }, [])

  const loadScenarios = async () => {

    try {

      const response =
        await API.get(
          "/scenario/list"
        )

      setSavedScenarios(
        response.data
      )

    } catch (error) {

      console.log(error)

    }
  }

  const reuseScenario = (

    scenario

  ) => {

    setGrowthRate(
      scenario.growth_rate
    )

    setSeasonalityFactor(
      scenario.seasonality_factor
    )

    setDemandMultiplier(
      scenario.demand_multiplier
    )

    setPromotionImpact(
      scenario.promotion_impact
    )
  }

  const runScenario = async () => {

    try {

      const response =
        await API.post(

          "/scenario/run",

          null,

          {
            params: {

              scenario_id: 1,

              base_sales:
                Number(baseSales),

              growth_rate:
                Number(growthRate),

              seasonality_factor:
                Number(seasonalityFactor),

              demand_multiplier:
                Number(demandMultiplier),

              promotion_impact:
                Number(promotionImpact)
            }
          }
        )

      setForecastResult(

        response.data.forecast_result

      )

    } catch (error) {

      console.log(error)

      alert(
        "Scenario execution failed"
      )
    }
  }

  return (

    <div className="space-y-6">

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h1 className="text-2xl font-bold mb-6">

          What-If Scenario Analysis

        </h1>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="Base Sales"
            value={baseSales}
            onChange={(e)=>
              setBaseSales(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Growth Rate"
            value={growthRate}
            onChange={(e)=>
              setGrowthRate(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Seasonality Factor"
            value={seasonalityFactor}
            onChange={(e)=>
              setSeasonalityFactor(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Demand Multiplier"
            value={demandMultiplier}
            onChange={(e)=>
              setDemandMultiplier(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Promotion Impact"
            value={promotionImpact}
            onChange={(e)=>
              setPromotionImpact(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

        </div>

        <button

          onClick={runScenario}

          className="
          mt-6
          bg-blue-600
          px-6
          py-3
          rounded-xl
          "

        >

          Run Scenario

        </button>

      </div>

      {

        forecastResult && (

          <div

            className="
            bg-slate-900
            p-6
            rounded-3xl
            "

          >

            <h2 className="text-xl font-bold">

              Forecast Result

            </h2>

            <p className="text-4xl font-bold text-green-400 mt-4">

              ₹ {forecastResult}

            </p>

          </div>

        )

      }

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Saved Scenarios

        </h2>

        <div className="space-y-3">

          {

            savedScenarios.map(

              (scenario)=>(

                <div

                  key={scenario.id}

                  className="
                  bg-slate-800
                  p-4
                  rounded-xl
                  flex
                  justify-between
                  items-center
                  "

                >

                  <div>

                    <h3 className="font-semibold">

                      {

                        scenario.scenario_name

                      }

                    </h3>

                    <p className="text-sm text-slate-400">

                      Growth:

                      {

                        scenario.growth_rate

                      }%

                    </p>

                  </div>

                  <button

                    onClick={()=>

                      reuseScenario(
                        scenario
                      )
                    }

                    className="
                    bg-blue-600
                    px-4
                    py-2
                    rounded-lg
                    "

                  >

                    Reuse

                  </button>

                </div>

              )

            )

          }

        </div>

      </div>

    </div>

  )
}

export default ScenarioAnalysis