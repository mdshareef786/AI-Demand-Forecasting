import {
  LayoutDashboard,
  Upload,
  BrainCircuit,
  FileText,
  LogOut,
  Menu,
  FolderOpen,
  BarChart3,
  BriefcaseBusiness,
  Users,
  History,
  Scale,
  LineChart,
  Sparkles,
  Activity,
  Bell,
  Target,
  Bot,
  Database,
  Building2,
  UserCog,
  ClipboardCheck,
  Workflow,
  Goal,
  Gauge,
  ShieldCheck,
  GitBranch,
  BellRing,
  Command
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
      name: "Projects",
      path: "/projects",
      icon: <FolderOpen size={20}/>
    },

    {
      name: "Organizations",
      path: "/organizations",
      icon: <Building2 size={20}/>
    },

    {
      name: "Organization Users",
      path: "/organization-users",
      icon: <UserCog size={20}/>
    },

    {
      name: "Scenario Analysis",
      path: "/scenario-analysis",
      icon: <BarChart3 size={20}/>
    },

    {
      name: "Executive Dashboard",
      path: "/executive-dashboard",
      icon: <BriefcaseBusiness size={20}/>
    },

    {
      name: "Collaboration",
      path: "/collaboration",
      icon: <Users size={20}/>
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
      name: "Forecast History",
      path: "/forecast-history",
      icon: <History size={20}/>
    },

    {
      name: "Forecast Approval",
      path: "/forecast-approval",
      icon: <ClipboardCheck size={20}/>
    },

    {
      name: "Forecast Governance",
      path: "/forecast-governance",
      icon: <GitBranch size={20}/>
    },

    {
      name: "Accuracy Center",
      path: "/accuracy-center",
      icon: <Target size={20}/>
    },

    {
      name: "Model Comparison",
      path: "/model-comparison",
      icon: <Scale size={20}/>
    },

    {
      name: "Advanced Analytics",
      path: "/advanced-analytics",
      icon: <LineChart size={20}/>
    },

    {
      name: "AI Insights",
      path: "/ai-insights",
      icon: <Sparkles size={20}/>
    },

    {
      name: "Realtime Monitor",
      path: "/realtime-monitor",
      icon: <Activity size={20}/>
    },

    {
      name: "Notifications",
      path: "/notifications",
      icon: <Bell size={20}/>
    },

    {
      name: "Notification Center",
      path: "/notification-center",
      icon: <BellRing size={20}/>
    },

    {
      name: "Automation Center",
      path: "/automation-center",
      icon: <Bot size={20}/>
    },

    {
      name: "Workflow Automation",
      path: "/workflow-automation",
      icon: <Workflow size={20}/>
    },

    {
      name: "Strategic Planning",
      path: "/strategic-planning",
      icon: <Goal size={20}/>
    },

    {
      name: "Dataset Versions",
      path: "/dataset-version-center",
      icon: <Database size={20}/>
    },

    {
      name: "KPI Management",
      path: "/kpi-management",
      icon: <Gauge size={20}/>
    },

    {
      name: "Data Quality",
      path: "/data-quality-center",
      icon: <ShieldCheck size={20}/>
    },

    {
      name: "Executive Command",
      path: "/executive-command-center",
      icon: <Command size={20}/>
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