import { useState } from "react";
import React from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { BookOpen, BarChart3, CheckCircle, LogOut, User, Mail, Phone, MapPin } from "lucide-react";
import { useLocation } from "wouter";

type TabType = "overview" | "courses" | "attendance" | "grades" | "profile";

export default function StudentDashboard() {
  let { user, logout } = useAuth();
  // Demo mode - use demo user if not authenticated
  if (!user) {
    user = {
      id: 1,
      openId: "demo-student",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "student" as const,
      loginMethod: "demo",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };
  }
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  const { data: studentData } = trpc.students.getById.useQuery({ id: user?.id || 0 }, { enabled: !!user?.id });
  const { data: enrolledCourses } = trpc.courses.list.useQuery();
  const { data: attendanceRecords } = trpc.attendance.getByStudent.useQuery({ studentId: user?.id || 0 }, { enabled: !!user?.id });
  const { data: gradeRecords } = trpc.marks.getByStudent.useQuery({ studentId: user?.id || 0 }, { enabled: !!user?.id });

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  // Demo mode - show portal for all users
  // if (!user || user.role !== "student") {
  //   return (
  //     <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  //       <div style={{ textAlign: 'center' }}>
  //         <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>Access Denied</h1>
  //         <p style={{ color: '#44474e' }}>You do not have permission to access this page.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', backgroundColor: '#031636', color: 'white', padding: '2rem 0', position: 'fixed', height: '100vh', overflow: 'auto' }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.125rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ backgroundColor: '#0058be', width: '2rem', height: '2rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>SMS</div>
            <span>Student Portal</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.25rem' }}>Academic Session 2024</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '2rem' }}>
          {[
            { id: "overview" as const, label: "Dashboard", icon: BarChart3 },
            { id: "courses" as const, label: "My Courses", icon: BookOpen },
            { id: "attendance" as const, label: "Attendance", icon: CheckCircle },
            { id: "grades" as const, label: "Grades", icon: BarChart3 },
            { id: "profile" as const, label: "Profile", icon: User },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  backgroundColor: activeTab === item.id ? '#0058be' : 'transparent',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'background-color 0.2s',
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{ borderTop: '1px solid #2d5a8c', paddingTop: '2rem', marginTop: '2rem' }}>
          <button onClick={handleLogout} style={{ width: '100%', backgroundColor: '#0058be', color: 'white', padding: '0.75rem 1.5rem', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '220px', flex: 1, padding: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>Pinnacle Academy</h1>
            <p style={{ fontSize: '0.875rem', color: '#44474e' }}>Welcome back, {user?.name || 'Student'}</p>
          </div>
          <button onClick={() => setShowProfileModal(true)} style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: '#0058be', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </button>
        </div>

        {/* Profile Modal */}
        {showProfileModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '2rem', maxWidth: '500px', width: '90%', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Profile Details</h2>
                <button onClick={() => setShowProfileModal(false)} style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#44474e' }}>×</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: '#0058be', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '1.5rem', marginRight: '1rem' }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{user?.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#44474e' }}>Student ID: STU001</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#44474e', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Email</label>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>{user?.email}</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#44474e', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Phone</label>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>+1 (555) 123-4567</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#44474e', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Date of Birth</label>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>January 15, 2005</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#44474e', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Enrollment Date</label>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>September 1, 2023</p>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#44474e', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Address</label>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>123 Academic Street, Education City, EC 12345</p>
                </div>
              </div>
              <button onClick={() => setShowProfileModal(false)} style={{ width: '100%', backgroundColor: '#0058be', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>Close</button>
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
              {[
                { icon: BookOpen, label: "Enrolled Courses", value: enrolledCourses?.length || 0 },
                { icon: CheckCircle, label: "Attendance %", value: "94.2%" },
                { icon: BarChart3, label: "GPA", value: "3.8" },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
                    <Icon size={24} style={{ color: '#0058be', marginBottom: '1rem' }} />
                    <p style={{ fontSize: '0.875rem', color: '#44474e', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{stat.label}</p>
                    <p style={{ fontSize: '1.875rem', fontWeight: '700' }}>{stat.value}</p>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Courses</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {enrolledCourses?.slice(0, 3).map((course: any, idx: number) => (
                    <div key={idx} style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem', borderLeft: '3px solid #0058be' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>{course.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#44474e' }}>Code: {course.code}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Attendance Summary</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { subject: "Mathematics", percentage: "96%" },
                    { subject: "Physics", percentage: "92%" },
                    { subject: "Chemistry", percentage: "88%" },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #e1e3e4' }}>
                      <span style={{ fontSize: '0.875rem' }}>{item.subject}</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0058be' }}>{item.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>My Enrolled Courses</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {enrolledCourses?.map((course: any, idx: number) => (
                <div key={idx} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{course.name}</h3>
                      <p style={{ fontSize: '0.75rem', color: '#0058be', fontWeight: '600' }}>{course.code}</p>
                    </div>
                    <span style={{ backgroundColor: '#d1fae5', color: '#059669', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>Active</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#44474e', marginBottom: '1rem', lineHeight: '1.5' }}>{course.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e1e3e4' }}>
                    <span style={{ fontSize: '0.75rem', color: '#44474e' }}>Credits: {course.credits}</span>
                    <span style={{ fontSize: '0.75rem', color: '#44474e' }}>Semester: {course.semester}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Attendance Records</h2>
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e1e3e4', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e1e3e4' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Date</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Course</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords?.slice(0, 10).map((record: any, idx: number) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e1e3e4' }}>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{new Date(record.date).toLocaleDateString()}</td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>Course {record.id}</td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                          <span style={{ backgroundColor: record.status === 'present' ? '#d1fae5' : '#fee2e2', color: record.status === 'present' ? '#059669' : '#dc2626', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'capitalize' }}>
                            {record.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#44474e' }}>-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Grades Tab */}
        {activeTab === "grades" && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Academic Grades</h2>
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e1e3e4', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e1e3e4' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Subject</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Marks</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Grade</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradeRecords?.slice(0, 10).map((grade: any, idx: number) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e1e3e4' }}>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>Subject {grade.id}</td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#0058be' }}>{grade.marksObtained}/{grade.totalMarks}</td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>{grade.grade}</td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{Math.round((grade.marksObtained / grade.totalMarks) * 100)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Student Profile</h2>
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e1e3e4', overflow: 'hidden' }}>
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #e1e3e4' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#0058be', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{user?.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#44474e' }}>Student ID: STU-2024-001</p>
                  </div>
                </div>

                {!editingProfile ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#44474e', marginBottom: '0.5rem' }}>Email</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                        <Mail size={16} style={{ color: '#0058be' }} />
                        {user?.email}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#44474e', marginBottom: '0.5rem' }}>Phone</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                        <Phone size={16} style={{ color: '#0058be' }} />
                        {profileForm.phone || "Not provided"}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#44474e', marginBottom: '0.5rem' }}>Address</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                        <MapPin size={16} style={{ color: '#0058be' }} />
                        {profileForm.address || "Not provided"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input type="text" placeholder="First Name" value={profileForm.firstName} onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })} style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem' }} />
                    <input type="text" placeholder="Last Name" value={profileForm.lastName} onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })} style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem' }} />
                    <input type="email" placeholder="Email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem' }} />
                    <input type="tel" placeholder="Phone" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem' }} />
                    <input type="text" placeholder="Address" value={profileForm.address} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })} style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem', gridColumn: '1 / -1' }} />
                  </form>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e1e3e4' }}>
                  <button onClick={() => setEditingProfile(!editingProfile)} style={{ backgroundColor: '#0058be', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}>
                    {editingProfile ? "Save Changes" : "Edit Profile"}
                  </button>
                  {editingProfile && (
                    <button onClick={() => setEditingProfile(false)} style={{ backgroundColor: 'transparent', color: '#44474e', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
