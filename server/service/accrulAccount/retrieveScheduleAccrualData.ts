import { de } from "date-fns/locale";
import { format } from "date-fns";
import connection from "../../db/database";  
import { LoanScheduleAccrualData } from "../type";
import { retrieveOrganisationStartDate } from "../accrulAccount/retrieveOrganisationStartDate";

async function retrieveScheduleAccrualData(): Promise<
  LoanScheduleAccrualData[]
> {
  const organisationStartDate = await retrieveOrganisationStartDate();
  const sql = `
  SELECT
  loan.id AS loanId,
  IF(loan.client_id IS NULL, mg.office_id, mc.office_id) AS officeId,
  ls.duedate AS duedate,
  ls.fromdate AS fromdate,
  ls.id AS scheduleId,
  loan.product_id AS productId,
  ls.installment AS installmentNumber,
  ls.interest_amount AS interest,
  ls.interest_waived_derived AS interestWaived,
  ls.penalty_charges_amount AS penalty,
  ls.fee_charges_amount AS charges,
  ls.accrual_interest_derived AS accinterest,
  ls.accrual_fee_charges_derived AS accfeecharege,
  ls.accrual_penalty_charges_derived AS accpenalty,
  loan.currency_code AS currencyCode,
  loan.currency_digits AS currencyDigits,
  loan.currency_multiplesof AS inMultiplesOf,
  curr.display_symbol AS currencyDisplaySymbol,
  curr.name AS currencyName,
  curr.internationalized_name_code AS currencyNameCode
FROM
  m_loan_repayment_schedule ls
LEFT JOIN
  m_loan loan ON loan.id = ls.loan_id
LEFT JOIN
  m_product_loan mpl ON mpl.id = loan.product_id
LEFT JOIN
  m_client mc ON mc.id = loan.client_id
LEFT JOIN
  m_group mg ON mg.id = loan.group_id
LEFT JOIN
  m_currency curr ON curr.code = loan.currency_code
LEFT JOIN
  m_loan_recalculation_details AS recaldet ON loan.id = recaldet.loan_id
WHERE
  (recaldet.is_compounding_to_be_posted_as_transaction IS NULL OR recaldet.is_compounding_to_be_posted_as_transaction = 0)
  AND (
      (ls.fee_charges_amount <> IFNULL(ls.accrual_fee_charges_derived, 0))
      OR (ls.penalty_charges_amount <> IFNULL(ls.accrual_penalty_charges_derived, 0))
      OR (ls.interest_amount <> IFNULL(ls.accrual_interest_derived, 0))
  )
  AND loan.loan_status_id = 100
  AND mpl.accounting_type = 3
  AND loan.is_npa = 0
  AND ls.duedate <= CURDATE()
  AND (ls.duedate > 	2023-12-12)
ORDER BY
  loan.id,
  ls.duedate
  `;


  try {
    console.error("Q:", sql);
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  } catch (error) {
    console.error("Error in retrieveScheduleAccrualData:", error);
    return [];
  }
}


export default retrieveScheduleAccrualData;