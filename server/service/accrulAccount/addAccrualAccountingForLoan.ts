import { LoanScheduleAccrualData } from "../type";
import { GlobalConfigurationPropertyData } from "./type";
import retrieveOrganisationStartDate from "./retrieveOrganisationStartDate";
import retrieveLoanChargesForAccrual from "./retrieveLoanChargesForAccrual";
import fetchWaiverInterestRepaymentData from "./fetchWaiverInterestRepaymentData";
import retrieveWaiverLoanTransactions from "./retrieveWaiverLoanTransactions";
import updateCharges from "./updateCharges";
import updateInterestIncome from "./updateInterestIncome";
import addAccrualAccountingEntry from "./addAccrualAccountingEntry";
import { LoanSchedulePeriodData } from "./fetchWaiverInterestRepaymentData";
import { LoanTransactionData } from "./retrieveWaiverLoanTransactions";



async function addAccrualAccountingForLoan(
    loanId: number,
    loanScheduleAccrualDatas: LoanScheduleAccrualData[]
  ): Promise<void> {
    try {
      const chargeData = await retrieveLoanChargesForAccrual(loanId);
      let loanWaiverScheduleData: LoanSchedulePeriodData[] = [];
      let loanWaiverTransactionData: LoanTransactionData[] = [];
  
      for (const accrualData of loanScheduleAccrualDatas) {
        if (
          accrualData.waivedInterestIncome &&
          loanWaiverScheduleData.length === 0
        ) {
          loanWaiverScheduleData = await fetchWaiverInterestRepaymentData(
            accrualData.loanId
          );
          loanWaiverTransactionData = await retrieveWaiverLoanTransactions(
            accrualData.loanId
          );
        }
        updateCharges(
          chargeData,
          accrualData,
          accrualData.fromDateAsLocaldate,
          accrualData.dueDateAsLocaldate
        );
        updateInterestIncome(
          accrualData,
          loanWaiverTransactionData,
          loanWaiverScheduleData,
          accrualData.dueDateAsLocaldate
        );
        await addAccrualAccountingEntry(accrualData);
      }
    } catch (error) {
      console.error("Error in addAccrualAccounting:", error);
    }
  }

  export default addAccrualAccountingForLoan;