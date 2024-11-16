import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import WorkOrder from "./pages/WorkOrder";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { WorkOrderProvider } from "./context/WorkOrderContext";
import AllWorkOrdersPage from "./pages/AllWorkOrdersPage";
import Nav from "./components/ui/Nav";
import UsersPage from "./pages/UsersPage";
import TireFormPage from "./pages/TireFormPage";
import { TiresProvider } from "./context/TireContext";
import ClientPage from "./pages/ClientPage";
import AddClientPage from "./pages/AddClientPage";
import { ClientProvider } from "./context/ClientContext";

function App() {
  return (
    <AuthProvider>
      <WorkOrderProvider>
        <TiresProvider>
          <ClientProvider>
          <BrowserRouter>
            <Nav>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/homepage" element={<HomePage />} />
                  <Route path="/allusers" element={<UsersPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/workorders" element={<AllWorkOrdersPage />} />
                  <Route path="/add-tire" element={<TireFormPage />} />
                  <Route path="/workorder/:id" element={<WorkOrder />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/client" element={<ClientPage />} />
                  <Route path="/add-client" element={<AddClientPage />} />
                </Route>
              </Routes>
            </Nav>
          </BrowserRouter>
          </ClientProvider>
        </TiresProvider>
      </WorkOrderProvider>
    </AuthProvider>
  );
}

export default App;
