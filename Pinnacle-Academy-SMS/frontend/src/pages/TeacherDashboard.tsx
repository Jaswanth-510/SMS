import { useState } from "react";
import React from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { BookOpen, Users, CheckCircle, LogOut, BarChart3, Edit2, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

type TabType = "overview" | "courses" | "students" | "attendance" | "marks";

export default function TeacherDashboard() {
  let { user, logout } = useAuth();
  // Demo mode - use demo user if not authenticated
  if (!user) {
    user = {
      id: 2,
      openId: "demo-teacher",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "teacher" as const,
      loginMethod: "demo",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };
  }
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({ studentId: 0, status: "present" as const });
  const [marksForm, setMarksForm] = useState({ studentId: 0, marksObtained: 0, totalMarks: 100 });

  const { data: courses } = trpc.courses.list.useQuery();
  const { data: students } = trpc.students.list.useQuery();
  const { data: attendanceRecords } = trpc.attendance.getByStudent.useQuery({ studentId: 0 });
  const { data: markRecords } = trpc.marks.getByStudent.useQuery({ studentId: 0 });

  const markAttendanceMutation = trpc.attendance.mark.useMutation({
    onSuccess: () => {
      toast.success("Attendance marked successfully");
      setAttendanceForm({ studentId: 0, status: "present" });
    },
    onError: (error: any) => toast.error(error.message),
  });

  const createMarkMutation = trpc.marks.create.useMutation({
    onSuccess: () => {
      toast.success("Marks recorded successfully");
      setMarksForm({ studentId: 0, marksObtained: 0, totalMarks: 100 });
    },
    onError: (error: any) => toast.error(error.message),
  });

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  // Demo mode - show portal for all users
  // if (!user || user.role !== "teacher") {
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
            <span>Teacher Portal</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.25rem' }}>Academic Session 2024</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '2rem' }}>
          {[
            { id: "overview" as const, label: "Dashboard", icon: BarChart3 },
            { id: "courses" as const, label: "My Courses", icon: BookOpen },
            { id: "students" as const, label: "My Students", icon: Users },
            { id: "attendance" as const, label: "Attendance", icon: CheckCircle },
            { id: "marks" as const, label: "Marks", icon: BarChart3 },
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
            <p style={{ fontSize: '0.875rem', color: '#44474e' }}>Welcome back, {user?.name || 'Teacher'}</p>
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
                  <p style={{ fontSize: '0.875rem', color: '#44474e' }}>Teacher ID: TCH001</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#44474e', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Email</label>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>{user?.email}</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#44474e', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Phone</label>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>+1 (555) 987-6543</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#44474e', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Specialization</label>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Mathematics</p>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#44474e', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Join Date</label>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>August 15, 2022</p>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#44474e', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Qualifications</label>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>M.Sc. Mathematics, B.Ed</p>
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
                { icon: BookOpen, label: "Teaching Courses", value: courses?.length || 0 },
                { icon: Users, label: "Total Students", value: students?.length || 0 },
                { icon: CheckCircle, label: "Avg Attendance", value: "91.5%" },
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

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Your Courses</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {courses?.slice(0, 5).map((course: any, idx: number) => (
                  <div key={idx} style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '0.5rem', borderLeft: '3px solid #0058be', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>{course.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#44474e' }}>Code: {course.code} | Credits: {course.credits}</p>
                    </div>
                    <button style={{ backgroundColor: '#0058be', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}>View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>My Assigned Courses</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {courses?.map((course: any, idx: number) => (
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

        {/* Students Tab */}
        {activeTab === "students" && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>My Students</h2>
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e1e3e4', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e1e3e4' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Name</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Roll Number</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Email</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Attendance</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students?.map((student: any, idx: number) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e1e3e4' }}>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{student.firstName} {student.lastName}</td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#0058be', fontWeight: '600' }}>{student.rollNumber}</td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{student.email}</td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>92%</td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}><span style={{ backgroundColor: '#d1fae5', color: '#059669', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>Active</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Mark Attendance</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Attendance Records</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e1e3e4' }}>
                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Date</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Student</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceRecords?.slice(0, 10).map((record: any, idx: number) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e1e3e4' }}>
                          <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{new Date(record.date).toLocaleDateString()}</td>
                          <td style={{ padding: '1rem', fontSize: '0.875rem' }}>Student {record.id}</td>
                          <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                            <span style={{ backgroundColor: record.status === 'present' ? '#d1fae5' : '#fee2e2', color: record.status === 'present' ? '#059669' : '#dc2626', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'capitalize' }}>
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Quick Mark</h3>
                <form onSubmit={(e) => { e.preventDefault(); markAttendanceMutation.mutate({ courseId: 1, studentId: attendanceForm.studentId, attendanceDate: new Date(), status: attendanceForm.status }); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <select value={attendanceForm.studentId} onChange={(e) => setAttendanceForm({ ...attendanceForm, studentId: parseInt(e.target.value) })} style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem' }}>
                    <option value={0}>Select Student</option>
                    {students?.map((s: any) => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
                  </select>
                  <select value={attendanceForm.status} onChange={(e) => setAttendanceForm({ ...attendanceForm, status: e.target.value as any })} style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem' }}>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="leave">Leave</option>
                  </select>
                  <button type="submit" style={{ backgroundColor: '#0058be', color: 'white', padding: '0.75rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}>Mark Attendance</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Marks Tab */}
        {activeTab === "marks" && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Manage Marks</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Student Marks</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e1e3e4' }}>
                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Student</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Marks</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Grade</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#44474e' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {markRecords?.slice(0, 10).map((mark: any, idx: number) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e1e3e4' }}>
                          <td style={{ padding: '1rem', fontSize: '0.875rem' }}>Student {mark.id}</td>
                          <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#0058be' }}>{mark.marksObtained}/{mark.totalMarks}</td>
                          <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>{mark.grade}</td>
                          <td style={{ padding: '1rem', fontSize: '0.875rem', display: 'flex', gap: '0.5rem' }}>
                            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#0058be' }}><Edit2 size={16} /></button>
                            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#dc2626' }}><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Add Marks</h3>
                <form onSubmit={(e) => { e.preventDefault(); createMarkMutation.mutate({ courseId: 1, studentId: marksForm.studentId, subjectId: 1, marksObtained: marksForm.marksObtained, maxMarks: marksForm.totalMarks, grade: 'A' }); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <select value={marksForm.studentId} onChange={(e) => setMarksForm({ ...marksForm, studentId: parseInt(e.target.value) })} style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem' }}>
                    <option value={0}>Select Student</option>
                    {students?.map((s: any) => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
                  </select>
                  <input type="number" placeholder="Marks Obtained" value={marksForm.marksObtained} onChange={(e) => setMarksForm({ ...marksForm, marksObtained: parseInt(e.target.value) })} style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem' }} />
                  <input type="number" placeholder="Total Marks" value={marksForm.totalMarks} onChange={(e) => setMarksForm({ ...marksForm, totalMarks: parseInt(e.target.value) })} style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem' }} />
                  <button type="submit" style={{ backgroundColor: '#0058be', color: 'white', padding: '0.75rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}>Add Marks</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
