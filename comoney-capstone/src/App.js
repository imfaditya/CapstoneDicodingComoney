import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Navigation from "./components/Navigation";
import EditIncomeExpense from "./pages/EditIncomeExpense";
import Dashboard from "./pages/Dashboard";
import DetailPage from "./pages/DetailPage";
import Footer from "./components/Footer";
import AddSavingPlan from "./pages/AddSavingPlan";
import NewsDetail from "./pages/NewsDetail";
import NewsListPage from "./pages/NewsListpage";
import SavingPlanner from "./pages/SavingPlanner";
import UserContext from "./context/UserContext";
import LocaleContext from "./context/LocaleContext";
import { getActiveUser } from "./utils/authentication-user";
import EditSavingPlan from "./pages/EditSavingPlan";
import AddTransaction from "./pages/AddTransaction";

function App() {
  const [user, setUser] = React.useState(null);
  const [locale, setLocale] = React.useState("en");

  React.useEffect(() => {
    const checkUser = async () => {
      const dataUser = await getActiveUser();
      setUser(dataUser || null);
    };

    function initialLoad() {
      if (localStorage.getItem("locale") === undefined) {
        localStorage.setItem("locale", "id");
        setLocale("id");
      } else {
        setLocale(localStorage.getItem("locale"));
      }
    }

    checkUser();
    initialLoad();
  }, []);

  const userContextValue = React.useMemo(() => {
    return {
      user,
      setUser,
    };
  }, [user]);

  const toggleLocale = () => {
    const targetLocale = locale === "id" ? "en" : "id";
    setLocale(targetLocale);
    localStorage.setItem("locale", targetLocale);
  };

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  if (user === null) {
    return (
      <UserContext.Provider value={userContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <main>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/*" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
        </LocaleContext.Provider>
      </UserContext.Provider>
    );
  } else {
    return (
      <UserContext.Provider value={userContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <header>
            <Navigation toggleLocale={toggleLocale} />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* <Route path="/add-income" element={<AddIncomePage />} />
              <Route path="/add-expense" element={<AddExpensePage />} /> */}
              <Route path="/add/transaction" element={<AddTransaction />} />
              <Route path="/edit/:id" element={<EditIncomeExpense />} />
              <Route path="/news" element={<NewsListPage />} />
              <Route path="/news/detail" element={<NewsDetail />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/saving-planner" element={<SavingPlanner />} />
              <Route path="/add-saving-plan" element={<AddSavingPlan />} />
              <Route path="/edit-saving-plan/:id" element={<EditSavingPlan />} />
            </Routes>
          </main>
          <Footer />
        </LocaleContext.Provider>
      </UserContext.Provider>
    );
  }
}

export default App;
