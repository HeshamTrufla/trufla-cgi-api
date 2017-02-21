var mongoose = require('mongoose');
var subDocs = require('./AutoPlusSubDocs');


var schema = new mongoose.Schema({

    LicenceNumber: String,

    DriverClaimHistoryGoldDS: {

        PolicyBaseInfoDT: [subDocs.PolicyBaseInfoDT],
        PolicyDriverDT: [subDocs.PolicyDriverDT],
        PolicyVehicleDT: [subDocs.PolicyVehicleDT],
        PolicyVehicleCoverageCategoriesDT: [subDocs.PolicyVehicleCoverageCategoriesDT],
        PolicyHolderDT: [subDocs.PolicyHolderDT],
        PreviousInquiryDT: [subDocs.PreviousInquiryDT],
        PolicyClaimDT: [subDocs.PolicyClaimDT],
        PolicyClaimVehicleDT: [subDocs.PolicyClaimVehicleDT],
        PolicyClaimFirstPartyAccidentDriverDT: [subDocs.PolicyClaimFirstPartyAccidentDriverDT],
        PolicyClaimThirdPartyAccidentDriverDT: [subDocs.PolicyClaimThirdPartyAccidentDriverDT],
        ThirdPartyClaimDT: [subDocs.ThirdPartyClaimDT],
        ThirdPartyClaimVehicleDT: [subDocs.ThirdPartyClaimVehicleDT],
        ThirdPartyClaimFirstPartyAccidentDriverDT: [subDocs.ThirdPartyClaimFirstPartyAccidentDriverDT],
        ThirdPartyClaimThirdPartyAccidentDriverDT: [subDocs.ThirdPartyClaimThirdPartyAccidentDriverDT],
        
        PrintFormatAbstractDT: mongoose.Schema.Types.Mixed,
        
        MessageDT: [{
            Code: String,
            Text: String
        }],
        
        PolicyClaimKindOfLossDT: [subDocs.PolicyClaimKindOfLossDT],
        PolicyClaimKindOfLossTransDT: [subDocs.PolicyClaimKindOfLossTransDT],
        ThirdPartyClaimKindOfLossDT: [subDocs.ThirdPartyClaimKindOfLossDT],
        ThirdPartyClaimKindOfLossTransDT: [subDocs.ThirdPartyClaimKindOfLossTransDT],
        InsuredDT: subDocs.InsuredDT,
        SummaryInfoDT: subDocs.SummaryInfoDT,
        RequestDT: subDocs.RequestDT,
        ProviderServiceProviderDT: [subDocs.ProviderServiceProviderDT],
        VehicleEventDT: [subDocs.VehicleEventDT],
        VehicleEventDetailDT: [subDocs.VehicleEventDetailDT],
        VehicleAntiTheftMarkingDT: [subDocs.VehicleAntiTheftMarkingDT],
        VehicleLienDT: [subDocs.VehicleLienDT],
        VehicleLienDetailDT: [subDocs.VehicleLienDetailDT],
        VehicleRepairHistoryDT: [subDocs.VehicleRepairHistoryDT],
        VehicleRepairHistoryDetailDT: [subDocs.VehicleRepairHistoryDetailDT],

    },
    raw: String
}, {
    timestamps: true
});

exports.schema = schema;