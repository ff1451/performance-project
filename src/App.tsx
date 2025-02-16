import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/App.css";
import Header from "@/components/Header/Header";
import Home from "@/pages/HomePage/Home";
import PerformanceList from "@/pages/PerformanceListPage/PerformanceListPage";
import PerformanceDetail from "@/pages/PerformanceDetailPage/PerformanceDetailPage";
import Footer from "@/components/Footer/Footer";
import SignUp from "@/pages/SignUpPage/SignUpPage";
import SearchResult from "./pages/SearchPage/SearchPage";
import MyPage from "./pages/MyPage/MyPage";

const queryClient = new QueryClient();
const basename = "/performance-project/";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={basename}>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="performances" element={<PerformanceList />} />
            <Route path="performances/:id" element={<PerformanceDetail />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="search" element={<SearchResult />} />
            <Route path="mypage" element={<MyPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
