import {
  LayoutDashboard,
  Upload,
  BrainCircuit,
  FileText,
  LogOut,
  Menu,
  X
} from "lucide-react"

import {
  Link,
  Outlet,
  useLocation,
  useNavigate
} from "react-router-dom"

import {
  motion,
  AnimatePresence
} from "framer-motion"

import {
  useState
} from "react"

import toast from "react-hot-toast"

import NotificationDropdown from "../components/NotificationDropdown"


function MainLayout() {

  const navigate = useNavigate()

  const location = useLocation()

  const [sidebarOpen, setSidebarOpen] =
    useState(false)


  // ==================================
  // LOGOUT
  // ==================================

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    )

    toast.success(
      "Logged out successfully"
    )

    navigate("/")
  }


  // ==================================
  // NAVIGATION ITEMS
  // ==================================

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
    },

    {
      name: "Reports",
      path: "/reports",
      icon: <FileText size={20} />
    }
  ]


  return (

    <div className="flex min-h-screen bg-slate-950 text-white">


      {/* ================================== */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================== */}

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

        className="hidden lg:flex w-72 bg-slate-900 border-r border-slate-800 flex-col justify-between p-6"
      >

        <div>

          {/* LOGO */}

          <div className="mb-12">

            <h1 className="text-3xl font-bold tracking-wide">

              AI Forecast

            </h1>

            <p className="text-slate-400 mt-2 text-sm">

              Enterprise Forecasting Platform

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


      {/* ================================== */}
      {/* MOBILE SIDEBAR */}
      {/* ================================== */}

      <AnimatePresence>

        {

          sidebarOpen && (

            <>

              {/* OVERLAY */}

              <motion.div

                initial={{
                  opacity: 0
                }}

                animate={{
                  opacity: 1
                }}

                exit={{
                  opacity: 0
                }}

                onClick={() =>
                  setSidebarOpen(false)
                }

                className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              />


              {/* SIDEBAR */}

              <motion.div

                initial={{
                  x: -300
                }}

                animate={{
                  x: 0
                }}

                exit={{
                  x: -300
                }}

                transition={{
                  duration: 0.3
                }}

                className="fixed top-0 left-0 z-50 w-72 h-full bg-slate-900 border-r border-slate-800 p-6 lg:hidden"
              >

                {/* CLOSE BUTTON */}

                <div className="flex justify-end mb-6">

                  <button

                    onClick={() =>
                      setSidebarOpen(false)
                    }

                    className="bg-slate-800 p-2 rounded-xl"
                  >

                    <X size={22} />

                  </button>

                </div>


                {/* MOBILE NAVIGATION */}

                <nav className="space-y-3">

                  {

                    navItems.map((item) => {

                      const active =
                        location.pathname === item.path

                      return (

                        <Link
                          key={item.name}
                          to={item.path}

                          onClick={() =>
                            setSidebarOpen(false)
                          }
                        >

                          <div

                            className={`

                              flex items-center gap-4
                              px-5 py-4
                              rounded-2xl
                              transition-all

                              ${active

                                ? "bg-blue-600"

                                : "hover:bg-slate-800 text-slate-300"
                              }

                            `}
                          >

                            {item.icon}

                            <span>

                              {item.name}

                            </span>

                          </div>

                        </Link>
                      )
                    })
                  }

                </nav>


                {/* MOBILE LOGOUT */}

                <button

                  onClick={handleLogout}

                  className="mt-10 flex items-center gap-4 px-5 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition w-full"
                >

                  <LogOut size={20} />

                  Logout

                </button>

              </motion.div>

            </>
          )
        }

      </AnimatePresence>


      {/* ================================== */}
      {/* MAIN CONTENT */}
      {/* ================================== */}

      <div className="flex-1 bg-slate-950 overflow-auto">


        {/* TOP NAVBAR */}

        <div className="flex justify-between items-center px-5 lg:px-8 py-5 border-b border-slate-800 bg-slate-900 sticky top-0 z-30">

          {/* LEFT SECTION */}

          <div className="flex items-center gap-4">


            {/* MOBILE MENU BUTTON */}

            <button

              onClick={() =>
                setSidebarOpen(true)
              }

              className="lg:hidden bg-slate-800 p-2 rounded-xl"
            >

              <Menu size={22} />

            </button>


            {/* TITLE */}

            <div>

              <h1 className="text-xl lg:text-2xl font-bold">

                AI Demand Forecasting

              </h1>

              <p className="text-slate-400 text-xs lg:text-sm">

                Enterprise Analytics Dashboard

              </p>

            </div>

          </div>


          {/* NOTIFICATIONS */}

          <NotificationDropdown />

        </div>


        {/* PAGE CONTENT */}

        <div className="p-5 lg:p-8">

          <Outlet />

        </div>

      </div>

    </div>
  )
}

export default MainLayout