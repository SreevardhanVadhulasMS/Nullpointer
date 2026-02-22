import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import StudyPlan from "./pages/StudyPlan";
import DSASheet from "./pages/Dsasheet";
import Community from "./pages/Community";
import Articles from "./pages/Articles";
import Aptitude from "./pages/Aptitude";
import SoftSkills from "./pages/SoftSkills";
import OperatingSystem from "./pages/OperatingSystem"
import ComputerNetworks from "./pages/ComputerNetworks";
import SystemDesign from "./pages/SystemDesign";
import Dbms from "./pages/Dbms";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/study-plan"
        element={
          <ProtectedRoute>
            <AppLayout>
              <StudyPlan />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/study-plan/dsa"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DSASheet />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/study-plan/aptitude"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Aptitude />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/study-plan/softskills"
        element={
          <ProtectedRoute>
            <AppLayout>
              <SoftSkills />
            </AppLayout>
          </ProtectedRoute>
        }
      />

     <Route
        path="/study-plan/operatingsystem"
        element={
          <ProtectedRoute>
            <AppLayout>
              <OperatingSystem />
            </AppLayout>
          </ProtectedRoute>
        }
      />

       <Route
        path="/study-plan/computernetworks"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ComputerNetworks />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      
       <Route
        path="/study-plan/dbms"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dbms />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      
       <Route
        path="/study-plan/systemdesign"
        element={
          <ProtectedRoute>
            <AppLayout>
              <SystemDesign />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Community />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/articles"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Articles />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <AppLayout>
        <Profile />
      </AppLayout>
    </ProtectedRoute>
  }
/>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
