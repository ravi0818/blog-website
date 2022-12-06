import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavigationBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AdminAuthGuard from "./utils/AdminAuthGuard";
import UserAuthGuard from "./utils/UserAuthGuard";
import Footer from "./components/Footer";
import Update from "./pages/Update";
import NewPost from "./pages/NewPost";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="py-8" style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/newpost"
              element={
                <UserAuthGuard>
                  <NewPost />
                </UserAuthGuard>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route
              path="/admin-dashboard"
              element={
                <AdminAuthGuard>
                  <AdminDashboard />
                </AdminAuthGuard>
              }
            />
            <Route
              path="/dashboard"
              element={
                <UserAuthGuard>
                  <UserDashboard />
                </UserAuthGuard>
              }
            />
            <Route
              path="/update"
              element={
                // <UserAuthGuard>
                <Update />
                // </UserAuthGuard>
              }
            />
            <Route
              path="/admin/posts/:id"
              element={
                <AdminAuthGuard>
                  <Post />
                </AdminAuthGuard>
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
