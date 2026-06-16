import { useEffect, useState } from "react"
import API from "../api/api"

function OrganizationUsers() {

  const [users, setUsers] =
    useState([])

  const [organizations, setOrganizations] =
    useState([])

  const [userId, setUserId] =
    useState("")

  const [organizationId, setOrganizationId] =
    useState("")

  useEffect(() => {

    loadUsers()

    loadOrganizations()

  }, [])

  const loadUsers = async () => {

    try {

      const response =
        await API.get(
          "/organization-users/"
        )

      setUsers(
        response.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  const loadOrganizations =
    async () => {

      try {

        const response =
          await API.get(
            "/organizations/"
          )

        setOrganizations(
          response.data
        )

      } catch (error) {

        console.log(error)
      }
    }

  const assignUser = async () => {

    try {

      await API.post(

        "/organization-users/add",

        null,

        {
          params: {

            organization_id:
              Number(organizationId),

            user_id:
              Number(userId),

            role:
              "analyst"

          }
        }
      )

      alert(
        "User assigned successfully"
      )

      setUserId("")
      setOrganizationId("")

    } catch (error) {

      console.log(error)

      alert(
        "User assignment failed"
      )
    }
  }

  const deleteUser =
    async (id) => {

      try {

        await API.delete(

          `/organization-users/${id}`
        )

        loadUsers()

      } catch (error) {

        console.log(error)
      }
    }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Organization User Management

      </h1>

      {/* Assign User */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Assign User

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="User ID"
            value={userId}
            onChange={(e)=>
              setUserId(
                e.target.value
              )
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

          <select

            value={organizationId}

            onChange={(e)=>
              setOrganizationId(
                e.target.value
              )
            }

            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          >

            <option value="">

              Select Organization

            </option>

            {

              organizations.map(

                (org) => (

                  <option

                    key={org.id}

                    value={org.id}

                  >

                    {org.name}

                  </option>

                )

              )

            }

          </select>

        </div>

        <button

          onClick={assignUser}

          className="
          mt-5
          bg-blue-600
          px-6
          py-3
          rounded-xl
          "
        >

          Assign User

        </button>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Total Users

          </h3>

          <p className="text-3xl font-bold">

            {users.length}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Organizations

          </h3>

          <p className="text-3xl font-bold text-cyan-400">

            {organizations.length}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Active Assignments

          </h3>

          <p className="text-3xl font-bold text-green-400">

            {users.length}

          </p>

        </div>

      </div>

      {/* Users Table */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Organization Users

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left">

                <th>User ID</th>

                <th>Organization ID</th>

                <th>Date</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {

                users.map(

                  (user) => (

                    <tr

                      key={user.id}

                      className="
                      border-t
                      border-slate-800
                      "
                    >

                      <td className="py-3">

                        {user.user_id}

                      </td>

                      <td>

                        {user.organization_id}

                      </td>

                      <td>

                        {

                          new Date(

                            user.created_at

                          ).toLocaleString()

                        }

                      </td>

                      <td>

                        <button

                          onClick={() =>
                            deleteUser(
                              user.id
                            )
                          }

                          className="
                          bg-red-600
                          px-3
                          py-1
                          rounded-lg
                          "
                        >

                          Remove

                        </button>

                      </td>

                    </tr>

                  )

                )

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )
}

export default OrganizationUsers