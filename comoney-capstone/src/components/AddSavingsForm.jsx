import React from 'react';
import useInput from '../hooks/UseInput';
import { savingsMoney } from '../utils/authentication-user';
import LocaleContext from '../context/LocaleContext';

function AddSavingForm() {
        const [savingsName, setSavingsName] = useInput('');
	const [amount, setAmount] = useInput('');
        const [targetDate, setTargetDate] = useInput('');
        const { locale } = React.useContext(LocaleContext);

        const onSubmit = async (event) => {
		event.preventDefault()
                savingsMoney(savingsName, amount, targetDate);
	}

	return (
                <form className="my-5" onSubmit={onSubmit}>
                        <input type="text" className="form-control my-4" placeholder={locale === "en" ? "Savings Name" : "Nama Tabungan"} aria-label={locale === "en" ? "Savings Name" : "Nama Tabungan"} value={savingsName} onChange={setSavingsName}/> 
                        <input type="text" className="form-control my-4" placeholder={locale === "en" ? "Amount Target" : "Jumlah Target"} aria-label={locale === "en" ? "Amount Target" : "Jumlah Target"} value={amount} onChange={setAmount}/>
                        <input className="form-control my-4" type="date" value={targetDate} onChange={setTargetDate}/>
                        <button type="submit" className="btn btn-primary btn-lg form-control btn-color">{locale === "en" ? "Add New Savings" : "Tambahkan Tabungan Baru"}</button>
                </form>
	);

}

export default AddSavingForm;