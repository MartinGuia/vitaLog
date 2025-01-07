import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WorkOrder from "./pages/WorkOrder";
import EditUserPage from "./pages/EditUserPage";
import ProtectedRoute from "./ProtectedRoute";
import AllWorkOrdersPage from "./pages/AllWorkOrdersPage";
import Nav from "./components/ui/Nav";
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
import CreateWorkOrderPage from "./pages/CreateWorkOrderPage";
import ClientByIdPage from "./pages/ClientByIdPage";
import ProductionPage from "./pages/ProductionPage";
import EditTirePage from "./pages/EditTirePage";
import ExampleCode from "./pages/ExampleCode";
import FirstEditProduction from "./pages/FirstEditProduction";
import FirstInspectionPage from "./pages/FirstInspectionPage";
import SecondInspectionPage from "./pages/SecondInspectionPage";
import SecondEditProduction from "./pages/SecondEditProduction";
import FinalEditProduction from "./pages/FinalEditProduction";
import FinalInspectionProduction from "./pages/FinalInspectionProduction";

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
                      <Route path="/register" element={<RegisterPage />} />
                      <Route
                        path="/workorders"
                        element={<AllWorkOrdersPage />}
                      />
                      <Route path="/add-tire" element={<TireFormPage />} />
                      <Route path="/workorder/:id" element={<WorkOrder />} />
                      <Route path="/profile/:id" element={<EditUserPage />} />
                      <Route path="/clients" element={<ClientPage />} />
                      <Route path="/add-client" element={<AddClientPage />} />
                      <Route path="/departments" element={<DepartmentPage />} />
                      <Route path="/department/:id" element={<DepartmentByIdPage />} />
                      <Route path="/createWorkOrder" element={<CreateWorkOrderPage />} />
                      <Route path="/client/:id" element={<ClientByIdPage />} />
                      <Route path="production" element={<ProductionPage />} />
                      <Route path="/tire/:id" element={<EditTirePage />} />
                      <Route path="/example" element={<ExampleCode />} />
                      <Route path="/productionInitial" element={< FirstInspectionPage />} />
                      <Route path="/editInitial/:id" element={<FirstEditProduction/>} />
                      <Route path="/productionRepairs" element={<SecondInspectionPage />} />
                      <Route path="/editRepairs/:id" element={<SecondEditProduction />} />
                      <Route path="/productionFinal" element={<FinalInspectionProduction />} />
                      <Route path="/editFinal/:id" element={<FinalEditProduction />} />

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
