const UpdateProfile = {};

UpdateProfile.edit = function(userDetails, password, callback) {
	// Validate the required data before proceeding with main operation
	if(!password) {
		return callback("Password required");
	}

	if(!userDetails.password!==password) {
		return callback("Error! Password not matched");
	}

	// returning
	return callback(null, {
        status: true,
        message: "Success! updated"
    });		
}

module.exports = UpdateProfile;