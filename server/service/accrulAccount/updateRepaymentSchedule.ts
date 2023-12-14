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
import addAccrualAccountingEntry from "./addAccrualAccountingEntry";
import { LoanSchedulePeriodData } from "./fetchWaiverInterestRepaymentData";
import { LoanTransactionData } from "./retrieveWaiverLoanTransactions";
import { toMapData } from "./toMapData";
import deriveAccountingBridgeData from "./deriveAccountingBridgeData";
import createJournalEntriesForLoan from "./createJournalEntriesForLoan";



async function updateRepaymentSchedule(
    scheduleAccrualData: LoanScheduleAccrualData
  ): Promise<void> {
    const sql = `
      UPDATE m_loan_repayment_schedule_table
      SET accrual_interest_derived = COALESCE($1, accrual_interest_derived),
          accrual_fee_charges_derived = COALESCE($2, accrual_fee_charges_derived),
          accrual_penalty_charges_derived = COALESCE($3, accrual_penalty_charges_derived)
      WHERE id = $4
    `;
  
    const values = [
      scheduleAccrualData.totalAccInterest,
      scheduleAccrualData.totalAccFee,
      scheduleAccrualData.totalAccPenalty,
      scheduleAccrualData.repaymentScheduleId,
    ];
  
    await connection.query(sql, values);
  }
  
    export default updateRepaymentSchedule;