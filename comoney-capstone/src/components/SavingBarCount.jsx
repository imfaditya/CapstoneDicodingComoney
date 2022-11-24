import React,  { useState }  from "react";
import savingMoneyIdb from '../data/saving-money-idb';
import activeUser from "../data/active-user";

function SavingBarCount() {

  const [ target, setTarget ] = useState();
  const [ total, setTotal ] = useState();
  const [ loading, setLoading ] = useState(true);
  const [rupias, setRupias] = React.useState([]);

  React.useEffect(function(){
    async function getData(){
      const valueFromDb = await savingMoneyIdb.getAllSavingsMoney();
      const userData = await activeUser.getActiveUser();
      let totalAmount = 0;
      for(let  i = 0; i < valueFromDb.length; i++){
        if(valueFromDb[i].accessToken === userData.accessToken){
                totalAmount += parseFloat(valueFromDb[i].data.amount);
                let number_string = totalAmount.toString().replace(/[^,\d]/g, "")
                let split = number_string.split(",")
                let sisa = split[0].length % 3
                let rupiah = split[0].substr(0, sisa)
                let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

                
                if (ribuan) {
                        let separator = sisa ? "." : "";
                        rupiah += separator + ribuan.join(".");
                }
                rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
                setTotal(rupiah)
                setTarget(valueFromDb.length)
                setLoading(false)
        }else{
                setLoading(true)
        }
      }
    }     
    getData()
  },[]);

  if(loading === false){
        return(
                <div className='mx-4 my-auto'>
                        <p className='fw-bold mb-0'>You have {target} savings target!</p>
                        <p>Total Rp {total}</p>
                </div>
        )
  }else{
        return(
                <div className='mx-4 my-auto'>
                        <p className='fw-bold mb-0'>You  don't have savings target!</p>
                        <p>Go on! Make your target</p>
                </div>
        )
  }
}

export default SavingBarCount;