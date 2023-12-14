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

import { LoanChargeData } from "./type";
import { LoanChargeAccrualMapper } from "./LoanChargeAccrualMapper";
import { jdbcTemplate } from "../../db/database";
import retrieveInstallmentLoanChargesForAccrual from "./retrieveInstallmentLoanChargesForAccrual";
import updateLoanChargesWithUnrecognizedIncome from "./updateLoanChargesWithUnrecognizedIncome";



async function retrieveLoanChargesForAccrual(
    loanId: number
  ): Promise<LoanChargeData[]> {
    const rm = new LoanChargeAccrualMapper();
    const sql =
      "select " +
      rm.schema() +
      " where lc.loan_id=? AND lc.is_active = 1 group by  lc.id " +
      " order by lc.charge_time_enum ASC, lc.due_for_collection_as_of_date ASC, lc.is_penalty ASC";
    let charges: LoanChargeData[] = jdbcTemplate.query(sql, rm, [
      LoanTransactionType.ACCRUAL,
      loanId,
      loanId,
    ]);
    charges = updateLoanChargesWithUnrecognizedIncome(
      loanId,
      charges,
      jdbcTemplate
    );
  
    const removeCharges: LoanChargeData[] = [];
    for (const loanChargeData of charges) {
      if (loanChargeData.isInstallmentFee()) {
        removeCharges.push(loanChargeData);
      }
    }
    charges = charges.filter(
      (loanChargeData) => !removeCharges.includes(loanChargeData)
    );
  
    for (const loanChargeData of removeCharges) {
      if (loanChargeData.isInstallmentFee()) {
        const installmentChargeDatas = retrieveInstallmentLoanChargesForAccrual(
          loanChargeData.getId(),
          jdbcTemplate
        );
        const modifiedChargeData = new LoanChargeData(
          loanChargeData,
          installmentChargeDatas
        );
        charges.push(modifiedChargeData);
      }
    }
  
    return charges;
  }

    export default retrieveLoanChargesForAccrual;