import {
  LayoutDashboard,
  Upload,
  BrainCircuit,
  FileText,
  LogOut,
  Menu
} from "lucide-react"

import {
  Link,
  Outlet,
  useLocation,
  useNavigate
} from "react-router-dom"

import { motion } from "framer-motion"

import {
  useState,
  useContext
} from "react"

import toast from "react-hot-toast"

import NotificationDropdown from "../components/NotificationDropdown"
import ThemeToggle from "../components/ThemeToggle"

import {
  ThemeContext
} from "../context/ThemeContext"

function MainLayout() {

  const navigate = useNavigate()

  const location = useLocation()

  const {
    theme
  } = useContext(ThemeContext)

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const handleLogout = () => {

    localStorage.removeItem("token")

    toast.success(
      "Logged out successfully"
    )

    navigate("/")
  }

  const navItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20}/>
    },

    {
      name: "Upload Dataset",
      path: "/upload",
      icon: <Upload size={20}/>
    },

    {
      name: "Forecast",
      path: "/forecast",
      icon: <BrainCircuit size={20}/>
    },

    {
      name: "Reports",
      path: "/reports",
      icon: <FileText size={20}/>
    }

  ]

  return (

<div

className={`

flex min-h-screen

${

theme === "dark"

?

"bg-slate-950 text-white"

:

"bg-gray-100 text-slate-900"

}

`}

>

<motion.div

initial={{
x:-100,
opacity:0
}}

animate={{
x:0,
opacity:1
}}

transition={{
duration:0.5
}}

className={`

hidden lg:flex

w-72

flex-col

justify-between

p-6

border-r

${

theme === "dark"

?

"bg-slate-900 border-slate-800"

:

"bg-white border-gray-200"

}

`}

>

<div>

<div className="mb-12">

<h1 className="text-3xl font-bold">

AI Forecast

</h1>

<p className="mt-2 text-sm">

Enterprise Intelligence Platform

</p>

</div>

<nav className="space-y-3">

{

navItems.map((item)=>{

const active =

location.pathname === item.path

return(

<Link
key={item.name}
to={item.path}
>

<motion.div

whileHover={{
scale:1.02
}}

whileTap={{
scale:0.98
}}

className={`

flex items-center gap-4

px-5 py-4

rounded-2xl

${

active

?

"bg-blue-600 text-white"

:

theme === "dark"

?

"hover:bg-slate-800 text-slate-300"

:

"hover:bg-gray-100 text-slate-700"

}

`}

>

{item.icon}

<span>

{item.name}

</span>

</motion.div>

</Link>

)

})

}

</nav>

</div>

<button

onClick={handleLogout}

className="

flex items-center gap-4

px-5 py-4

rounded-2xl

bg-red-500/10

text-red-500

"

>

<LogOut size={20}/>

Logout

</button>

</motion.div>

<div

className={`

flex-1 overflow-auto

${

theme === "dark"

?

"bg-slate-950"

:

"bg-gray-100"

}

`}

>

<div

className={`

flex justify-between items-center

px-5 lg:px-8 py-5

border-b

sticky top-0 z-30

${

theme === "dark"

?

"bg-slate-900 border-slate-800"

:

"bg-white border-gray-200"

}

`}

>

<div className="flex items-center gap-4">

<button

onClick={()=>
setSidebarOpen(true)
}

className="

lg:hidden

p-2

rounded-xl

bg-slate-800

text-white

"

>

<Menu size={22}/>

</button>

<div>

<h1 className="text-xl lg:text-2xl font-bold">

AI Demand Forecasting Platform

</h1>

<p className="text-xs lg:text-sm">

Enterprise Decision Intelligence Dashboard

</p>

</div>

</div>

<div className="flex items-center gap-4">

<ThemeToggle/>

<NotificationDropdown/>

</div>

</div>

<div className="p-5 lg:p-8">

<Outlet/>

</div>

</div>

</div>

  )
}

export default MainLayout