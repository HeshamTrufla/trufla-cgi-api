
module.exports = {

	attributes: {
		licence: {
			type: 'string',
			unique: true,
			required:true
		},
        autoPlusId: {
            type: 'string',
			required: true
        }
	}
};