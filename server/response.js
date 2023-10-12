module.exports.response = (statusCode, message, res, data = []) => {
   if (statusCode === 402) {
      return res.status(statusCode).json({
         status: false,
         message,
         errors: data,
      });
   }

   if (statusCode === 404) {
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
