import { connection } from "../../db/database";
import { LoanTransactionType } from "../type";
import { LoanScheduleAccrualData } from "./type";
import { GlobalConfigurationPropertyData } from "./type";
import retrieveOrganisationStartDate from "./retrieveOrganisationStartDate";
import retrieveLoanChargesForAccrual from "./retrieveLoanChargesForAccrual";
import fetchWaiverInterestRepaymentData from "./fetchWaiverInterestRepaymentData";
import retrieveWaiverLoanTransactions from "./retrieveWaiverLoanTransactions";
import updateCharges from "./updateCharges";
import updateInterestIncome from "./updateInterestIncome";
import { LoanSchedulePeriodData } from "./fetchWaiverInterestRepaymentData";
import { LoanTransactionData } from "./retrieveWaiverLoanTransactions";
import { toMapData } from "./toMapData";

async function updateInterestIncome(
    accrualData: LoanScheduleAccrualData,
    loanWaiverTransactions: LoanTransactionData[],
    loanSchedulePeriods: LoanSchedulePeriodData[],
    tillDate: Date
  ): Promise<void> {
    let interestIncome = accrualData.interestIncome || 0;
  
    if (accrualData.waivedInterestIncome !== null) {
      let recognized = 0;
      let unrecognized = 0;
      let remainingAmt = 0;
  
      const loanTransactionDatas: LoanTransactionData[] = [];
  
      for (const loanTransactionData of loanWaiverTransactions) {
        if (
          !loanTransactionData.dateOf.isAfter(accrualData.fromDateAsLocaldate) ||
          (loanTransactionData.dateOf.isAfter(accrualData.fromDateAsLocaldate) &&
            !loanTransactionData.dateOf.isAfter(accrualData.dueDateAsLocaldate) &&
            !loanTransactionData.dateOf.isAfter(tillDate))
        ) {
          loanTransactionDatas.push(loanTransactionData);
        }
      }
  
      const iterator = loanTransactionDatas[Symbol.iterator]();
  
      for (const loanSchedulePeriodData of loanSchedulePeriods) {
        if (recognized <= 0 && unrecognized <= 0 && iterator.next()) {
          const loanTransactionData = iterator.next().value;
          recognized += loanTransactionData.interestPortion;
          unrecognized += loanTransactionData.unrecognizedIncomePortion;
        }
  
        if (
          loanSchedulePeriodData.periodDueDate < accrualData.dueDateAsLocaldate
        ) {
          remainingAmt += loanSchedulePeriodData.interestWaived;
  
          if (recognized > remainingAmt) {
            recognized -= remainingAmt;
            remainingAmt = 0;
          } else {
            remainingAmt -= recognized;
            recognized = 0;
  
            if (unrecognized >= remainingAmt) {
              unrecognized -= remainingAmt;
              remainingAmt = 0;
            } else if (iterator.next()) {
              remainingAmt -= unrecognized;
              unrecognized = 0;
            }
          }
        }
      }
  
      const interestWaived = accrualData.waivedInterestIncome;
  
      if (interestWaived > recognized) {
        interestIncome -= interestWaived - recognized;
      }
    }
  
    accrualData.accruableIncome = interestIncome;
  }


  export default updateInterestIncome;