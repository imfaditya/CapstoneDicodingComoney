import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import axios from 'axios';
import images from '../assets/books.png';
import SavingPlan from '../components/SavingPlan';
import SavingBarCount from '../components/SavingBarCount';
import LocaleContext from '../context/LocaleContext';

function SavingPlanner() {
  const [quotes, setQuotes] = React.useState([]);
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    async function getQuotes() {
      const current = Math.floor(Math.random() * 1000);
      const response = await axios.get('https://type.fit/api/quotes');
      setQuotes(response.data[current]);
    }

    getQuotes();
  }, []);
  return (
    <section>
      <div className="container">
        <div className="row bg-saving-color mt-5 mb-5 mx-auto">
          <div className="col-sm-6 px-4">
            <div className="d-flex">
              <img src={images} alt="icon-savings" className="saving-image" />
              <SavingBarCount />
            </div>
          </div>
          <div className="col-sm-6 px-4 my-auto">
            <p className="text-center mx-auto">
              {quotes.text}
              {' '}
              -
              {' '}
              <b>{quotes.author}</b>
            </p>
          </div>
        </div>
        <div className="row mt-5 mb-5 mx-auto">
          <SavingPlan />
        </div>
        <Link to="/add-saving-plan">
          <button type="button" aria-label="add savings" id="addButton" className="addButton" title={locale === 'en' ? 'Add Saving Plan' : 'Tambah Rencana Tabungan'}>
            <FiPlus />
          </button>
        </Link>
      </div>
    </section>
  );
}

export default SavingPlanner;
