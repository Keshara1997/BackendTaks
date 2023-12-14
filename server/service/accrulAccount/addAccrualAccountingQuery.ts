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



async function addAccrualAccountingQuery(
    loanId: number,
    officeId: number,
    transactionType: LoanTransactionType,
    transactionDate: Date,
    amount: number,
    interestPortion: number | null,
    feePortion: number | null,
    penaltyPortion: number | null
  ): Promise<void> {
    const transactionSql = `
      INSERT INTO m_loan_transaction
      (loan_id, office_id, is_reversed, transaction_type_enum, transaction_date, amount, interest_portion_derived, fee_charges_portion_derived, penalty_charges_portion_derived, submitted_on_date)
      VALUES ($1, $2, false, $3, $4, $5, $6, $7, $8, CURRENT_DATE)
      RETURNING id
    `;
  
    const { rows } = await connection.query(transactionSql, [
      loanId,
      officeId,
      transactionType,
      transactionDate,
      amount,
      interestPortion,
      feePortion,
      penaltyPortion,
    ]);
  
    const transactionId = rows[0].id;
  
    const applicableCharges = accrualData.applicableCharges;
  
    const chargesPaidSql = `
      INSERT INTO m_loan_charge_paid_by
      (loan_transaction_id, loan_charge_id, amount, installment_number)
      VALUES ($1, $2, $3, $4)
    `;
  
    for (const [loanCharge, amount] of applicableCharges.entries()) {
      await connection.query(chargesPaidSql, [
        transactionId,
        loanCharge.id,
        amount,
        accrualData.installmentNumber,
      ]);
    }
  
    const transactionMap = toMapData(
      transactionId,
      amount,
      interestPortion,
      feePortion,
      penaltyPortion,
      accrualData
    );
  
    const repaymentUpdateSql = `
      UPDATE m_loan_repayment_schedule
      SET accrual_interest_derived = $1, accrual_fee_charges_derived = $2, accrual_penalty_charges_derived = $3
      WHERE id = $4
    `;
  
    await connection.query(repaymentUpdateSql, [
      accrualData.totalAccInterest,
      accrualData.totalAccFee,
      accrualData.totalAccPenalty,
      accrualData.repaymentScheduleId,
    ]);
  
    const updateLoanSql = `
      UPDATE m_loan
      SET accrued_till = $1
      WHERE id = $2
    `;
  
    await connection.query(updateLoanSql, [
      accrualData.dueDateAsLocaldate,
      accrualData.loanId,
    ]);
  
    const accountingBridgeData = deriveAccountingBridgeData(
      accrualData,
      transactionMap
    );
  
    await createJournalEntriesForLoan(accountingBridgeData);
  }

   export default addAccrualAccountingQuery;