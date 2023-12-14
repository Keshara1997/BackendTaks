import { LoanScheduleAccrualData } from "../../service/type";
import { LoanTransactionType } from "../../service/type";
import addAccrualAccountingQuery from "./addAccrualAccountingQuery;
import { LoanTransactionType } from "../../service/type;




async function addAccrualAccountingEntry(
    accrualData: LoanScheduleAccrualData
  ): Promise<void> {
    let amount = 0;
    let interestPortion: number | null = null;
    let totalAccInterest: number | null = null;
  
    if (accrualData.accruableIncome !== null) {
      interestPortion = accrualData.accruableIncome;
      totalAccInterest = interestPortion;
  
      if (accrualData.accruedInterestIncome !== null) {
        interestPortion -= accrualData.accruedInterestIncome;
      }
  
      amount += interestPortion;
  
      if (interestPortion === 0) {
        interestPortion = null;
      }
    }
  
    let feePortion: number | null = null;
    let totalAccFee: number | null = null;
  
    if (accrualData.dueDateFeeIncome !== null) {
      feePortion = accrualData.dueDateFeeIncome;
      totalAccFee = feePortion;
  
      if (accrualData.accruedFeeIncome !== null) {
        feePortion -= accrualData.accruedFeeIncome;
      }
  
      amount += feePortion;
  
      if (feePortion === 0) {
        feePortion = null;
      }
    }
  
    let penaltyPortion: number | null = null;
    let totalAccPenalty: number | null = null;
  
    if (accrualData.dueDatePenaltyIncome !== null) {
      penaltyPortion = accrualData.dueDatePenaltyIncome;
      totalAccPenalty = penaltyPortion;
  
      if (accrualData.accruedPenaltyIncome !== null) {
        penaltyPortion -= accrualData.accruedPenaltyIncome;
      }
  
      amount += penaltyPortion;
  
      if (penaltyPortion === 0) {
        penaltyPortion = null;
      }
    }
  
    if (amount > 0) {
      await addAccrualAccountingQuery(
        accrualData.loanId,
        accrualData.officeId,
        LoanTransactionType.ACCRUAL,
        accrualData.dueDateAsLocaldate,
        amount,
        interestPortion,
        feePortion,
        penaltyPortion
      );
    }
  }


  export default addAccrualAccountingEntry;