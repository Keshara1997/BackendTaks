async function updateCharges(
    chargesData: LoanChargeData[],
    accrualData: LoanScheduleAccrualData,
    startDate: Date,
    endDate: Date
  ): Promise<void> {
    const applicableCharges = new Map<LoanChargeData, number>();
    let dueDateFeeIncome: any = 0;
    let dueDatePenaltyIncome: any = 0;
  
    for (const loanCharge of chargesData) {
      let chargeAmount = 0;
  
      if (!loanCharge.dueDate) {
        if (
          loanCharge.isInstallmentFee &&
          accrualData.dueDateAsLocaldate === endDate
        ) {
          const installmentData = loanCharge.installmentChargeData;
  
          for (const installmentChargeData of installmentData) {
            if (
              installmentChargeData.installmentNumber ===
              accrualData.installmentNumber
            ) {
              let accruableForInstallment = installmentChargeData.amount;
  
              if (installmentChargeData.amountUnrecognized !== null) {
                accruableForInstallment -=
                  installmentChargeData.amountUnrecognized;
              }
  
              chargeAmount = accruableForInstallment;
  
              const canAddCharge = chargeAmount > 0;
  
              if (
                canAddCharge &&
                (installmentChargeData.amountAccrued === null ||
                  chargeAmount !== installmentChargeData.amountAccrued)
              ) {
                const amountForAccrual =
                  chargeAmount - (installmentChargeData.amountAccrued || 0);
  
                applicableCharges.set(loanCharge, amountForAccrual);
  
                const amountAccrued =
                  chargeAmount + (loanCharge.amountAccrued || 0);
                loanCharge.amountAccrued = amountAccrued;
              }
  
              break;
            }
          }
        }
      } else if (
        loanCharge.dueDate > startDate &&
        loanCharge.dueDate <= endDate
      ) {
        chargeAmount = loanCharge.amount;
  
        if (loanCharge.amountUnrecognized !== null) {
          chargeAmount -= loanCharge.amountUnrecognized;
        }
  
        const canAddCharge = chargeAmount > 0;
  
        if (
          canAddCharge &&
          (loanCharge.amountAccrued === null ||
            chargeAmount !== loanCharge.amountAccrued)
        ) {
          const amountForAccrual = chargeAmount - (loanCharge.amountAccrued || 0);
  
          applicableCharges.set(loanCharge, amountForAccrual);
        }
      }
  
      if (loanCharge.isPenalty) {
        dueDatePenaltyIncome += chargeAmount;
      } else {
        dueDateFeeIncome += chargeAmount;
      }
    }
  
    if (dueDateFeeIncome === 0) {
      dueDateFeeIncome = null;
    }
  
    if (dueDatePenaltyIncome === 0) {
      dueDatePenaltyIncome = null;
    }
  
    accrualData.applicableCharges = applicableCharges;
    accrualData.dueDateFeeIncome = dueDateFeeIncome;
    accrualData.dueDatePenaltyIncome = dueDatePenaltyIncome;
  }


  export default updateCharges;