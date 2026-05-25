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

      navigate(
        "/dashboard"
      )
    }

  }, [navigate])


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value
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


      // ==========================
      // SAVE LOGIN DATA
      // ==========================

      localStorage.setItem(

        "token",

        response.data.access_token
      )

      localStorage.setItem(

        "role",

        response.data.role
      )

      localStorage.setItem(

        "user_name",

        response.data.user_name
      )


      // ==========================
      // SUCCESS MESSAGE
      // ==========================

      toast.success(

        "Login successful"
      )


      // ==========================
      // REDIRECT
      // ==========================

      navigate(
        "/dashboard"
      )

    }

    catch (err) {

      setError(

        err.response?.data?.detail

        ||

        "Login failed"
      )

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

      {/* LEFT */}

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

          <p className="text-xl text-blue-100 mb-12">

            Intelligent demand forecasting platform powered by AI.

          </p>

          <div className="space-y-6">

            <div className="flex items-center gap-4">

              <TrendingUp size={28} />

              <span>

                Real-time analytics

              </span>

            </div>

            <div className="flex items-center gap-4">

              <BrainCircuit size={28} />

              <span>

                AI predictions

              </span>

            </div>

            <div className="flex items-center gap-4">

              <ShieldCheck size={28} />

              <span>

                JWT Security

              </span>

            </div>

          </div>

        </motion.div>

      </div>


      {/* RIGHT */}

      <div className="flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-md bg-white/10 p-10 rounded-3xl">

          <h2 className="text-4xl font-bold mb-3">

            Welcome Back

          </h2>

          <p className="text-slate-300 mb-8">

            Login to continue

          </p>


          <form

            onSubmit={handleSubmit}

            className="space-y-5"
          >

            <input

              type="email"

              name="email"

              placeholder="Email"

              onChange={handleChange}

              required

              className="w-full p-4 rounded-xl bg-slate-900"
            />


            <input

              type="password"

              name="password"

              placeholder="Password"

              onChange={handleChange}

              required

              className="w-full p-4 rounded-xl bg-slate-900"
            />


            {

              error && (

                <p className="text-red-400">

                  {error}

                </p>
              )
            }


            <button

              type="submit"

              disabled={loading}

              className="w-full bg-blue-600 py-4 rounded-xl"
            >

              {

                loading

                ?

                "Logging in..."

                :

                "Login"
              }

            </button>

          </form>


          <p className="text-center mt-8">

            No account?

            {" "}

            <Link

              to="/register"

              className="text-blue-400"
            >

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Login