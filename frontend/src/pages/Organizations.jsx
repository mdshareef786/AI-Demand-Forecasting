import { useEffect, useState } from "react"
import API from "../api/api"

function Organizations() {

  const [organizations, setOrganizations] =
    useState([])

  const [name, setName] =
    useState("")

  const [industry, setIndustry] =
    useState("")

  const [country, setCountry] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [phone, setPhone] =
    useState("")

  useEffect(() => {

    loadOrganizations()

  }, [])

  const loadOrganizations = async () => {

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

  const createOrganization =
    async () => {

      try {

        await API.post(

          "/organizations/create",

          null,

          {
            params: {

              name,

              industry,

              country,

              email,

              phone
            }
          }
        )

        setName("")
        setIndustry("")
        setCountry("")
        setEmail("")
        setPhone("")

        loadOrganizations()

      } catch (error) {

        console.log(error)

        alert(
          "Organization creation failed"
        )
      }
    }

  const deleteOrganization =
    async (id) => {

      try {

        await API.delete(

          `/organizations/${id}`
        )

        loadOrganizations()

      } catch (error) {

        console.log(error)

        alert(
          "Delete failed"
        )
      }
    }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Organization Management

      </h1>

      {/* Create Organization */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Create Organization

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Organization Name"
            value={name}
            onChange={(e)=>
              setName(e.target.value)
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

          <input
            type="text"
            placeholder="Industry"
            value={industry}
            onChange={(e)=>
              setIndustry(e.target.value)
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e)=>
              setCountry(e.target.value)
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e)=>
              setPhone(e.target.value)
            }
            className="
            bg-slate-800
            p-3
            rounded-xl
            "
          />

        </div>

        <button

          onClick={createOrganization}

          className="
          mt-5
          bg-blue-600
          px-6
          py-3
          rounded-xl
          "
        >

          Create Organization

        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Total Organizations

          </h3>

          <p className="text-3xl font-bold">

            {organizations.length}

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Active Organizations

          </h3>

          <p className="text-3xl font-bold text-green-400">

            {

              organizations.filter(

                item =>
                item.is_active
              ).length
            }

          </p>

        </div>

        <div className="bg-slate-900 p-5 rounded-3xl">

          <h3 className="text-slate-400">

            Countries

          </h3>

          <p className="text-3xl font-bold text-cyan-400">

            {

              new Set(

                organizations.map(

                  x => x.country
                )

              ).size
            }

          </p>

        </div>

      </div>

      {/* Organizations Table */}

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Organization List

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left">

                <th>Name</th>

                <th>Industry</th>

                <th>Country</th>

                <th>Email</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {

                organizations.map(

                  (org) => (

                    <tr

                      key={org.id}

                      className="
                      border-t
                      border-slate-800
                      "
                    >

                      <td className="py-3">

                        {org.name}

                      </td>

                      <td>

                        {org.industry}

                      </td>

                      <td>

                        {org.country}

                      </td>

                      <td>

                        {org.email}

                      </td>

                      <td>

                        <span
                          className={

                            org.is_active

                              ?

                              "text-green-400"

                              :

                              "text-red-400"
                          }
                        >

                          {

                            org.is_active

                              ?

                              "Active"

                              :

                              "Inactive"
                          }

                        </span>

                      </td>

                      <td>

                        <button

                          onClick={() =>
                            deleteOrganization(
                              org.id
                            )
                          }

                          className="
                          bg-red-600
                          px-3
                          py-1
                          rounded-lg
                          "
                        >

                          Delete

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

export default Organizations