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

import MainLayout from "./layouts/MainLayout"

import ProtectedRoute from "./components/ProtectedRoute"


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* PROTECTED ROUTES */}

        <Route

          element={

            <ProtectedRoute>

              <MainLayout />

            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/upload"
            element={<UploadDataset />}
          />

          <Route
            path="/forecast"
            element={<Forecast />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App