interface LoanScheduleAccrualData {
    accruedPenaltyIncome: null;
    accruedFeeIncome: null;
    accruedInterestIncome: null;
    accruableIncome: number;
    interestIncome: number;
    dueDatePenaltyIncome: number;
    dueDateFeeIncome: number | any;
    applicableCharges: Map<LoanChargeData, number>;
    installmentNumber: any;
    fromDateAsLocaldate: Date;
    waivedInterestIncome: number;
    loanId: number;
    officeId: number;
    dueDateAsLocaldate: Date;
    repaymentScheduleId?: number;
    totalAccInterest?: number;
    totalAccFee?: number;
    totalAccPenalty?: number;
    organisationStartDate?: Date;
    amount?: number;
    interestPortion?: number;
    feePortion?: number;
    penaltyPortion?: number;
    accuredTill?: Date;
  }
  
  enum LoanStatus {
    ACTIVE = "Active",
  }
  
  enum AccountingRuleType {
    ACCRUAL_PERIODIC = "AccrualPeriodic",
  }
  
  enum LoanTransactionType {
    ACCRUAL = "Accrual",
  }
  interface LoanChargeData {
    isPenalty: any;
    amountUnrecognized: null;
    amount: number;
    amountAccrued: number;
    installmentChargeData: any;
    isInstallmentFee: boolean;
    dueDate: any;
    loanId: number;
  }
  interface LoanSchedulePeriodData {
    interestWaived: number;
    periodDueDate: Date;
  }
  interface LoanTransactionData {
    dateOf: any;
  }
  class GlobalConfigurationPropertyData {
    private readonly name: string;
    private readonly enabled: boolean;
    private readonly value: number | null;
    private readonly dateValue: Date;
    private stringValue: string;
    private readonly id: number | null;
    private readonly description: string;
    private readonly trapDoor: boolean;
  
    constructor(
      name: string,
      enabled: boolean,
      value: number | null,
      dateValue: Date,
      stringValue: string,
      id: number | null,
      description: string,
      trapDoor: boolean
    ) {
      this.name = name;
      this.enabled = enabled;
      this.value = value;
      this.dateValue = dateValue;
      this.stringValue = stringValue;
      this.id = id;
      this.description = description;
      this.trapDoor = trapDoor;
    }
    getName(): string {
      return this.name;
    }
  
    isEnabled(): boolean {
      return this.enabled;
    }
  
    getValue(): number | null {
      return this.value;
    }
  
    getStringValue(): string {
      return this.stringValue;
    }
  
    getDateValue(): Date {
      return this.dateValue;
    }
  
    getId(): number | null {
      return this.id;
    }
  
    getDescription(): string {
      return this.description;
    }
  
    isTrapDoor(): boolean {
      return this.trapDoor;
    }
  }




















  
  class GlobalConfigurationProperty {
    private readonly data: GlobalConfigurationProperty;

    constructor(
    name: string,
    enabled: boolean,
    value: number | null,
    dateValue: Date,
    stringValue: string,
    id: number | null,
    description: string,
    trapDoor: boolean
    ) {
    this.data = new GlobalConfigurationProperty(
        name,
        enabled,
        value,
        dateValue,
        stringValue,
        id,
        description,
        trapDoor
    );
    }

    getName(): string {
    return this.data.getName();
    }

    isEnabled(): boolean {
    return this.data.isEnabled();
    }

    getValue(): number | null {
    return this.data.getValue();
    }

    getStringValue(): string {
    return this.data.getStringValue();
    }

    getDateValue(): Date {
    return this.data.getDateValue();
    }

    getId(): number | null {
    return this.data.getId();
    }

    getDescription(): string {
    return this.data.getDescription();
    }

    isTrapDoor(): boolean {
    return this.data.isTrapDoor();
    }
}


//