import { useEffect, useState } from "react"
import API from "../api/api"

function Projects() {

  const [projects, setProjects] = useState([])

  const [name, setName] = useState("")

  const [description, setDescription] = useState("")

  const loadProjects = async () => {

    try {

      const response = await API.get(
        "/projects"
      )

      setProjects(
        response.data
      )

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {

    loadProjects()

  }, [])

  const createProject = async () => {

    try {

      await API.post(
        "/projects/create",
        null,
        {
          params: {

            name,

            description,

            owner_id: 1
          }
        }
      )

      setName("")
      setDescription("")

      loadProjects()

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="space-y-6">

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h1 className="text-2xl font-bold mb-4">

          Forecast Projects

        </h1>

        <div className="grid gap-4">

          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e)=>
              setName(e.target.value)
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e)=>
              setDescription(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded-xl"
          />

          <button
            onClick={createProject}
            className="bg-blue-600 py-3 rounded-xl"
          >
            Create Project
          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        {

          projects.map((project)=>(

            <div

              key={project.id}

              className="bg-slate-900 p-5 rounded-3xl"

            >

              <h2 className="font-bold text-lg">

                {project.name}

              </h2>

              <p className="text-slate-400 mt-2">

                {project.description}

              </p>

              <div className="mt-4">

                Status:

                <span className="ml-2 text-green-400">

                  {project.status}

                </span>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  )
}

export default Projects