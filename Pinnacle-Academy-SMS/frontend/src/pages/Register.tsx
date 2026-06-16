import React, { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Mail, User, BookOpen, Users, Hash, Eye, EyeOff, ChevronRight } from "lucide-react";

type UserRole = "student" | "teacher" | null;

export default function Register() {
  const [, setLocation] = useLocation();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateCommonFields = () => {
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Valid email is required");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error("Phone number must be 10 digits");
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateStudentFields = () => {
    if (!validateCommonFields()) return false;
    if (!formData.rollNumber.trim()) {
      toast.error("Roll number is required");
      return false;
    }
    if (!formData.class.trim()) {
      toast.error("Class is required");
      return false;
    }
    if (!formData.section.trim()) {
      toast.error("Section is required");
      return false;
    }
    if (!formData.dateOfBirth.trim()) {
      toast.error("Date of birth is required");
      return false;
    }
    return true;
  };

  const validateTeacherFields = () => {
    if (!validateCommonFields()) return false;
    if (!formData.employeeId.trim()) {
      toast.error("Employee ID is required");
      return false;
    }
    if (!formData.specialization.trim()) {
      toast.error("Specialization is required");
      return false;
    }
    if (!formData.qualifications.trim()) {
      toast.error("Qualifications are required");
      return false;
    }
    if (!formData.department.trim()) {
      toast.error("Department is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole === "student" && !validateStudentFields()) {
      return;
    }
    if (selectedRole === "teacher" && !validateTeacherFields()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`${selectedRole === "student" ? "Student" : "Teacher"} registration submitted! Awaiting admin approval.`);
      setLocation("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Role Selection Screen
  if (!selectedRole) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "700px" }}>
          {/* Header */}
          <div style={{ backgroundColor: "#031636", color: "white", padding: "2rem", textAlign: "center", borderRadius: "0.5rem 0.5rem 0 0" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
              <div style={{ backgroundColor: "#0058be", width: "2.5rem", height: "2.5rem", borderRadius: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: "bold" }}>SMS</div>
              <span>Pinnacle Academy</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>Registration Portal</p>
          </div>

          {/* Content */}
          <div style={{ padding: "3rem 2rem" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "1rem", textAlign: "center" }}>Choose Your Role</h2>
            <p style={{ fontSize: "0.875rem", color: "#44474e", marginBottom: "2rem", textAlign: "center" }}>Select whether you want to register as a Student or Teacher</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {/* Student Role Card */}
              <button
                onClick={() => setSelectedRole("student")}
                style={{
                  backgroundColor: "white",
                  border: "2px solid #e1e3e4",
                  borderRadius: "0.5rem",
                  padding: "2rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
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
                <BookOpen size={48} style={{ color: "#0058be" }} />
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>Student</h3>
                  <p style={{ fontSize: "0.875rem", color: "#44474e" }}>Register as a student to access courses, attendance, and grades</p>
                </div>
                <ChevronRight size={24} style={{ color: "#0058be", marginTop: "0.5rem" }} />
              </button>

              {/* Teacher Role Card */}
              <button
                onClick={() => setSelectedRole("teacher")}
                style={{
                  backgroundColor: "white",
                  border: "2px solid #e1e3e4",
                  borderRadius: "0.5rem",
                  padding: "2rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
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
                <Users size={48} style={{ color: "#0058be" }} />
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>Teacher</h3>
                  <p style={{ fontSize: "0.875rem", color: "#44474e" }}>Register as a teacher to manage classes, attendance, and marks</p>
                </div>
                <ChevronRight size={24} style={{ color: "#0058be", marginTop: "0.5rem" }} />
              </button>
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <p style={{ fontSize: "0.875rem", color: "#44474e" }}>
                Already have an account?{" "}
                <button
                  onClick={() => setLocation("/login")}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#0058be",
                    fontWeight: "600",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Registration Form Screen
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "600px" }}>
        {/* Header */}
        <div style={{ backgroundColor: "#031636", color: "white", padding: "2rem", textAlign: "center", borderRadius: "0.5rem 0.5rem 0 0" }}>
          <div style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
            <div style={{ backgroundColor: "#0058be", width: "2.5rem", height: "2.5rem", borderRadius: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: "bold" }}>SMS</div>
            <span>Pinnacle Academy</span>
          </div>
          <p style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>{selectedRole === "student" ? "Student" : "Teacher"} Registration Portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: 0 }}>Create Your Account</h2>
            <button
              type="button"
              onClick={() => setSelectedRole(null)}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #e1e3e4",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                cursor: "pointer",
                color: "#44474e",
              }}
            >
              Change Role
            </button>
          </div>
          <p style={{ fontSize: "0.875rem", color: "#44474e", marginBottom: "1.5rem" }}>Fill in your details to register as a {selectedRole === "student" ? "student" : "teacher"}</p>

          {/* Common Fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #e1e3e4",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #e1e3e4",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Email Address *</label>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #e1e3e4", borderRadius: "0.375rem", paddingLeft: "0.75rem" }}>
              <Mail size={18} style={{ color: "#0058be" }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
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

          {/* Phone */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Phone Number (India) *</label>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #e1e3e4", borderRadius: "0.375rem", paddingLeft: "0.75rem", paddingRight: "0.75rem", backgroundColor: "#f8f9fa", minWidth: "70px", height: "2.5rem" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636" }}>+91</span>
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="98765 43210"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #e1e3e4",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    boxSizing: "border-box",
                  }}
                />
                <p style={{ fontSize: "0.75rem", color: "#44474e", marginTop: "0.25rem" }}>Enter 10-digit mobile number</p>
              </div>
            </div>
          </div>

          {/* Student-Specific Fields */}
          {selectedRole === "student" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Roll Number *</label>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #e1e3e4", borderRadius: "0.375rem", paddingLeft: "0.75rem" }}>
                    <Hash size={18} style={{ color: "#0058be" }} />
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleInputChange}
                      placeholder="2024001"
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
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Class *</label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #e1e3e4",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      boxSizing: "border-box",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">Select Class</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Section *</label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #e1e3e4",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      boxSizing: "border-box",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">Select Section</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="D">Section D</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #e1e3e4",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Employee ID *</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="TCH001"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #e1e3e4",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Specialization *</label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #e1e3e4",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      boxSizing: "border-box",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">Select Specialization</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Qualifications *</label>
                  <input
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    placeholder="B.Sc., B.Ed"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #e1e3e4",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #e1e3e4",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      boxSizing: "border-box",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">Select Department</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Password Fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Password *</label>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #e1e3e4", borderRadius: "0.375rem", paddingRight: "0.75rem" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
            <div>
              <label style={{ fontSize: "0.875rem", fontWeight: "600", color: "#031636", display: "block", marginBottom: "0.5rem" }}>Confirm Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #e1e3e4",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Info Box */}
          <div style={{ backgroundColor: "#f0f7ff", border: "1px solid #0058be", borderRadius: "0.375rem", padding: "1rem", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.875rem", color: "#031636", margin: 0 }}>
              <strong>Note:</strong> Your registration will be reviewed by the institution admin. Once approved, you'll have access to your {selectedRole === "student" ? "courses, attendance, and grades" : "assigned classes and student management"}.
            </p>
          </div>

          {/* Submit Button */}
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
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#0047a3")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0058be")}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>

          {/* Login Link */}
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <p style={{ fontSize: "0.875rem", color: "#44474e" }}>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setLocation("/login")}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#0058be",
                  fontWeight: "600",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
