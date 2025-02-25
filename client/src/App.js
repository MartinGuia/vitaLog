import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddUserPage from "./pages/AddUserPage";
import ViewWorkOrder from "./pages/ViewWorkOrder";
import EditUserPage from "./pages/EditUserPage";
import ProtectedRoute from "./ProtectedRoute";
import AllWorkOrdersPage from "./pages/AllWorkOrdersPage";
import Nav from "./components/ui/Nav";
import AddTireToWO from "./pages/AddTireToWO";
import AllClientPage from "./pages/AllClientPage";
import AddClientPage from "./pages/AddClientPage";
import ViewDepartmentByIdPage from "./pages/ViewDepartmentByIdPage";
import AllDepartmentsPage from "./pages/AllDepartmentsPage";
import CreateWorkOrderPage from "./pages/CreateWorkOrderPage";
import EditClientPage from "./pages/EditClientPage";
import ProductionPage from "./pages/ProductionPage";
import EditTirePage from "./pages/EditTirePage";
import EditInitialPage from "./pages/EditInitialPage";
import ScannerInitialPage from "./pages/ScannerInitialPage";
import ScannerInspectionPage from "./pages/ScannerInspectionPage";
import EditRepairsPage from "./pages/EditRepairsPage";
import EditFinalPage from "./pages/EditFinalPage";
import ScannerFinalProduction from "./pages/ScannerFinalProduction";
import CreateDeliveryOrderPage from "./pages/CreateDeliveryOrderPage";
import AddTiresPage from "./pages/AddTiresPage";
import AllDeliveryOrders from "./pages/AllDeliveryOrders";
import ViewDeliveryOrderPage from "./pages/ViewDeliveryOrderPage";

import { ClientProvider } from "./context/ClientContext";
import { TiresProvider } from "./context/TireContext";
import { WorkOrderProvider } from "./context/WorkOrderContext";
import { AuthProvider } from "./context/AuthContext";
import { DepartmentProvider } from "./context/DepartmentContext";
import { DeliveryOrderProvider } from "./context/DeliveryOrderContext";
import { Provider } from "react-redux";
import store from "./store";
import PrintLabel from "./pages/PrintLabel";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <WorkOrderProvider>
          <TiresProvider>
            <ClientProvider>
              <DepartmentProvider>
                <DeliveryOrderProvider>
                  <BrowserRouter>
                    <Nav>
                      <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route element={<ProtectedRoute />}>
                          <Route path="/register" element={<AddUserPage />} />
                          <Route
                            path="/workorders"
                            element={<AllWorkOrdersPage />}
                          />
                          <Route path="/add-tire" element={<AddTireToWO />} />
                          <Route
                            path="/workorder/:id"
                            element={<ViewWorkOrder />}
                          />
                          <Route
                            path="/profile/:id"
                            element={<EditUserPage />}
                          />
                          <Route path="/clients" element={<AllClientPage />} />
                          <Route
                            path="/add-client"
                            element={<AddClientPage />}
                          />
                          <Route
                            path="/departments"
                            element={<AllDepartmentsPage />}
                          />
                          <Route
                            path="/department/:id"
                            element={<ViewDepartmentByIdPage />}
                          />
                          <Route
                            path="/createWorkOrder"
                            element={<CreateWorkOrderPage />}
                          />
                          <Route
                            path="/client/:id"
                            element={<EditClientPage />}
                          />
                          <Route
                            path="production"
                            element={<ProductionPage />}
                          />
                          <Route path="/tire/:id" element={<EditTirePage />} />
                          <Route
                            path="/productionInitial"
                            element={<ScannerInitialPage />}
                          />
                          <Route
                            path="/editInitial/:id"
                            element={<EditInitialPage />}
                          />
                          <Route
                            path="/productionRepairs"
                            element={<ScannerInspectionPage />}
                          />
                          <Route
                            path="/editRepairs/:id"
                            element={<EditRepairsPage />}
                          />
                          <Route
                            path="/productionFinal"
                            element={<ScannerFinalProduction />}
                          />
                          <Route
                            path="/editFinal/:id"
                            element={<EditFinalPage />}
                          />
                          <Route
                            path="/deliveryOrders"
                            element={<CreateDeliveryOrderPage />}
                          />
                          <Route path="/add-tires" element={<AddTiresPage />} />
                          <Route
                            path="/allDeliveryOrders"
                            element={<AllDeliveryOrders />}
                          />
                          <Route
                            path="/viewDeliveryOrder/:id"
                            element={<ViewDeliveryOrderPage />}
                          />
                          <Route
                            path="/printlabel/:id"
                            element={<PrintLabel />}
                          />
                          <Route path="/reports" element={<ReportPage/>}/>
                        </Route>
                      </Routes>
                    </Nav>
                  </BrowserRouter>
                </DeliveryOrderProvider>
              </DepartmentProvider>
            </ClientProvider>
          </TiresProvider>
        </WorkOrderProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
