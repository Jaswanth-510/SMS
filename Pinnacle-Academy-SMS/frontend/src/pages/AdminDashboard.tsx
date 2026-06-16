import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";
import React from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Search, X, BarChart3, Users, BookOpen, LogOut, Settings } from "lucide-react";
import { useLocation } from "wouter";

type MenuType = "overview" | "students" | "teachers" | "courses" | "pending";
type ModalType = "addStudent" | "editStudent" | "addTeacher" | "editTeacher" | "addCourse" | "editCourse" | "approvePending" | null;

export default function AdminDashboard() {
  let { user, logout } = useAuth();
  // Demo mode - use demo user if not authenticated
  if (!user) {
    user = {
      id: 3,
      openId: "demo-admin",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin" as const,
      loginMethod: "demo",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };
  }
  
  const [, setLocation] = useLocation();
  const [activeMenu, setActiveMenu] = useState<MenuType>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Form states
  const [studentForm, setStudentForm] = useState({
    rollNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    departmentId: 1,
  });

  const [teacherForm, setTeacherForm] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    departmentId: 1,
  });

  const [courseForm, setCourseForm] = useState({
    code: "",
    name: "",
    description: "",
    credits: 3,
    semester: 1,
    departmentId: 1,
  });

  // Fetch data
  const { data: stats } = trpc.dashboard.getStats.useQuery();
  const { data: students, refetch: refetchStudents } = trpc.students.list.useQuery();
  const { data: teachers, refetch: refetchTeachers } = trpc.teachers.list.useQuery();
  const { data: courses, refetch: refetchCourses } = trpc.courses.list.useQuery();

  // Mutations
  const createStudentMutation = trpc.students.create.useMutation({
    onSuccess: () => {
      toast.success("Student added successfully");
      refetchStudents();
      setModalType(null);
      setStudentForm({ rollNumber: "", firstName: "", lastName: "", email: "", phone: "", address: "", departmentId: 1 });
    },
    onError: (error: any) => toast.error(error.message),
  });

  const updateStudentMutation = trpc.students.update.useMutation({
    onSuccess: () => {
      toast.success("Student updated successfully");
      refetchStudents();
      setModalType(null);
      setSelectedItem(null);
    },
    onError: (error: any) => toast.error(error.message),
  });

  const deleteStudentMutation = trpc.students.delete.useMutation({
    onSuccess: () => {
      toast.success("Student deleted successfully");
      refetchStudents();
    },
    onError: (error: any) => toast.error(error.message),
  });

  const createTeacherMutation = trpc.teachers.create.useMutation({
    onSuccess: () => {
      toast.success("Teacher added successfully");
      refetchTeachers();
      setModalType(null);
      setTeacherForm({ employeeId: "", firstName: "", lastName: "", email: "", specialization: "", departmentId: 1 });
    },
    onError: (error: any) => toast.error(error.message),
  });

  const handleCreateTeacher = () => {
    createTeacherMutation.mutate({
      employeeId: teacherForm.employeeId,
      firstName: teacherForm.firstName,
      lastName: teacherForm.lastName,
      email: teacherForm.email,
      joinDate: new Date(),
      specialization: teacherForm.specialization,
      departmentId: teacherForm.departmentId,
    });
  };

  const updateTeacherMutation = trpc.teachers.update.useMutation({
    onSuccess: () => {
      toast.success("Teacher updated successfully");
      refetchTeachers();
      setModalType(null);
      setSelectedItem(null);
    },
    onError: (error: any) => toast.error(error.message),
  });

  const deleteTeacherMutation = trpc.teachers.delete.useMutation({
    onSuccess: () => {
      toast.success("Teacher deleted successfully");
      refetchTeachers();
    },
    onError: (error: any) => toast.error(error.message),
  });

  const createCourseMutation = trpc.courses.create.useMutation({
    onSuccess: () => {
      toast.success("Course added successfully");
      refetchCourses();
      setModalType(null);
      setCourseForm({ code: "", name: "", description: "", credits: 3, semester: 1, departmentId: 1 });
    },
    onError: (error: any) => toast.error(error.message),
  });

  const updateCourseMutation = trpc.courses.update.useMutation({
    onSuccess: () => {
      toast.success("Course updated successfully");
      refetchCourses();
      setModalType(null);
      setSelectedItem(null);
    },
    onError: (error: any) => toast.error(error.message),
  });

  const deleteCourseMutation = trpc.courses.delete.useMutation({
    onSuccess: () => {
      toast.success("Course deleted successfully");
      refetchCourses();
    },
    onError: (error: any) => toast.error(error.message),
  });

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const filteredStudents = students?.filter((s: any) =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredTeachers = teachers?.filter((t: any) =>
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredCourses = courses?.filter((c: any) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "overview":
        return (
          <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem', color: '#031636' }}>Dashboard Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Total Students</h3>
                  <Users style={{ color: '#0058be', width: '1.5rem', height: '1.5rem' }} />
                </div>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#031636' }}>{stats?.totalStudents || 0}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Total Teachers</h3>
                  <Users style={{ color: '#0058be', width: '1.5rem', height: '1.5rem' }} />
                </div>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#031636' }}>{stats?.totalTeachers || 0}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Total Courses</h3>
                  <BookOpen style={{ color: '#0058be', width: '1.5rem', height: '1.5rem' }} />
                </div>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#031636' }}>{stats?.totalCourses || 0}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Active Users</h3>
                  <BarChart3 style={{ color: '#0058be', width: '1.5rem', height: '1.5rem' }} />
                </div>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#031636' }}>{stats?.activeUsers || 0}</p>
              </div>
            </div>
          </div>
        );

      case "students":
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#031636' }}>Student Management</h2>
              <button onClick={() => setModalType("addStudent")} style={{ backgroundColor: '#0058be', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                <Plus size={16} /> Add Student
              </button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <input type="text" placeholder="Search students..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} />
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Phone</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student: any) => (
                    <tr key={student.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#031636' }}>{student.firstName} {student.lastName}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#031636' }}>{student.email}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#031636' }}>{student.phone}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        <button onClick={() => { setSelectedItem(student); setModalType("editStudent"); }} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>
                          <Edit2 size={16} style={{ color: '#0058be' }} />
                        </button>
                        <button onClick={() => deleteStudentMutation.mutate({ id: student.id })} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={16} style={{ color: '#ef4444' }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "teachers":
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#031636' }}>Teacher Management</h2>
              <button onClick={() => setModalType("addTeacher")} style={{ backgroundColor: '#0058be', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                <Plus size={16} /> Add Teacher
              </button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <input type="text" placeholder="Search teachers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} />
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Specialization</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher: any) => (
                    <tr key={teacher.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#031636' }}>{teacher.firstName} {teacher.lastName}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#031636' }}>{teacher.email}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#031636' }}>{teacher.specialization}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        <button onClick={() => { setSelectedItem(teacher); setModalType("editTeacher"); }} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>
                          <Edit2 size={16} style={{ color: '#0058be' }} />
                        </button>
                        <button onClick={() => deleteTeacherMutation.mutate({ id: teacher.id })} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={16} style={{ color: '#ef4444' }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "courses":
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#031636' }}>Course Management</h2>
              <button onClick={() => setModalType("addCourse")} style={{ backgroundColor: '#0058be', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                <Plus size={16} /> Add Course
              </button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <input type="text" placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} />
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Course Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Code</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Credits</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course: any) => (
                    <tr key={course.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#031636' }}>{course.name}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#031636' }}>{course.code}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#031636' }}>{course.credits}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        <button onClick={() => { setSelectedItem(course); setModalType("editCourse"); }} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>
                          <Edit2 size={16} style={{ color: '#0058be' }} />
                        </button>
                        <button onClick={() => deleteCourseMutation.mutate({ id: course.id })} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={16} style={{ color: '#ef4444' }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', backgroundColor: '#031636', color: 'white', padding: '2rem 0', position: 'fixed', height: '100vh', overflow: 'auto' }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.125rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ backgroundColor: '#0058be', width: '2rem', height: '2rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>SMS</div>
            Admin Portal
          </div>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>Academic Session 2024</p>
        </div>

        <nav style={{ marginBottom: '2rem' }}>
          {[
            { id: 'overview' as MenuType, label: 'Dashboard', icon: BarChart3 },
            { id: 'students' as MenuType, label: 'Students', icon: Users },
            { id: 'teachers' as MenuType, label: 'Teachers', icon: Users },
            { id: 'courses' as MenuType, label: 'Courses', icon: BookOpen },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  textAlign: 'left',
                  backgroundColor: activeMenu === item.id ? '#0058be' : 'transparent',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: activeMenu === item.id ? '600' : '500',
                  transition: 'background-color 0.2s',
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{ borderTop: '1px solid #1f2937', paddingTop: '1rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
          <button onClick={handleLogout} style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '600', justifyContent: 'center' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '220px', flex: 1, padding: '2rem' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: 'white', padding: '1rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#031636' }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: '#0058be', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{user?.name}</span>
          </div>
        </div>

        {/* Content Area */}
        {renderContent()}
      </div>

      {/* Modals */}
      {modalType && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '2rem', maxWidth: '500px', width: '90%', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#031636' }}>
                {modalType === 'addStudent' && 'Add Student'}
                {modalType === 'editStudent' && 'Edit Student'}
                {modalType === 'addTeacher' && 'Add Teacher'}
                {modalType === 'editTeacher' && 'Edit Teacher'}
                {modalType === 'addCourse' && 'Add Course'}
                {modalType === 'editCourse' && 'Edit Course'}
              </h2>
              <button onClick={() => setModalType(null)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            {(modalType === 'addStudent' || modalType === 'editStudent') && (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (modalType === 'addStudent') {
                  createStudentMutation.mutate({ ...studentForm, admissionDate: new Date() });
                } else {
                  updateStudentMutation.mutate({ id: selectedItem.id, data: { firstName: studentForm.firstName, lastName: studentForm.lastName, email: studentForm.email, phone: studentForm.phone, address: studentForm.address } });
                }
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#031636' }}>First Name</label>
                  <input type="text" value={studentForm.firstName} onChange={(e) => setStudentForm({ ...studentForm, firstName: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#031636' }}>Last Name</label>
                  <input type="text" value={studentForm.lastName} onChange={(e) => setStudentForm({ ...studentForm, lastName: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#031636' }}>Email</label>
                  <input type="email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#031636' }}>Phone</label>
                  <input type="tel" value={studentForm.phone} onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="submit" style={{ flex: 1, backgroundColor: '#0058be', color: 'white', padding: '0.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>
                    {modalType === 'addStudent' ? 'Add' : 'Update'}
                  </button>
                  <button type="button" onClick={() => setModalType(null)} style={{ flex: 1, backgroundColor: '#e5e7eb', color: '#031636', padding: '0.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {(modalType === 'addTeacher' || modalType === 'editTeacher') && (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (modalType === 'addTeacher') {
                  handleCreateTeacher();
                } else {
                  updateTeacherMutation.mutate({ id: selectedItem.id, data: { firstName: teacherForm.firstName, lastName: teacherForm.lastName, email: teacherForm.email, specialization: teacherForm.specialization } });
                }
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#031636' }}>First Name</label>
                  <input type="text" value={teacherForm.firstName} onChange={(e) => setTeacherForm({ ...teacherForm, firstName: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#031636' }}>Last Name</label>
                  <input type="text" value={teacherForm.lastName} onChange={(e) => setTeacherForm({ ...teacherForm, lastName: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#031636' }}>Specialization</label>
                  <input type="text" value={teacherForm.specialization} onChange={(e) => setTeacherForm({ ...teacherForm, specialization: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="submit" style={{ flex: 1, backgroundColor: '#0058be', color: 'white', padding: '0.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>
                    {modalType === 'addTeacher' ? 'Add' : 'Update'}
                  </button>
                  <button type="button" onClick={() => setModalType(null)} style={{ flex: 1, backgroundColor: '#e5e7eb', color: '#031636', padding: '0.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {(modalType === 'addCourse' || modalType === 'editCourse') && (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (modalType === 'addCourse') {
                  createCourseMutation.mutate(courseForm);
                } else {
                  updateCourseMutation.mutate({ id: selectedItem.id, data: { name: courseForm.name, description: courseForm.description, credits: courseForm.credits } });
                }
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#031636' }}>Course Name</label>
                  <input type="text" value={courseForm.name} onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#031636' }}>Course Code</label>
                  <input type="text" value={courseForm.code} onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#031636' }}>Credits</label>
                  <input type="number" value={courseForm.credits} onChange={(e) => setCourseForm({ ...courseForm, credits: parseInt(e.target.value) })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem' }} required />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="submit" style={{ flex: 1, backgroundColor: '#0058be', color: 'white', padding: '0.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>
                    {modalType === 'addCourse' ? 'Add' : 'Update'}
                  </button>
                  <button type="button" onClick={() => setModalType(null)} style={{ flex: 1, backgroundColor: '#e5e7eb', color: '#031636', padding: '0.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
