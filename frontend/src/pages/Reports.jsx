import { useState } from "react"

import API from "../api/api"

import {
  FileSpreadsheet,
  FileText,
  Download
} from "lucide-react"

import { motion } from "framer-motion"

import toast from "react-hot-toast"


function Reports() {

  const [loadingPdf, setLoadingPdf] = useState(false)

  const [loadingExcel, setLoadingExcel] = useState(false)


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

      const link = document.createElement("a")

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

      toast.error(
        "Failed to download PDF report"
      )

      console.log(error)
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

      const link = document.createElement("a")

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

      toast.error(
        "Failed to download Excel report"
      )

      console.log(error)
    }

    finally {

      setLoadingExcel(false)
    }
  }


  return (

    <div className="min-h-screen text-white">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          AI Reports Center

        </h1>

        <p className="text-slate-400 mt-3 text-lg">

          Generate and download business forecasting reports

        </p>

      </div>


      {/* REPORT CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


        {/* PDF REPORT */}

        <motion.div

          whileHover={{
            scale: 1.02
          }}

          className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl"
        >

          <div className="flex items-center justify-between mb-6">

            <div className="bg-red-500/20 p-4 rounded-2xl">

              <FileText
                size={40}
                className="text-red-400"
              />

            </div>

            <Download className="text-slate-500" />

          </div>

          <h2 className="text-3xl font-bold mb-3">

            PDF Report

          </h2>

          <p className="text-slate-400 mb-8">

            Download forecasting analytics and business insights in PDF format.

          </p>

          <button

            onClick={downloadPDF}

            disabled={loadingPdf}

            className="w-full bg-red-500 hover:bg-red-600 transition py-4 rounded-2xl font-semibold text-lg"
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

          whileHover={{
            scale: 1.02
          }}

          className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl"
        >

          <div className="flex items-center justify-between mb-6">

            <div className="bg-green-500/20 p-4 rounded-2xl">

              <FileSpreadsheet
                size={40}
                className="text-green-400"
              />

            </div>

            <Download className="text-slate-500" />

          </div>

          <h2 className="text-3xl font-bold mb-3">

            Excel Report

          </h2>

          <p className="text-slate-400 mb-8">

            Export monthly sales analytics and forecast data to Excel.

          </p>

          <button

            onClick={downloadExcel}

            disabled={loadingExcel}

            className="w-full bg-green-500 hover:bg-green-600 transition py-4 rounded-2xl font-semibold text-lg"
          >

            {
              loadingExcel
                ? "Generating Excel..."
                : "Download Excel Report"
            }

          </button>

        </motion.div>

      </div>

    </div>
  )
}

export default Reports