import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navigation from './components/Navigation';
import AddIncomeExpense from './pages/AddIncomExpense';
import EditIncomeExpense from './pages/EditIncomeExpense';
import Dashboard from './pages/Dashboard';
import DetailPage from './pages/DetailPage';
import Footer from './components/Footer';
import AddEditSavingPlan from './pages/AddEditSavingPlan';
import NewsDetail from './pages/NewsDetail';
import NewsListPage from './pages/NewsListpage';
import SavingPlanner from './pages/SavingPlanner';
import UserContext from './context/UserContext';
import activeUser from './data/active-user';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const checkUser = async () => {
      const data = await activeUser.getActiveUser();
      setUser(data || null);
    }
    checkUser();
  }, [])

  const userContextValue = React.useMemo(() => {
    return {
      user,
      setUser,
    }
  }, [user])

  if (user === null) {
    return (
      <UserContext.Provider value={userContextValue}>
        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    );
  } else {
    return (
      <UserContext.Provider value={userContextValue}>
        <header>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-income" element={<AddIncomeExpense />} />
            <Route path="/edit-income" element={<EditIncomeExpense />} />
            <Route path="/news" element={<NewsListPage />} />
            <Route path="/news/detail" element={<NewsDetail />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/saving-planner" element={<SavingPlanner />} />
            <Route path="/edit-saving-plan" element={<AddEditSavingPlan />} />
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    );
  }
}

export default App;