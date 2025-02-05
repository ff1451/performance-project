import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import Home from "./pages/Home/Home";
import PerformanceListPage from "./pages/PerformanceList/PerformanceListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PerformanceDetail from "./pages/PerformanceDetail/PerformanceDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <main className="main">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/performances" element={<PerformanceListPage />} />
            <Route path="/performances/:id" element={<PerformanceDetail />} />
          </Routes>
        </main>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
