import { Route, Routes, useNavigate } from "react-router-dom";
import AddAttribute from "../Components/Pages/AddAttribute";
import AddSettingService from "../Components/Pages/AddSettingService";
import AllAppointment from "../Components/Pages/AllAppointment";
import AllBooking from "../Components/Pages/AllBooking";
import AllCategory from "../Components/Pages/AllCategory";
import AllServicesAndRepair from "../Components/Pages/AllServicesAndRepair";
import AddBooking from "../Components/Pages/Booking/AddBooking";
import CancelledHistory from "../Components/Pages/CancelledHistory";
import AddCategory from "../Components/Pages/Category";
import EventPlanner from "../Components/Pages/EventPlanner";
import EventPlannerData from "../Components/Pages/EventPlannerData";
import Inquire from "../Components/Pages/Inquire";
import Login from "../Components/Pages/Login";
import OrderSupplies from "../Components/Pages/OrderSupplies";
import OrderSuppliesData from "../Components/Pages/OrderSuppliesData";
import Other from "../Components/Pages/Others";
import PaymentHistory from "../Components/Pages/PaymentHistory";
import RepairView from "../Components/Pages/ReapirView";
import RefundHistory from "../Components/Pages/RefundHistory";
import Repair from "../Components/Pages/Repair";
import SalesHistory from "../Components/Pages/SalesHistory";
import Services from "../Components/Pages/Services";
import AllSettingService from "../Components/Pages/SettingAllService";
import Users from "../Components/Pages/Users";
import Dashboard from "../Components/Pages/dashboard/dashboard";
import Scheduler from "../Components/Scheduler";
import ViewAllBookingData from "../Components/ViewAllBookingData";
import { useEffect } from "react";
// import AddBookingTwo from "../Components/Pages/Booking/AddBookingTwo";
// import Login from "../Components/Pages/Login";

const Routing = () => {
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem("data"))
  useEffect(() => {
    if (data?.token) {
      navigate("/dashboard")
    }else{
      navigate("/Login")
    }
  }, [])
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/" element={<Dashbo/ard />} /> */}
      <Route path="/Login" element={<Login />} />
      <Route path="/Booking/Add-Booking" element={<AddBooking />} />
      <Route path="/Booking/all-booking" element={<AllBooking />} />
      <Route path="/Booking/all-inquire" element={<Inquire />} />
      <Route path="/Reports/sales-history" element={<SalesHistory />} />
      <Route path="/Booking/view-data/:id" element={<ViewAllBookingData />} />
      <Route path="/Reports/payment-history" element={<PaymentHistory />} />
      <Route path="/Reports/refund-history" element={<RefundHistory />} />
      <Route path="/Reports/cancelled-history" element={<CancelledHistory />} />
      <Route path="/Booking/all-appointment" element={<AllAppointment />} />
      <Route path="/Event/event-planner" element={<EventPlanner />} />
      <Route path="/Event/calendar" element={<Scheduler />} />
      <Route path="/Event/event-planner-data/:id" element={<EventPlannerData />} />
      <Route path="/Order/order-supplies" element={<OrderSupplies />} />
      <Route path="/Repair&Services/repair" element={<Repair />} />
      <Route path="/Repair&Services/services" element={<Services />} />
      <Route path="/Repair&Services/allservicesandrepair" element={<AllServicesAndRepair />} />
      <Route path="/Repair&Services/view" element={<RepairView />} />
      <Route path="/Settings/all-service" element={<AllSettingService />} />
      <Route path="/Settings/add-service" element={<AddSettingService />} />
      <Route path="/Settings/users" element={<Users />} />
      <Route path="/Settings/add-category" element={<AddCategory />} />
      <Route path="/Settings/all-category" element={<AllCategory />} />
      <Route path="/Settings/add-attribute" element={<AddAttribute />} />
      <Route path="/Others/other" element={<Other />} />
      <Route path="/Order/order-supplies-data/:id" element={<OrderSuppliesData />} />
      {/* <Route path="/Settings/all-category" element={<AllCategory />} /> */}
    </Routes>

  );
};

export default Routing;
