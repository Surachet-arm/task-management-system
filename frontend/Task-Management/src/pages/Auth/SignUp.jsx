import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();


  const handleSignUp = async (e) => {
    e.preventDefault();
    
    let profileImageUrl = ''

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");



    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
      });

      const { token, role } = response.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser(response.data)
        if (role === "admin") {
          navigate("/admin/dashboard")
        } else {
          navigate("/user/dashboard")
        }
      }
    } catch (err) {
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
          สมัครสมาชิก
        </h3>

        <p className="text-xs text-slate-600 mt-1 mb-6">
          โปรดใส่ข้อมูลเพื่อสมัครสมาชิก
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="text-sm text-slate-700">
              เพิ่มรูป
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="w-full mt-2 text-sm"
            />
          </div>

          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

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

          <Input
            value={adminInviteToken}
            onChange={({ target }) => setAdminInviteToken(target.value)}
            label="Admin Invite Token (ไม่บังคับ)"
            placeholder="Enter admin token if any"
            type="text"
          />

          {error && (
            <p className="text-red-500 text-xs">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200"
          >
            SIGN UP
          </button>
        </form>

        <p className="text-sm text-slate-700 mt-4 text-center">
          ฉันมีผู้ใช้อยู่แล้ว{" "}
          <Link
            className="font-medium text-indigo-600 underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;