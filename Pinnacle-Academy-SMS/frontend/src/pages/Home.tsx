import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { ArrowRight, Users, BookOpen, CheckCircle, BarChart3, Mail, Phone, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    institution: "",
    message: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.institution || !contactForm.message) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Message sent successfully! We'll get back to you soon.");
    setContactForm({ name: "", email: "", institution: "", message: "" });
  };

  const handleGetStarted = () => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        setLocation("/admin");
      } else if (user.role === "teacher") {
        setLocation("/teacher");
      } else {
        setLocation("/student");
      }
    } else {
      window.location.href = getLoginUrl();
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', color: '#191c1d', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e1e3e4', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: '700' }}>
            <div style={{ backgroundColor: '#031636', color: 'white', width: '2rem', height: '2rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>SMS</div>
            <span>Pinnacle Academy</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#191c1d', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>Features</a>
            <a href="#about" style={{ color: '#191c1d', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>About</a>
            <a href="#contact" style={{ color: '#191c1d', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>Contact</a>
            <button onClick={() => setLocation('/auth')} style={{ backgroundColor: '#0058be', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}>Register / Login</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ backgroundColor: '#031636', color: 'white', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: '#0058be', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>Academic Excellence 2024</div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.2', marginBottom: '1rem' }}>Empowering Education through Intelligence</h1>
            <p style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '2rem', lineHeight: '1.6' }}>The next-generation student management system designed to unify administrators, teachers, and students in one seamless digital ecosystem.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setLocation('/auth')} style={{ backgroundColor: '#0058be', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Register / Login <ArrowRight size={16} /></button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: '#1e3a5f', borderRadius: '0.75rem', padding: '2rem', border: '1px solid #2d5a8c' }}>
              <div style={{ backgroundColor: '#2d5a8c', borderRadius: '0.5rem', padding: '3rem', textAlign: 'center', color: '#cbd5e1' }}>
                <BarChart3 size={64} style={{ margin: '0 auto', marginBottom: '1rem', color: '#0058be' }} />
                <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '3rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {[
            { icon: Users, label: "Active Users", value: "12,450+" },
            { icon: BookOpen, label: "Courses", value: "840+" },
            { icon: CheckCircle, label: "Institutions", value: "150+" },
            { icon: Star, label: "Success Rate", value: "98.2%" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4', textAlign: 'center' }}>
                <Icon size={32} style={{ margin: '0 auto', marginBottom: '1rem', color: '#0058be' }} />
                <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: '#44474e' }}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '4rem 2rem', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Integrated Administrative Suite</h2>
            <p style={{ fontSize: '1rem', color: '#44474e' }}>Modern tools designed to streamline every aspect of educational institution management.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { icon: Users, title: "Student Management", desc: "Comprehensive 360-degree profiles including academic history, behavioral tracking, and extracurricular achievements." },
              { icon: BookOpen, title: "Attendance Tracking", desc: "Real-time attendance monitoring with automated alerts and instant parent notifications." },
              { icon: BarChart3, title: "Marks Management", desc: "Automated report card generation, performance analytics, and GPA calculations." },
              { icon: CheckCircle, title: "Course Management", desc: "Manage syllabus, course materials, and schedules across multiple departments." },
              { icon: Mail, title: "Communication Hub", desc: "Centralized messaging platform for teachers, students, and parents." },
              { icon: Star, title: "Analytics Dashboard", desc: "Data-driven insights for institutional performance and student success metrics." },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
                  <Icon size={32} style={{ color: '#0058be', marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>{feature.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#44474e', lineHeight: '1.5' }}>{feature.desc}</p>
                  <a href="#" style={{ color: '#0058be', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', marginTop: '1rem', display: 'inline-block' }}>Learn more →</a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" style={{ padding: '4rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Trusted by Global Educators</h2>
            <p style={{ fontSize: '1rem', color: '#44474e' }}>Hear from the people using EduPulse every day to shape the future.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { name: "Dr. Sarah Jenkins", title: "Principal, Excellence Academy", text: "EduPulse has completely transformed how we manage our administrative tasks. The automated workflows have saved us countless hours." },
              { name: "Marcus Thornton", title: "Department Head, Science", text: "The attendance and marks management features are exceptional. Tracking student progress has never been this seamless." },
              { name: "Elena Rodriguez", title: "Parent, Green Tech Institute", text: "The communication features keep me informed about my child's progress. It's transparent and incredibly helpful." },
            ].map((testimonial, idx) => (
              <div key={idx} style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e1e3e4' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />)}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#44474e', marginBottom: '1.5rem', lineHeight: '1.6' }}>{testimonial.text}</p>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>{testimonial.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#44474e' }}>{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '4rem 2rem', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Let's Modernize Your Institution</h2>
            <p style={{ fontSize: '1rem', color: '#44474e', marginBottom: '2rem', lineHeight: '1.6' }}>Ready to take the next step? Contact our academic consultants for a personalized walkthrough and institutional assessment.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Mail size={20} style={{ color: '#0058be' }} />
                <span style={{ fontSize: '0.875rem' }}>contact@edupulse.edu</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone size={20} style={{ color: '#0058be' }} />
                <span style={{ fontSize: '0.875rem' }}>+1 (555) 012-3456</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <MapPin size={20} style={{ color: '#0058be' }} />
                <span style={{ fontSize: '0.875rem' }}>123 Academic Plaza, Silicon Valley, CA 94025</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Full Name</label>
              <input type="text" placeholder="John Doe" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Email Address</label>
              <input type="email" placeholder="j.doe@school.edu" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Institution Name</label>
              <input type="text" placeholder="Oxford Excellence High" value={contactForm.institution} onChange={(e) => setContactForm({ ...contactForm, institution: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Inquiry Details</label>
              <textarea placeholder="How can we help you?" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e1e3e4', fontSize: '0.875rem', boxSizing: 'border-box', minHeight: '6rem', fontFamily: 'inherit' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#031636', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600', marginTop: '1rem' }}>Submit Inquiry</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#e7e8e9', padding: '3rem 2rem', borderTop: '1px solid #e1e3e4' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Pinnacle Academy</div>
            <p style={{ fontSize: '0.875rem', color: '#44474e', lineHeight: '1.6' }}>Empowering education through technology. A robust administrative platform for modern academic excellence.</p>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase' }}>Quick Links</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#" style={{ color: '#44474e', textDecoration: 'none', fontSize: '0.875rem' }}>Features</a>
              <a href="#" style={{ color: '#44474e', textDecoration: 'none', fontSize: '0.875rem' }}>Pricing</a>
              <a href="#" style={{ color: '#44474e', textDecoration: 'none', fontSize: '0.875rem' }}>Support</a>
              <a href="#" style={{ color: '#44474e', textDecoration: 'none', fontSize: '0.875rem' }}>API Docs</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase' }}>Contact Info</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="mailto:contact@edupulse.edu" style={{ color: '#44474e', textDecoration: 'none', fontSize: '0.875rem' }}>contact@edupulse.edu</a>
              <a href="tel:+15550123456" style={{ color: '#44474e', textDecoration: 'none', fontSize: '0.875rem' }}>+1 (555) 012-3456</a>
              <a href="#" style={{ color: '#44474e', textDecoration: 'none', fontSize: '0.875rem' }}>Live Chat</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #c5c6cf', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#44474e' }}>© 2024 Pinnacle Academy. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: '#44474e', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#44474e', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: '#44474e', textDecoration: 'none' }}>Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
