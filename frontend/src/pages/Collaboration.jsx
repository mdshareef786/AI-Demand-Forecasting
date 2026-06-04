import { useEffect, useState } from "react"
import API from "../api/api"

function Collaboration() {

  const [comments, setComments] =
    useState([])

  const [reports, setReports] =
    useState([])

  const [revisions, setRevisions] =
    useState([])

  const [newComment, setNewComment] =
    useState("")

  useEffect(() => {

    loadCollaborationData()

  }, [])

  const loadCollaborationData = async () => {

    try {

      const commentsRes =
        await API.get(
          "/collaboration/comments"
        )

      const reportsRes =
        await API.get(
          "/collaboration/shared-reports"
        )

      const revisionsRes =
        await API.get(
          "/collaboration/revisions"
        )

      setComments(
        commentsRes.data || []
      )

      setReports(
        reportsRes.data || []
      )

      setRevisions(
        revisionsRes.data || []
      )

    } catch (error) {

      console.log(error)
    }
  }

  const addComment = async () => {

    try {

      await API.post(

        "/collaboration/comment",

        {
          comment: newComment
        }
      )

      setNewComment("")

      loadCollaborationData()

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Forecast Collaboration Center

      </h1>

      <div className="bg-slate-900 p-6 rounded-3xl">

        <h2 className="text-xl font-bold mb-4">

          Add Comment

        </h2>

        <div className="flex gap-4">

          <input

            type="text"

            value={newComment}

            onChange={(e)=>

              setNewComment(
                e.target.value
              )
            }

            placeholder="Enter comment"

            className="
            flex-1
            bg-slate-800
            p-3
            rounded-xl
            "
          />

          <button

            onClick={addComment}

            className="
            bg-blue-600
            px-6
            rounded-xl
            "
          >

            Add

          </button>

        </div>

      </div>

      <div className="grid xl:grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="text-xl font-bold mb-4">

            Comments

          </h2>

          <div className="space-y-3">

            {

              comments.map(

                (item, index)=>(

                  <div

                    key={index}

                    className="
                    bg-slate-800
                    p-3
                    rounded-xl
                    "
                  >

                    {item.comment}

                  </div>

                )
              )

            }

          </div>

        </div>

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="text-xl font-bold mb-4">

            Shared Reports

          </h2>

          <div className="space-y-3">

            {

              reports.map(

                (report, index)=>(

                  <div

                    key={index}

                    className="
                    bg-slate-800
                    p-3
                    rounded-xl
                    "
                  >

                    {report.name}

                  </div>

                )
              )

            }

          </div>

        </div>

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="text-xl font-bold mb-4">

            Revision History

          </h2>

          <div className="space-y-3">

            {

              revisions.map(

                (revision, index)=>(

                  <div

                    key={index}

                    className="
                    bg-slate-800
                    p-3
                    rounded-xl
                    "
                  >

                    {revision.version}

                  </div>

                )
              )

            }

          </div>

        </div>

      </div>

    </div>

  )
}

export default Collaboration