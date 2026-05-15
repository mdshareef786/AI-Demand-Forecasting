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

        {/* ================================== */}
        {/* PUBLIC ROUTES */}
        {/* ================================== */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================================== */}
        {/* PROTECTED ROUTES */}
        {/* ================================== */}

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
            element={<Dashboard />}
          />


          {/* DATASET */}

          <Route
            path="/upload"
            element={<UploadDataset />}
          />


          {/* FORECAST */}

          <Route
            path="/forecast"
            element={<Forecast />}
          />


          {/* REPORTS */}

          <Route
            path="/reports"
            element={<Reports />}
          />


          {/* REPORT DETAILS */}

          <Route
            path="/report-details"
            element={<ReportDetails />}
          />


          {/* ADMIN PANEL */}

          <Route

            path="/admin"

            element={

              <ProtectedRoute adminOnly={true}>

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