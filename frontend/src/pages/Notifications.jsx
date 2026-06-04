import { useEffect, useState } from "react"
import API from "../api/api"

function Notifications() {

  const [notifications, setNotifications] =
    useState([])

  useEffect(() => {

    loadNotifications()

  }, [])

  const loadNotifications = async () => {

    try {

      const token =
        localStorage.getItem("token")

      const response =
        await API.get(

          "/notifications",

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      setNotifications(

        response.data.notifications || []

      )

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Notification Center

      </h1>

      <div className="grid gap-4">

        {

          notifications.length > 0

          ?

          notifications.map(

            (item) => (

              <div

                key={item.id}

                className="
                bg-slate-900
                p-5
                rounded-3xl
                "

              >

                <div className="flex justify-between">

                  <h2 className="font-bold">

                    {item.title}

                  </h2>

                  <span

                    className={

                      item.is_read

                      ?

                      "text-green-400"

                      :

                      "text-yellow-400"
                    }

                  >

                    {

                      item.is_read

                      ?

                      "Read"

                      :

                      "Unread"
                    }

                  </span>

                </div>

                <p className="mt-3 text-slate-300">

                  {item.message}

                </p>

                <p className="mt-3 text-xs text-slate-500">

                  {item.created_at}

                </p>

              </div>

            )
          )

          :

          <div
            className="
            bg-slate-900
            p-6
            rounded-3xl
            "
          >

            No notifications available

          </div>

        }

      </div>

    </div>

  )
}

export default Notifications