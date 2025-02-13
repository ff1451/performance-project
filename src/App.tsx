import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { Header } from "./components/Header/Header";
import Home from "./pages/HomePage/Home";
import PerformanceListPage from "./pages/PerformanceListPage/PerformanceListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PerformanceDetail from "./pages/PerformanceDetailPage/PerformanceDetailPage";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/SignUp/SignUp";

const queryClient = new QueryClient();
// const basename = "/performance-project";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="performances" element={<PerformanceListPage />} />
            <Route path="performances/:id" element={<PerformanceDetail />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
