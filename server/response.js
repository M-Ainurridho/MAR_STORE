module.exports.response = (statusCode, message, res, data = []) => {
   if (statusCode >= 400) {
      return res.status(statusCode).json({
         status: false,
         message,
         errors: data,
      });
   }

   return res.status(statusCode).json({
      status: true,
      message,
      payload: data,
   });
};
