module.exports = (req, res, next) => {


  var reqParams = req.params.all();

  if (!reqParams.LicenceNumber) {
    return res.badRequest(ResHandlerService.errorObject('DRIVER_LICENSE_NOT_FOUND', true));
  }
  else if(!reqParams.ProvinceCode){
    return res.badRequest(ResHandlerService.errorObject('PROVINCE_CODE_REQUIRED', true));
  }
  //Valid Request
  else {
    return next();
  }
};
