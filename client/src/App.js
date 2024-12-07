import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WorkOrder from "./pages/WorkOrder";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import AllWorkOrdersPage from "./pages/AllWorkOrdersPage";
import Nav from "./components/ui/Nav";
import UsersPage from "./pages/UsersPage";
import TireFormPage from "./pages/TireFormPage";
import ClientPage from "./pages/ClientPage";
import AddClientPage from "./pages/AddClientPage";
import DepartmentByIdPage from "./pages/DepartmentByIdPage";
import { ClientProvider } from "./context/ClientContext";
import { TiresProvider } from "./context/TireContext";
import { WorkOrderProvider } from "./context/WorkOrderContext";
import { AuthProvider } from "./context/AuthContext";
import { DepartmentProvider } from "./context/DepartmentContext";
import DepartmentPage from "./pages/DepartmentPage";

function App() {
  return (
    <AuthProvider>
      <WorkOrderProvider>
        <TiresProvider>
          <ClientProvider>
            <DepartmentProvider>
              <BrowserRouter>
                <Nav>
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/homepage" element={<HomePage />} />
                      <Route path="/allusers" element={<UsersPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route
                        path="/workorders"
                        element={<AllWorkOrdersPage />}
                      />
                      <Route path="/add-tire" element={<TireFormPage />} />
                      <Route path="/workorder/:id" element={<WorkOrder />} />
                      <Route path="/profile/:id" element={<Profile />} />
                      <Route path="/client" element={<ClientPage />} />
                      <Route path="/add-client" element={<AddClientPage />} />
                      <Route path="/department" element={<DepartmentPage />} />
                      <Route path="/department/:id" element={<DepartmentByIdPage />} />
                    </Route>
                  </Routes>
                </Nav>
              </BrowserRouter>
            </DepartmentProvider>
          </ClientProvider>
        </TiresProvider>
      </WorkOrderProvider>
    </AuthProvider>
  );
}

export default App;
