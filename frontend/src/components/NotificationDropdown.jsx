import {

  useEffect,

  useState

} from "react"

import axios from "axios"

import {

  Bell

} from "lucide-react"


function NotificationDropdown() {

  const [notifications, setNotifications] = useState([])

  const [open, setOpen] = useState(false)


  useEffect(() => {

    fetchNotifications()

  }, [])


  const fetchNotifications = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await axios.get(

        "http://127.0.0.1:8000/notifications/",

        {

          headers: {

            Authorization: `Bearer ${token}`
          }
        }
      )

      setNotifications(

        response.data.notifications
      )

    } catch (error) {

      console.log(error)
    }
  }


  return (

    <div className="relative">

      {/* BELL ICON */}

      <button

        onClick={() => setOpen(!open)}

        className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
      >

        <Bell size={22} />

        {

          notifications.length > 0 && (

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">

              {notifications.length}

            </span>
          )
        }

      </button>


      {/* DROPDOWN */}

      {

        open && (

          <div className="absolute right-0 mt-3 w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 p-4">

            <h2 className="text-lg font-semibold mb-4">

              Notifications

            </h2>

            {

              notifications.length === 0 ? (

                <p className="text-slate-400">

                  No notifications

                </p>

              ) : (

                <div className="space-y-3 max-h-96 overflow-auto">

                  {

                    notifications.map((item) => (

                      <div

                        key={item.id}

                        className="bg-slate-800 p-4 rounded-xl"
                      >

                        <h3 className="font-semibold">

                          {item.title}

                        </h3>

                        <p className="text-sm text-slate-300 mt-1">

                          {item.message}

                        </p>

                      </div>
                    ))
                  }

                </div>
              )
            }

          </div>
        )
      }

    </div>
  )
}

export default NotificationDropdown