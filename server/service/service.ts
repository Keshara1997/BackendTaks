import {format} from "date-fns"
import { connection } from "../db/database"



async function addAccrualAccounting(){
    try{
       const LoanScheduleAccrualData = await retrieveScheduleAccrualData();

       if(LoanScheduleAccrualData.length == 0){
           return "No data to be processed";
       }
       console.log("LoanScheduleAccrualData", LoanScheduleAccrualData);

       for (const accrualData of LoanScheduleAccrualData){
        if(loanDataMap.has(accrualData.loanId)){
            const loanData = loanDataMap.get(accrualData.loanId);
       }
       else{
              const loanData = await retrieveLoanData(accrualData.loanId);
              loanDataMap.set(accrualData.loanId, loanData);
         }
         


    }
}
