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
import Projects from "./pages/Projects"
import ScenarioAnalysis from "./pages/ScenarioAnalysis"
import ExecutiveDashboard from "./pages/ExecutiveDashboard"
import Collaboration from "./pages/Collaboration"
import ForecastHistory from "./pages/ForecastHistory"
import ModelComparison from "./pages/ModelComparison"
import AdvancedAnalytics from "./pages/AdvancedAnalytics"
import AIInsights from "./pages/AIInsights"
import RealtimeMonitor from "./pages/RealtimeMonitor"
import Notifications from "./pages/Notifications"
import AccuracyCenter from "./pages/AccuracyCenter"
import AutomationCenter from "./pages/AutomationCenter"
import DatasetVersionCenter from "./pages/DatasetVersionCenter"
import Organizations from "./pages/Organizations"
import OrganizationUsers from "./pages/OrganizationUsers"
import ForecastApproval from "./pages/ForecastApproval"
import WorkflowAutomation from "./pages/WorkflowAutomation"
import StrategicPlanning from "./pages/StrategicPlanning"
import KPIManagement from "./pages/KPIManagement"
import DataQualityCenter from "./pages/DataQualityCenter"
import ForecastGovernance from "./pages/ForecastGovernance"
import NotificationCenter from "./pages/NotificationCenter"
import ExecutiveCommandCenter from "./pages/ExecutiveCommandCenter"

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
          
          <Route

            path="/projects"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <Projects />

              </ProtectedRoute>
            }
          />

          <Route

            path="/scenario-analysis"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <ScenarioAnalysis />

              </ProtectedRoute>
            }
          />

          <Route

            path="/executive-dashboard"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <ExecutiveDashboard />

              </ProtectedRoute>
            }
          />

          <Route

            path="/collaboration"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <Collaboration />

              </ProtectedRoute>
            }
          />

          <Route

            path="/forecast-history"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <ForecastHistory />

              </ProtectedRoute>
            }
          />

          <Route

            path="/model-comparison"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <ModelComparison />

              </ProtectedRoute>
            }
          />

          <Route

            path="/advanced-analytics"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <AdvancedAnalytics />

              </ProtectedRoute>
            }
          />

          <Route

            path="/ai-insights"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <AIInsights />

              </ProtectedRoute>
            }
          />

          <Route

            path="/realtime-monitor"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <RealtimeMonitor />

              </ProtectedRoute>
            }
          />

          <Route

            path="/notifications"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <Notifications />

              </ProtectedRoute>
            }
          />

          <Route
            path="/accuracy-center"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst",
                  "viewer"
                ]}
              >
                <AccuracyCenter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/automation-center"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst"
                ]}
              >
                <AutomationCenter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dataset-version-center"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst"
                ]}
              >
                <DatasetVersionCenter />
              </ProtectedRoute>
            }
          />

          <Route

            path="/organizations"

            element={

              <ProtectedRoute

                allowedRoles={[

                  "super_admin",

                  "analyst",

                  "viewer"

                ]}
              >

                <Organizations />

              </ProtectedRoute>
            }
          />

          <Route
            path="/organization-users"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst"
                ]}
              >
                <OrganizationUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/forecast-approval"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst"
                ]}
              >
                <ForecastApproval />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workflow-automation"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst"
                ]}
              >
                <WorkflowAutomation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/strategic-planning"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst"
                ]}
              >
                <StrategicPlanning />
              </ProtectedRoute>
            }
          />

          <Route
            path="/kpi-management"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst"
                ]}  
              >
                <KPIManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/data-quality-center"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst"
                ]}
              >
                <DataQualityCenter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/forecast-governance"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst"
                ]}
              >
                <ForecastGovernance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notification-center"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst"
                ]}
              >
                <NotificationCenter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/executive-command-center"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super_admin",
                  "analyst"
                ]}
              >
                <ExecutiveCommandCenter />
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