var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    CompanyCode: String,
    PolicyNumber: String,
    PolicyVehicleId: String,
    PolicyDriverId: String,
    TerritoryCode: String,
    TerritoryDesc: String,
    TypeOfBusinessCode: String,
    ClassTypeOfUseCode: String,
    UseCode: String,
    PrincipalOperatorBirthYear: Number,
    PrincipalOperatorYearsLicenced: Number,
    PrincipalOperatorYearsLicencedExp: Number,
    PrincipalOperatorGender: String,
    YearsClaimFree: String,
    YearsClaimFreeExp: Number,
    YearsClaimFreeTP: Number,
    YearsClaimFreeColl: Number,
    YearsOtherClaimFreeTP: Number,
    YearsOtherClaimFreeColl: Number,
    FacilityAccidentCount: Number,
    FacilityAConvictionCount: Number,
    FacilityBConvictionCount: Number,
    FacilityCConvictionCount: Number,
    VIN: String,
    VINStatus: String,
    VehicleCode: String,
    ModelYear: Number,
    DateSoldOrSalvaged: Date,
    ICPBReportReference: String,
    VehicleFixableInd: String,
    VehicleType: String,
    BodyTypeCode: String,
    DriveTypeCode: String,
    CarCode: String,
    MakeEng: String,
    MakeFre: String,
    ModelEng: String,
    ModelFre: String,
    VehicleDescEng: String,
    VehicleDescFre: String,
    VehicleDescInd: String,
    CheckPointReportNumber: String,
    ReportYear: Number,
    ReportMonth: Number,
    ReportDay: Number,
    AlertCodes: String,
    NumberOfCheckPointInspections: Number,
    IAOSubClassType: String,
    DriverTrainingInd: String,
    NumberOfClaims: Number,
    OtherOperatorCode: Number,
    OtherOperatorMinimumYearsLicenced: Number,
    IAOUseCode: String,
    PolicyDriverCode: String,
    RIN: String,
    TerritoryFSA: String,
    MandatoryCoverage: String,
    TrailerIndicator: String,
    NewDriverDiscount: String,
    RetirementDiscount: String,
    CleanDriverIndicator: String,
    FAdriverTrainingCode: String,
    FAInsuranceFraudConvictions: String,
    LastUpdateDate: String,
    AfterMarketSecurityDevice: String,
    LeasedVehicle: String,
    LeaseCompanyName: String,
    VehicleOriginalYear: Number,
    VehicleOriginalMonth: Number,
    VehicleOriginalDay: Number,
    VehicleRemoveYear: Number,
    VehicleRemoveMonth: Number,
    VehicleRemoveDay: Number,
    MultiCarDiscount: String,
    MultiLineDiscount: String,
    RenewalDiscount: String,
    CommutingDistance: String,
    AnnualDrivingDistance: String,
    BusinessPercentage: String,
    WinterTireDiscount: String
    
});

module.exports = schema;