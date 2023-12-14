import { connection } from "../../db/database";
import { LoanTransactionType } from "../type";
import { LoanScheduleAccrualData } from "./type";
import { GlobalConfigurationPropertyData } from "./type";
import retrieveOrganisationStartDate from "./retrieveOrganisationStartDate";

import retrieveInstallmentLoanChargesForAccrual from "./retrieveInstallmentLoanChargesForAccrual";


async function retrieveOrganisationStartDate(): Promise<Date> {
    const propertyName = "2023-11-12";
    const property = getGlobalConfigurationPropertyData(propertyName);
    return property.getDateValue();
  } 

    function getGlobalConfigurationPropertyData(propertyName: string): GlobalConfigurationPropertyData {
        return new GlobalConfigurationPropertyData(
        propertyName,
        true,
        42,
        new Date(),
        "stringValue",
        null,
        "description",
        false
        );
    }

    export async function retrieveOrganisationStartDate(): Promise<Date | null> {
        const globalConfigurationPropertyData = getGlobalConfigurationPropertyData("organisationStartDate");
        if (!globalConfigurationPropertyData) {
            return null;
        }
        return globalConfigurationPropertyData.getDateValue();
    }   

