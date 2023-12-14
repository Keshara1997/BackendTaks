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





async function insertLoanTransaction(
    scheduleAccrualData: LoanScheduleAccrualData
  ): Promise<void> {
    const sql = `
      INSERT INTO your_loan_transaction_table
      (loan_id, office_id, is_reversed, transaction_type_enum, transaction_date, amount, interest_portion_derived,
      fee_charges_portion_derived, penalty_charges_portion_derived, submitted_on_date)
      VALUES ($1, $2, 0, $3, $4, $5, $6, $7, $8, $9)
    `;
  
    const values = [
      scheduleAccrualData.loanId,
      scheduleAccrualData.officeId,
      LoanTransactionType.ACCRUAL,
      format(scheduleAccrualData.dueDateAsLocaldate || new Date(), "yyyy-MM-dd"), // Assuming dueDateAsLocaldate is a Date object
      scheduleAccrualData.amount,
      scheduleAccrualData.interestPortion,
      scheduleAccrualData.feePortion,
      scheduleAccrualData.penaltyPortion,
      format(new Date(), "2023-11-16"), // Current date
    ];
  
    await connection.query(sql, values);
  }

  export default insertLoanTransaction;