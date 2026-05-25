import { Navigate } from "react-router-dom"


function ProtectedRoute({

  children,

  allowedRoles = []
}) {

  const token = localStorage.getItem(
    "token"
  )

  const role = localStorage.getItem(
    "role"
  )


  // ==========================
  // NOT LOGGED IN
  // ==========================

  if (!token) {

    return <Navigate to="/" />
  }


  // ==========================
  // ROLE CHECK
  // ==========================

  if (

    allowedRoles.length > 0

    &&

    !allowedRoles.includes(
      role
    )
  ) {

    return (
      <Navigate
        to="/dashboard"
      />
    )
  }


  // ==========================
  // ACCESS ALLOWED
  // ==========================

  return children
}

export default ProtectedRoute