import {
  LayoutDashboard,
  Upload,
  BrainCircuit,
  LogOut
} from "lucide-react"

import {
  Link,
  Outlet,
  useLocation,
  useNavigate
} from "react-router-dom"

import { motion } from "framer-motion"

import toast from "react-hot-toast"


function MainLayout() {

  const navigate = useNavigate()

  const location = useLocation()


  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    )

    toast.success(
      "Logged out successfully"
    )

    navigate("/")
  }


  const navItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />
    },

    {
      name: "Upload Dataset",
      path: "/upload",
      icon: <Upload size={20} />
    },

    {
      name: "Forecast",
      path: "/forecast",
      icon: <BrainCircuit size={20} />
    }
  ]


  return (

    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* SIDEBAR */}

      <motion.div

        initial={{
          x: -100,
          opacity: 0
        }}

        animate={{
          x: 0,
          opacity: 1
        }}

        transition={{
          duration: 0.5
        }}

        className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-6"
      >

        <div>

          {/* LOGO */}

          <div className="mb-12">

            <h1 className="text-3xl font-bold tracking-wide">

              AI Forecast

            </h1>

            <p className="text-slate-400 mt-2 text-sm">

              Demand Forecasting Platform

            </p>

          </div>


          {/* NAVIGATION */}

          <nav className="space-y-3">

            {

              navItems.map((item) => {

                const active =
                  location.pathname === item.path

                return (

                  <Link
                    key={item.name}
                    to={item.path}
                  >

                    <motion.div

                      whileHover={{
                        scale: 1.02
                      }}

                      whileTap={{
                        scale: 0.98
                      }}

                      className={`

                        flex items-center gap-4
                        px-5 py-4
                        rounded-2xl
                        transition-all
                        duration-300

                        ${active

                          ? "bg-blue-600 shadow-lg shadow-blue-500/30"

                          : "hover:bg-slate-800 text-slate-300"
                        }

                      `}
                    >

                      {item.icon}

                      <span className="font-medium">

                        {item.name}

                      </span>

                    </motion.div>

                  </Link>
                )
              })
            }

          </nav>

        </div>


        {/* LOGOUT */}

        <motion.button

          whileHover={{
            scale: 1.02
          }}

          whileTap={{
            scale: 0.98
          }}

          onClick={handleLogout}

          className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
        >

          <LogOut size={20} />

          Logout

        </motion.button>

      </motion.div>


      {/* MAIN CONTENT */}

      <div className="flex-1 bg-slate-950 p-8 overflow-auto">

        <Outlet />

      </div>

    </div>
  )
}

export default MainLayout