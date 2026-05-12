import {
  useState,
  useEffect
} from "react"

import {
  useNavigate,
  Link
} from "react-router-dom"

import { motion } from "framer-motion"

import {
  BrainCircuit,
  TrendingUp,
  ShieldCheck
} from "lucide-react"

import toast from "react-hot-toast"

import API from "../api/api"


function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    email: "",
    password: ""
  })

  const [error, setError] = useState("")

  const [loading, setLoading] = useState(false)


  useEffect(() => {

    const token = localStorage.getItem(
      "token"
    )

    if (token) {

      navigate("/dashboard")
    }

  }, [])


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    setError("")

    try {

      const data = new URLSearchParams()

      data.append(
        "username",
        formData.email
      )

      data.append(
        "password",
        formData.password
      )

      const response = await API.post(

        "/auth/login",

        data,

        {

          headers: {

            "Content-Type":
              "application/x-www-form-urlencoded"
          }
        }
      )

      localStorage.setItem(

        "token",

        response.data.access_token
      )

      // SUCCESS TOAST

      toast.success(
        "Login successful"
      )

      navigate("/dashboard")

    }

    catch (err) {

      setError(

        err.response?.data?.detail
        || "Login failed"
      )

      // ERROR TOAST

      toast.error(
        "Invalid credentials"
      )
    }

    finally {

      setLoading(false)
    }
  }


  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900">

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

          <p className="text-xl text-blue-100 leading-relaxed mb-12">

            Intelligent demand forecasting and business analytics platform powered by machine learning.

          </p>


          <div className="space-y-6">

            <div className="flex items-center gap-4">

              <TrendingUp size={28} />

              <span className="text-lg">

                Real-time analytics dashboard

              </span>

            </div>

            <div className="flex items-center gap-4">

              <BrainCircuit size={28} />

              <span className="text-lg">

                AI-powered future predictions

              </span>

            </div>

            <div className="flex items-center gap-4">

              <ShieldCheck size={28} />

              <span className="text-lg">

                Secure JWT authentication

              </span>

            </div>

          </div>

        </motion.div>

      </div>


      {/* RIGHT SIDE */}

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

            Welcome Back

          </h2>

          <p className="text-slate-300 mb-8">

            Login to continue to your dashboard

          </p>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

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
                className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* ERROR */}

            {

              error && (

                <p className="text-red-400 text-sm">

                  {error}

                </p>
              )
            }


            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-semibold text-lg transition disabled:opacity-50"
            >

              {
                loading
                  ? "Logging in..."
                  : "Login"
              }

            </button>

          </form>


          {/* REGISTER */}

          <p className="text-center mt-8 text-slate-400">

            Don’t have an account?

            {" "}

            <Link
              to="/register"
              className="text-blue-400 font-semibold hover:underline"
            >

              Register

            </Link>

          </p>

        </motion.div>

      </div>

    </div>
  )
}

export default Login