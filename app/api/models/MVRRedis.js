
module.exports = {

	attributes: {
		DriverLicenceNumber: {
			type: 'string',
            primaryKey: true,
			unique: true,
			required:true
		},
        MVR_ID: {
            type: 'string',
			required:true
        }
	}
};