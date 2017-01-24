
module.exports = {

	attributes: {
		LicenceNumber: {
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