
module.exports = {

	attributes: {
		LicenceNumber: {
			type: 'string',
			unique: true,
			primaryKey: true,
			required:true
		},
        autoPlusId: {
            type: 'string',
			required: true
        }
	}
};