import { useState } from "react"

import { motion } from "framer-motion"

import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2
} from "lucide-react"

import API from "../api/api"


function UploadDataset() {

  const [file, setFile] = useState(null)

  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)

  const [success, setSuccess] = useState(false)


  const handleFileChange = (e) => {

    setFile(e.target.files[0])

    setSuccess(false)

    setMessage("")
  }


  const handleUpload = async () => {

    if (!file) {

      setMessage(
        "Please select a file"
      )

      return
    }

    try {

      setLoading(true)

      setMessage("")

      const token = localStorage.getItem(
        "token"
      )

      const formData = new FormData()

      formData.append(
        "file",
        file
      )

      const response = await API.post(

        "/dataset/upload",

        formData,

        {

          headers: {

            Authorization: `Bearer ${token}`,

            "Content-Type":
              "multipart/form-data"
          }
        }
      )

      setMessage(
        response.data.message
      )

      setSuccess(true)

    }

    catch (error) {

      setSuccess(false)

      setMessage(

        error.response?.data?.detail
        || "Upload failed"
      )
    }

    finally {

      setLoading(false)
    }
  }


  return (

    <div className="min-h-screen text-white">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          Upload Dataset

        </h1>

        <p className="text-slate-400 mt-3 text-lg">

          Upload CSV or Excel files for AI-powered demand forecasting

        </p>

      </div>


      {/* MAIN CARD */}

      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.5
        }}

        className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl max-w-3xl"
      >

        {/* UPLOAD AREA */}

        <motion.label

          whileHover={{
            scale: 1.01
          }}

          className="border-2 border-dashed border-slate-700 hover:border-blue-500 transition rounded-3xl p-14 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-950/50"
        >

          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            className="hidden"
          />


          <UploadCloud
            size={70}
            className="text-blue-400 mb-6"
          />

          <h2 className="text-2xl font-bold mb-3">

            Drag & Drop Dataset

          </h2>

          <p className="text-slate-400">

            Upload CSV or Excel files for analytics and forecasting

          </p>

        </motion.label>


        {/* FILE PREVIEW */}

        {

          file && (

            <motion.div

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              className="mt-8 bg-slate-800/70 border border-slate-700 rounded-2xl p-5 flex items-center justify-between"
            >

              <div className="flex items-center gap-4">

                <FileSpreadsheet
                  size={40}
                  className="text-green-400"
                />

                <div>

                  <h3 className="font-semibold text-lg">

                    {file.name}

                  </h3>

                  <p className="text-slate-400 text-sm">

                    Dataset ready for upload

                  </p>

                </div>

              </div>

            </motion.div>
          )
        }


        {/* BUTTON */}

        <motion.button

          whileHover={{
            scale: 1.02
          }}

          whileTap={{
            scale: 0.98
          }}

          onClick={handleUpload}

          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl text-lg font-semibold transition shadow-lg shadow-blue-500/20"
        >

          {
            loading
              ? "Uploading Dataset..."
              : "Upload Dataset"
          }

        </motion.button>


        {/* MESSAGE */}

        {

          message && (

            <motion.div

              initial={{
                opacity: 0
              }}

              animate={{
                opacity: 1
              }}

              className={`

                mt-6
                rounded-2xl
                p-5
                flex items-center gap-4

                ${success

                  ? "bg-green-500/10 border border-green-500/30 text-green-400"

                  : "bg-red-500/10 border border-red-500/30 text-red-400"
                }

              `}
            >

              {

                success && (

                  <CheckCircle2 size={28} />
                )
              }

              <p className="font-medium">

                {message}

              </p>

            </motion.div>
          )
        }

      </motion.div>

    </div>
  )
}

export default UploadDataset