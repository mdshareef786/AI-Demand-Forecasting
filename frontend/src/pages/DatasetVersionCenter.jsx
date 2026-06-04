import { useEffect, useState } from "react"
import API from "../api/api"

function DatasetVersionCenter() {

  const [versions, setVersions] = useState([])
  const [comparison, setComparison] = useState("")

  useEffect(() => {

    loadVersions()
    loadComparison()

  }, [])

  const loadVersions = async () => {

    try {

      const response =
        await API.get(
          "/dataset-version/list"
        )

      setVersions(
        response.data
      )

    } catch (error) {

      console.log(error)

    }

  }

  const loadComparison = async () => {

    try {

      const response =
        await API.get(
          "/dataset-version/compare"
        )

      setComparison(
        response.data.comparison
      )

    } catch (error) {

      console.log(error)

    }

  }

  const archiveDataset = async (versionId) => {

    try {

      await API.put(
        `/dataset-version/archive/${versionId}`
      )

      loadVersions()

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Dataset Version Center

      </h1>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Dataset Version History

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left">

                <th>Dataset</th>

                <th>Version</th>

                <th>Status</th>

                <th>Uploaded By</th>

                <th>Date</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {Array.isArray(versions) &&

                versions.map((item) => (

                  <tr
                    key={item.id}
                    className="
                    border-t
                    border-slate-800
                    "
                  >

                    <td className="py-3">

                      {item.dataset_name}

                    </td>

                    <td>

                      {item.version}

                    </td>

                    <td>

                      <span

                        className={

                          item.status === "active"

                            ? "text-green-400"
                            : "text-orange-400"

                        }

                      >

                        {item.status}

                      </span>

                    </td>

                    <td>

                      {item.uploaded_by}

                    </td>

                    <td>

                      {new Date(
                        item.created_at
                      ).toLocaleString()}

                    </td>

                    <td>

                      {

                        item.status === "active"

                        &&

                        <button

                          onClick={() =>
                            archiveDataset(
                              item.id
                            )
                          }

                          className="
                          bg-red-600
                          px-3
                          py-1
                          rounded-lg
                          hover:bg-red-700
                          "

                        >

                          Archive

                        </button>

                      }

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="font-bold mb-4">

          Dataset Comparison

        </h2>

        <p className="text-green-400">

          {comparison || "No comparison available"}

        </p>

      </div>

    </div>

  )

}

export default DatasetVersionCenter