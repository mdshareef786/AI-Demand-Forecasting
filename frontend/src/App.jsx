import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"

import Dashboard from "./pages/Dashboard"
import UploadDataset from "./pages/UploadDataset"
import Forecast from "./pages/Forecast"
import Reports from "./pages/Reports"
import ReportDetails from "./pages/ReportDetails"
import AdminDashboard from "./pages/AdminDashboard"

import MainLayout from "./layouts/MainLayout"

import ProtectedRoute from "./components/ProtectedRoute"


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ========================= */}
        {/* PROTECTED LAYOUT */}
        {/* ========================= */}

        <Route

          element={

            <ProtectedRoute>

              <MainLayout />

            </ProtectedRoute>

          }
        >

          {/* DASHBOARD */}

          <Route

            path="/dashboard"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <Dashboard />

              </ProtectedRoute>
            }
          />


          {/* DATASET */}

          <Route

            path="/upload"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst"

                ]}
              >

                <UploadDataset />

              </ProtectedRoute>
            }
          />


          {/* FORECAST */}

          <Route

            path="/forecast"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst"

                ]}
              >

                <Forecast />

              </ProtectedRoute>
            }
          />


          {/* REPORTS */}

          <Route

            path="/reports"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <Reports />

              </ProtectedRoute>
            }
          />


          {/* REPORT DETAILS */}

          <Route

            path="/report-details"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <ReportDetails />

              </ProtectedRoute>
            }
          />


          {/* ADMIN */}

          <Route

            path="/admin"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin"

                ]}
              >

                <AdminDashboard />

              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>

  )
}

export default App