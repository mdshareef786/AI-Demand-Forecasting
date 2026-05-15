import { Navigate } from "react-router-dom"


function ProtectedRoute({

  children,

  adminOnly = false
}) {

  // ==================================
  // TOKEN
  // ==================================

  const token = localStorage.getItem(
    "token"
  )

  // ==================================
  // USER ROLE
  // ==================================

  const userRole = localStorage.getItem(
    "role"
  )

  // ==================================
  // NOT LOGGED IN
  // ==================================

  if (!token) {

    return <Navigate to="/" />
  }

  // ==================================
  // ADMIN ROUTE PROTECTION
  // ==================================

  if (

    adminOnly

    &&

    userRole !== "admin"
  ) {

    return <Navigate to="/dashboard" />
  }

  // ==================================
  // ALLOW ACCESS
  // ==================================

  return children
}

export default ProtectedRoute