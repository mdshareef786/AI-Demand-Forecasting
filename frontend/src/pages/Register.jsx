import { useState } from "react"

import {
  useNavigate,
  Link
} from "react-router-dom"

import { motion } from "framer-motion"

import {
  BrainCircuit,
  ShieldCheck,
  TrendingUp
} from "lucide-react"

import API from "../api/api"


function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: ""
  })

  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    setMessage("")

    try {

      const response = await API.post(

        "/auth/register",

        formData
      )

      setMessage(
        response.data.message
      )

      setTimeout(() => {

        navigate("/")

      }, 1500)

    }

    catch (error) {

      setMessage(

        error.response?.data?.detail
        || "Registration failed"
      )
    }

    finally {

      setLoading(false)
    }
  }


  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 bg-gradient-to-br from-purple-600 via-indigo-700 to-slate-900">

        <motion.div

          initial={{
            opacity: 0,
            x: -40
          }}

          animate={{
            opacity: 1,
            x: 0
          }}

          transition={{
            duration: 0.6
          }}
        >

          <div className="flex items-center gap-4 mb-8">

            <BrainCircuit size={50} />

            <h1 className="text-5xl font-bold">

              AI Forecast

            </h1>

          </div>

          <p className="text-xl text-purple-100 leading-relaxed mb-12">

            Create your account and unlock powerful AI-driven business forecasting and analytics.

          </p>


          <div className="space-y-6">

            <div className="flex items-center gap-4">

              <TrendingUp size={28} />

              <span className="text-lg">

                Intelligent analytics platform

              </span>

            </div>

            <div className="flex items-center gap-4">

              <BrainCircuit size={28} />

              <span className="text-lg">

                Machine learning forecasting

              </span>

            </div>

            <div className="flex items-center gap-4">

              <ShieldCheck size={28} />

              <span className="text-lg">

                Secure and scalable architecture

              </span>

            </div>

          </div>

        </motion.div>

      </div>


      {/* RIGHT PANEL */}

      <div className="flex-1 flex items-center justify-center p-8">

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

          className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
        >

          <h2 className="text-4xl font-bold mb-3">

            Create Account

          </h2>

          <p className="text-slate-300 mb-8">

            Start using AI forecasting today

          </p>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}

            <div>

              <label className="block mb-2 text-sm text-slate-300">

                Full Name

              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                onChange={handleChange}
                required
                className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-purple-500"
              />

            </div>


            {/* EMAIL */}

            <div>

              <label className="block mb-2 text-sm text-slate-300">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                required
                className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-purple-500"
              />

            </div>


            {/* PASSWORD */}

            <div>

              <label className="block mb-2 text-sm text-slate-300">

                Password

              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
                className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-purple-500"
              />

            </div>


            {/* MESSAGE */}

            {

              message && (

                <p className="text-center text-sm text-slate-200">

                  {message}

                </p>
              )
            }


            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-2xl font-semibold text-lg transition"
            >

              {
                loading
                  ? "Creating Account..."
                  : "Register"
              }

            </button>

          </form>


          {/* LOGIN LINK */}

          <p className="text-center mt-8 text-slate-400">

            Already have an account?

            {" "}

            <Link
              to="/"
              className="text-purple-400 font-semibold hover:underline"
            >

              Login

            </Link>

          </p>

        </motion.div>

      </div>

    </div>
  )
}

export default Register