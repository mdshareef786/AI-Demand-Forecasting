import { useState } from "react"

import API from "../api/api"

import {
  FileSpreadsheet,
  FileText,
  Download,
  Files,
  ShieldCheck,
  BarChart3
} from "lucide-react"

import { motion } from "framer-motion"

import toast from "react-hot-toast"

import { useNavigate } from "react-router-dom"


function Reports() {

  const navigate = useNavigate()

  const [loadingPdf, setLoadingPdf] =
    useState(false)

  const [loadingExcel, setLoadingExcel] =
    useState(false)


  // =========================
  // DOWNLOAD PDF
  // =========================

  const downloadPDF = async () => {

    try {

      setLoadingPdf(true)

      const token = localStorage.getItem(
        "token"
      )

      const response = await API.get(

        "/reports/export-pdf",

        {

          responseType: "blob",

          headers: {

            Authorization: `Bearer ${token}`
          }
        }
      )

      const url = window.URL.createObjectURL(

        new Blob([response.data])
      )

      const link =
        document.createElement("a")

      link.href = url

      link.setAttribute(
        "download",
        "forecast_report.pdf"
      )

      document.body.appendChild(link)

      link.click()

      toast.success(
        "PDF report downloaded"
      )

    }

    catch (error) {

      console.log(error)

      toast.error(
        "Failed to download PDF report"
      )
    }

    finally {

      setLoadingPdf(false)
    }
  }


  // =========================
  // DOWNLOAD EXCEL
  // =========================

  const downloadExcel = async () => {

    try {

      setLoadingExcel(true)

      const token = localStorage.getItem(
        "token"
      )

      const response = await API.get(

        "/reports/export-excel",

        {

          responseType: "blob",

          headers: {

            Authorization: `Bearer ${token}`
          }
        }
      )

      const url = window.URL.createObjectURL(

        new Blob([response.data])
      )

      const link =
        document.createElement("a")

      link.href = url

      link.setAttribute(
        "download",
        "forecast_report.xlsx"
      )

      document.body.appendChild(link)

      link.click()

      toast.success(
        "Excel report downloaded"
      )

    }

    catch (error) {

      console.log(error)

      toast.error(
        "Failed to download Excel report"
      )
    }

    finally {

      setLoadingExcel(false)
    }
  }


  const stats = [

    {
      title: "Reports Generated",
      value: "120+",
      icon: <Files size={28} />,
      gradient:
        "from-blue-500 to-cyan-500"
    },

    {
      title: "Export Accuracy",
      value: "99%",
      icon: <ShieldCheck size={28} />,
      gradient:
        "from-green-500 to-emerald-500"
    },

    {
      title: "Forecast Analytics",
      value: "AI Ready",
      icon: <BarChart3 size={28} />,
      gradient:
        "from-purple-500 to-pink-500"
    }
  ]


  return (

    <div className="min-h-screen text-white">


      {/* PAGE HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          AI Reports Center

        </h1>

        <p className="text-slate-400 mt-3 text-lg">

          Generate enterprise forecasting reports and export business analytics

        </p>

      </div>


      {/* STATS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {

          stats.map((item, index) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 30
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                delay: index * 0.1
              }}

              whileHover={{
                scale: 1.03
              }}

              className={`

                bg-gradient-to-br
                ${item.gradient}

                rounded-3xl
                p-6

                shadow-2xl
              `}
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm opacity-80">

                    {item.title}

                  </p>

                  <h2 className="text-3xl font-bold mt-3">

                    {item.value}

                  </h2>

                </div>

                <div className="bg-white/20 p-4 rounded-2xl">

                  {item.icon}

                </div>

              </div>

            </motion.div>
          ))
        }

      </div>


      {/* REPORT DOWNLOAD SECTION */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">


        {/* PDF REPORT */}

        <motion.div

          initial={{
            opacity: 0,
            x: -30
          }}

          animate={{
            opacity: 1,
            x: 0
          }}

          whileHover={{
            scale: 1.02
          }}

          className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl"
        >

          <div className="flex items-center justify-between mb-6">

            <div className="bg-red-500/20 p-4 rounded-2xl">

              <FileText
                size={45}
                className="text-red-400"
              />

            </div>

            <Download className="text-slate-500" />

          </div>

          <h2 className="text-3xl font-bold mb-4">

            PDF Forecast Report

          </h2>

          <p className="text-slate-400 mb-8 leading-relaxed">

            Download AI-powered forecasting insights, revenue analytics,
            and prediction summaries in professional PDF format.

          </p>

          <button

            onClick={downloadPDF}

            disabled={loadingPdf}

            className="w-full bg-red-500 hover:bg-red-600 transition-all py-4 rounded-2xl font-semibold text-lg"
          >

            {

              loadingPdf

                ? "Generating PDF..."

                : "Download PDF Report"
            }

          </button>

        </motion.div>


        {/* EXCEL REPORT */}

        <motion.div

          initial={{
            opacity: 0,
            x: 30
          }}

          animate={{
            opacity: 1,
            x: 0
          }}

          whileHover={{
            scale: 1.02
          }}

          className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl"
        >

          <div className="flex items-center justify-between mb-6">

            <div className="bg-green-500/20 p-4 rounded-2xl">

              <FileSpreadsheet
                size={45}
                className="text-green-400"
              />

            </div>

            <Download className="text-slate-500" />

          </div>

          <h2 className="text-3xl font-bold mb-4">

            Excel Analytics Report

          </h2>

          <p className="text-slate-400 mb-8 leading-relaxed">

            Export complete forecasting datasets, monthly revenue analysis,
            and business intelligence insights to Excel.

          </p>

          <button

            onClick={downloadExcel}

            disabled={loadingExcel}

            className="w-full bg-green-500 hover:bg-green-600 transition-all py-4 rounded-2xl font-semibold text-lg"
          >

            {

              loadingExcel

                ? "Generating Excel..."

                : "Download Excel Report"
            }

          </button>

        </motion.div>

      </div>


      {/* RECENT REPORTS */}

      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl"
      >

        <h2 className="text-3xl font-bold mb-8">

          Recent Generated Reports

        </h2>


        <div className="space-y-5">


          {/* PDF REPORT */}

          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">

            <div>

              <h3 className="font-semibold text-lg">

                Forecast Revenue Report

              </h3>

              <p className="text-slate-400 text-sm">

                Generated using Prophet Forecasting

              </p>

            </div>

            <div className="flex items-center gap-3">

              <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm">

                PDF

              </span>

              <button

                onClick={() =>
                  navigate("/report-details")
                }

                className="bg-cyan-500 hover:bg-cyan-600 transition px-4 py-2 rounded-xl text-sm font-medium"
              >

                View Details

              </button>

            </div>

          </div>


          {/* EXCEL REPORT */}

          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">

            <div>

              <h3 className="font-semibold text-lg">

                Sales Analytics Export

              </h3>

              <p className="text-slate-400 text-sm">

                Monthly business analytics and trends

              </p>

            </div>

            <div className="flex items-center gap-3">

              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">

                Excel

              </span>

              <button

                onClick={() =>
                  navigate("/report-details")
                }

                className="bg-cyan-500 hover:bg-cyan-600 transition px-4 py-2 rounded-xl text-sm font-medium"
              >

                View Details

              </button>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  )
}

export default Reports