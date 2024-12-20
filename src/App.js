import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';  // Changez ici
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Settings from './pages/Settings/Settings';
import Task from './pages/Task/Task';
import NotFound from './pages/NotFound/NotFound';
import SignIn from './components/UserForm/SignIn';
import SignUp from './components/UserForm/SignUp';
import TaskDetails from './pages/TaskDetails/TaskDetails';
import DefineEquipment from './pages/DefineEquipments/DefineEquipments';
import FAQ from './pages/FAQ/FAQ';
import Tips from './pages/Tips/Tips';
import About from './pages/About/About';
import Confidential from './pages/Legal/Confidential';
import Terms from './pages/Legal/Terms';
import Legal from './pages/Legal/Legal';
import Achievements from './pages/Achievements/Achievements';
import Partner from './pages/Partner/Partner';
import { UserProvider } from './UserContext';
import './styles/base.scss';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/parametres" element={<Settings />} />
              <Route path="/votre-menage" element={<Task />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/votre-menage/:roomName" element={<TaskDetails />} />
              <Route path="/vos-equipements" element={<DefineEquipment />} />
              <Route path="/conseils" element={<Tips />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/conditions" element={<Terms />} />
              <Route path="/confidentialite" element={<Confidential />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/succes" element={<Achievements />} />
              <Route path="/partenaires" element={<Partner />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;