import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }
    if (!password) {
      setError("Please enter the password")
      return
    }
    setError("")
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })
      const { token, user } = response.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser(response.data)

        if (user.role === "admin") {
          navigate("/admin/dashboard")
        } else {
          navigate("/user/dashboard")
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("มีบางอย่างผิดพลาด โปรดลองอีกครั้ง")
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm mx-auto flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">
          ยินดีต้อนรับ
        </h3>

        <p className="text-xs text-slate-600 mt-1 mb-6">
          โปรดเข้าสู่ระบบก่อนใช้งาน
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Password"
            type="password"
          />

          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-all"
          >
            LOGIN
          </button>
        </form>

        <p className="text-sm text-slate-700 mt-4 text-center">
          ยังไม่มีผู้ใช้{" "}
          <Link className="font-medium text-indigo-600 underline" to="/signup">
            สมัครสมาชิค
          </Link>
        </p>
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
          <p className="font-semibold mb-2 text-gray-800">
            บัญชีสำหรับทดสอบ
          </p>
          <p>
            <span className="font-medium">สถานะ Admin</span>
          </p>
          <p>
            <span className="font-medium">Email:</span> Pakinz@gmail.com
          </p>
          <p>
            <span className="font-medium">Password:</span> test@123
          </p>
          <p>
            <span className="font-medium">สถานะ User</span>
          </p>
          <p>
            <span className="font-medium">Email:</span> user@gmail.com
          </p>
          <p>
            <span className="font-medium">Password:</span> 123456
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;