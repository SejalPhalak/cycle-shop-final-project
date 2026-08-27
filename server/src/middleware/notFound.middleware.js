const notFound = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

export default notFound;


/**
 * उदा. तू request केली:

GET /api/abc

पण /api/abc route नाही.

Response:
{
  "success": false,
  "message": "Route not found: /api/abc"
}
*/