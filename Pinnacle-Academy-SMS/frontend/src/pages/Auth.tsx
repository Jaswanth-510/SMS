import React, { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Mail, Lock, User, BookOpen, Users, Hash, Eye, EyeOff, ChevronRight, ArrowRight } from "lucide-react";

type AuthMode = "login" | "register";
type UserRole = "student" | "teacher" | null;

export default function Auth() {
  const [, setLocation] = useLocation();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Student-specific fields
    rollNumber: "",
    class: "",
    section: "",
    dateOfBirth: "",
    // Teacher-specific fields
    employeeId: "",
    specialization: "",
    qualifications: "",
    department: "",
  });

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateLogin = () => {
    if (!loginForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
      toast.error("Valid email is required");
      return false;
    }
    if (!loginForm.password || loginForm.password.length < 6) {
      toast.error("Valid password is required");
      return false;
    }
    return true;
  };

  const validateCommonFields = () => {
    if (!registerForm.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!registerForm.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!registerForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
      toast.error("Valid email is required");
      return false;
    }
    if (!registerForm.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!/^[0-9]{10}$/.test(registerForm.phone)) {
      toast.error("Phone number must be 10 digits");
      return false;
    }
    if (!registerForm.password || registerForm.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateStudentFields = () => {
    if (!validateCommonFields()) return false;
    if (!registerForm.rollNumber.trim()) {
      toast.error("Roll number is required");
      return false;
    }
    if (!registerForm.class.trim()) {
      toast.error("Class is required");
      return false;
    }
    if (!registerForm.section.trim()) {
      toast.error("Section is required");
      return false;
    }
    if (!registerForm.dateOfBirth.trim()) {
      toast.error("Date of birth is required");
      return false;
    }
    return true;
  };

  const validateTeacherFields = () => {
    if (!validateCommonFields()) return false;
    if (!registerForm.employeeId.trim()) {
      toast.error("Employee ID is required");
      return false;
    }
    if (!registerForm.specialization.trim()) {
      toast.error("Specialization is required");
      return false;
    }
    if (!registerForm.qualifications.trim()) {
      toast.error("Qualifications are required");
      return false;
    }
    if (!registerForm.department.trim()) {
      toast.error("Department is required");
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Login successful!");
      setLocation("/");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole === "student" && !validateStudentFields()) {
      return;
    }
    if (selectedRole === "teacher" && !validateTeacherFields()) {
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`${selectedRole === "student" ? "Student" : "Teacher"} registration submitted! Awaiting admin approval.`);
      setAuthMode("login");
      setSelectedRole(null);
      setRegisterForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        rollNumber: "",
        class: "",
        section: "",
        dateOfBirth: "",
        employeeId: "",
        specialization: "",
        qualifications: "",
        department: "",
      });
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "900px", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "600px", overflow: "hidden" }}>
        {/* Left Side - Branding */}
        <div style={{ backgroundColor: "#031636", color: "white", padding: "3rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ backgroundColor: "#0058be", width: "2.5rem", height: "2.5rem", borderRadius: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", fontWeight: "bold" }}>SMS</div>
              <span>Pinnacle Academy</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#cbd5e1", marginBottom: "2rem" }}>Student Management System</p>
          </div>

          <div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "1rem" }}>Welcome to Excellence</h2>
            <p style={{ fontSize: "0.875rem", color: "#cbd5e1", lineHeight: "1.6" }}>
              Pinnacle Academy's comprehensive management system designed to unify administrators, teachers, and students in one seamless digital ecosystem. Access your dashboard, track progress, and achieve academic excellence.
            </p>

            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.75rem", color: "#cbd5e1", marginBottom: "0.5rem", textTransform: "uppercase", fontWeight: "600" }}>For Students</p>
                <p style={{ fontSize: "0.875rem", color: "white" }}>View courses, attendance, and grades</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.75rem", color: "#cbd5e1", marginBottom: "0.5rem", textTransform: "uppercase", fontWeight: "600" }}>For Teachers</p>
                <p style={{ fontSize: "0.875rem", color: "white" }}>Manage classes and student progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div style={{ padding: "3rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", overflowY: "auto", maxHeight: "600px" }}>
          {/* Login Mode */}
          {authMode === "login" && (
            <>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem", color: "#031636" }}>Welcome Back</h2>
              <p style={{ fontSize: "0.875rem", color: "#44474e", marginBottom: "2rem" }}>Sign in to your account to continue</p>

              <form onSubmit={handleLoginSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Email Address</label>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #e1e3e4", borderRadius: "0.375rem", paddingLeft: "0.75rem" }}>
                    <Mail size={18} style={{ color: "#0058be" }} />
                    <input
                      type="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginInputChange}
                      placeholder="you@example.com"
                      style={{
                        flex: 1,
                        padding: "0.75rem",
                        border: "none",
                        fontSize: "0.875rem",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Password</label>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #e1e3e4", borderRadius: "0.375rem", paddingRight: "0.75rem" }}>
                    <Lock size={18} style={{ color: "#0058be", marginLeft: "0.75rem" }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginInputChange}
                      placeholder="••••••••"
                      style={{
                        flex: 1,
                        padding: "0.75rem",
                        border: "none",
                        fontSize: "0.875rem",
                        outline: "none",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", color: "#0058be" }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    backgroundColor: "#0058be",
                    color: "white",
                    padding: "0.875rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    transition: "background-color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#0047a3")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0058be")}
                >
                  {loading ? "Signing in..." : <>Sign In<ArrowRight size={16} /></>}
                </button>
              </form>

              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <p style={{ fontSize: "0.875rem", color: "#44474e" }}>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("register")}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#0058be",
                      fontWeight: "600",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Register here
                  </button>
                </p>
              </div>
            </>
          )}

          {/* Register Mode - Role Selection */}
          {authMode === "register" && !selectedRole && (
            <>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem", color: "#031636" }}>Create Account</h2>
              <p style={{ fontSize: "0.875rem", color: "#44474e", marginBottom: "1.5rem" }}>Choose your role to get started</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                {/* Student Role Card */}
                <button
                  onClick={() => setSelectedRole("student")}
                  style={{
                    backgroundColor: "white",
                    border: "2px solid #e1e3e4",
                    borderRadius: "0.5rem",
                    padding: "1.5rem",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#0058be";
                    e.currentTarget.style.backgroundColor = "#f0f7ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e1e3e4";
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <BookOpen size={32} style={{ color: "#0058be" }} />
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.25rem" }}>Student</h3>
                    <p style={{ fontSize: "0.75rem", color: "#44474e" }}>Access courses & grades</p>
                  </div>
                </button>

                {/* Teacher Role Card */}
                <button
                  onClick={() => setSelectedRole("teacher")}
                  style={{
                    backgroundColor: "white",
                    border: "2px solid #e1e3e4",
                    borderRadius: "0.5rem",
                    padding: "1.5rem",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#0058be";
                    e.currentTarget.style.backgroundColor = "#f0f7ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e1e3e4";
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <Users size={32} style={{ color: "#0058be" }} />
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.25rem" }}>Teacher</h3>
                    <p style={{ fontSize: "0.75rem", color: "#44474e" }}>Manage classes & marks</p>
                  </div>
                </button>
              </div>

              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.875rem", color: "#44474e" }}>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#0058be",
                      fontWeight: "600",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </>
          )}

          {/* Register Mode - Form */}
          {authMode === "register" && selectedRole && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: 0, color: "#031636" }}>Register as {selectedRole === "student" ? "Student" : "Teacher"}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #e1e3e4",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    color: "#44474e",
                  }}
                >
                  Change Role
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit}>
                {/* Common Fields */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={registerForm.firstName}
                      onChange={handleRegisterInputChange}
                      placeholder="John"
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        border: "1px solid #e1e3e4",
                        borderRadius: "0.375rem",
                        fontSize: "0.75rem",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={registerForm.lastName}
                      onChange={handleRegisterInputChange}
                      placeholder="Doe"
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        border: "1px solid #e1e3e4",
                        borderRadius: "0.375rem",
                        fontSize: "0.75rem",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterInputChange}
                    placeholder="you@example.com"
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #e1e3e4",
                      borderRadius: "0.375rem",
                      fontSize: "0.75rem",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Phone (+91) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={registerForm.phone}
                    onChange={handleRegisterInputChange}
                    placeholder="98765 43210"
                    maxLength={10}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #e1e3e4",
                      borderRadius: "0.375rem",
                      fontSize: "0.75rem",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Student-Specific Fields */}
                {selectedRole === "student" && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Roll No *</label>
                        <input
                          type="text"
                          name="rollNumber"
                          value={registerForm.rollNumber}
                          onChange={handleRegisterInputChange}
                          placeholder="2024001"
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #e1e3e4",
                            borderRadius: "0.375rem",
                            fontSize: "0.75rem",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Class *</label>
                        <select
                          name="class"
                          value={registerForm.class}
                          onChange={handleRegisterInputChange}
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #e1e3e4",
                            borderRadius: "0.375rem",
                            fontSize: "0.75rem",
                            boxSizing: "border-box",
                            backgroundColor: "white",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Section *</label>
                        <select
                          name="section"
                          value={registerForm.section}
                          onChange={handleRegisterInputChange}
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #e1e3e4",
                            borderRadius: "0.375rem",
                            fontSize: "0.75rem",
                            boxSizing: "border-box",
                            backgroundColor: "white",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>DOB *</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={registerForm.dateOfBirth}
                          onChange={handleRegisterInputChange}
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #e1e3e4",
                            borderRadius: "0.375rem",
                            fontSize: "0.75rem",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Teacher-Specific Fields */}
                {selectedRole === "teacher" && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Employee ID *</label>
                        <input
                          type="text"
                          name="employeeId"
                          value={registerForm.employeeId}
                          onChange={handleRegisterInputChange}
                          placeholder="TCH001"
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #e1e3e4",
                            borderRadius: "0.375rem",
                            fontSize: "0.75rem",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Specialization *</label>
                        <select
                          name="specialization"
                          value={registerForm.specialization}
                          onChange={handleRegisterInputChange}
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #e1e3e4",
                            borderRadius: "0.375rem",
                            fontSize: "0.75rem",
                            boxSizing: "border-box",
                            backgroundColor: "white",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Biology">Biology</option>
                          <option value="English">English</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Qualifications *</label>
                        <input
                          type="text"
                          name="qualifications"
                          value={registerForm.qualifications}
                          onChange={handleRegisterInputChange}
                          placeholder="B.Sc., B.Ed"
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #e1e3e4",
                            borderRadius: "0.375rem",
                            fontSize: "0.75rem",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Department *</label>
                        <select
                          name="department"
                          value={registerForm.department}
                          onChange={handleRegisterInputChange}
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            border: "1px solid #e1e3e4",
                            borderRadius: "0.375rem",
                            fontSize: "0.75rem",
                            boxSizing: "border-box",
                            backgroundColor: "white",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="Science">Science</option>
                          <option value="Commerce">Commerce</option>
                          <option value="Arts">Arts</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Password Fields */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Password *</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={registerForm.password}
                      onChange={handleRegisterInputChange}
                      placeholder="••••••••"
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        border: "1px solid #e1e3e4",
                        borderRadius: "0.375rem",
                        fontSize: "0.75rem",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.25rem" }}>Confirm *</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterInputChange}
                      placeholder="••••••••"
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        border: "1px solid #e1e3e4",
                        borderRadius: "0.375rem",
                        fontSize: "0.75rem",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    backgroundColor: "#0058be",
                    color: "white",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    marginBottom: "0.75rem",
                  }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#0047a3")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0058be")}
                >
                  {loading ? "Registering..." : "Create Account"}
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  style={{
                    width: "100%",
                    backgroundColor: "#e5e7eb",
                    color: "#031636",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                  }}
                >
                  Back to Login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
