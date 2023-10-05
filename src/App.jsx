import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContext from './context/contextApi';
import Feed from './components/Feed';
import SearchResult from './components/SearchResult';
import VideoDetails from './components/VideoDetails';
import Header from './components/Header';

const App = () => {

  return (
    <AppContext>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} exact />
          <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
          <Route path="/video/:id" element={<VideoDetails />} />
        </Routes>
      </Router>
    </AppContext>
  );
}

export default App;
