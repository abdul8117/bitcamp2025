import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TitlePage from "./pages/TitlePage/TitlePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import GroupoptionPage from "./pages/GroupoptionPage/GroupoptionPage";
import ChoosepetPage from "./pages/ChoosepetPage/ChoosepetPage";
import EdittaskPage from "./pages/EdittaskPage/EdittaskPage";
import JoingroupPage from "./pages/JoingroupPage/JoingroupPage";
import MakinggroupPage from "./pages/MakinggroupPage/MakinggroupPage";
import TaskcreationPage from "./pages/TaskcreationPage/TaskcreationPage";
import TasklistPage from "./pages/TasklistPage/TasklistPage";

// import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/groupoption" element={<GroupoptionPage />} />
        <Route path="/choosepet" element={<ChoosepetPage />} />
        <Route path="/edittask" element={<EdittaskPage />} />
        <Route path="/joingroup" element={<JoingroupPage />} />
        <Route path="/makinggroup" element={<MakinggroupPage />} />
        <Route path="/taskcreation" element={<TaskcreationPage />} />
        <Route path="/tasklist" element={<TasklistPage />} />

        <></>
      </Routes>
    </Router>
  );
}

export default App;
