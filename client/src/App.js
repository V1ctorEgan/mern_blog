import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ArticleList from "./pages/ArticleList";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

//components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
    <div className="max-w-screen-md mx-auto pt-20">
      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/articles-list" element={<ArticleList />}></Route>
      <Route path="/article/:name" element={<Article />}></Route>
      <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
