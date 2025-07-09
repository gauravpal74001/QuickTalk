import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import LayoutLoader from "./components/layout/LayoutLoader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chats = lazy(() => import("./pages/Chats"));
const Groups = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(()=>import("./pages/admin/AdminDashboard"));
const AdminLogin = lazy(()=>import("./pages/admin/AdminLogin"));
const AdminUsers = lazy(()=>import("./pages/admin/AdminUsers"));
const AdminManageGroup = lazy(()=>import("./pages/admin/AdminManageGroup"));
const AdminChats = lazy(()=>import("./pages/admin/AdminChats"));

const user = true;

const App = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<LayoutLoader/>}>
    <Routes>
        <Route element={<ProtectedRoute user={user} redirect={"/login"} />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:id" element={<Chats />} />
          <Route path="/groups" element={<Groups />} />
        </Route>

        <Route element={<ProtectedRoute user={!user} redirect={"/"} />}>
           <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/users" element={<AdminUsers/>} />
        <Route path="/admin/manage-groups" element={<AdminManageGroup/>} />
        <Route path="/admin/chats" element={<AdminChats/>} />
      

        <Route path="*" element={<NotFound/>} /> 

      </Routes>
    </Suspense>
    </BrowserRouter>
  );
};

export default App;
