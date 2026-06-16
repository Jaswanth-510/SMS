import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import AdminDashboard from "@/pages/AdminDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import StudentDashboard from "@/pages/StudentDashboard";
import Auth from "./pages/Auth";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";

function ProtectedRoute({ component: Component, requiredRole }: { component: any; requiredRole?: string }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Allow demo access to student and teacher portals
    if (requiredRole === "student" || requiredRole === "teacher") {
      return;
    }
    if (!loading && !user) {
      setLocation("/");
    } else if (!loading && requiredRole && user?.role !== requiredRole) {
      setLocation("/");
    }
  }, [user, loading, requiredRole, setLocation]);

  if (loading && requiredRole !== "student" && requiredRole !== "teacher") {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '3rem', height: '3rem', border: '4px solid #60a5fa', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && requiredRole !== "student" && requiredRole !== "teacher") {
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/register" component={Auth} />
      <Route path="/login" component={Auth} />
      <Route path={"/admin"} component={() => <ProtectedRoute component={AdminDashboard} requiredRole="admin" />} />
      <Route path={"/teacher"} component={() => <ProtectedRoute component={TeacherDashboard} requiredRole="teacher" />} />
      <Route path={"/student"} component={() => <ProtectedRoute component={StudentDashboard} requiredRole="student" />} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
