// utils/errorHandler.js
export const serverErr = (res, err) => {
  console.error(err);
  return res
    .status(500)
    .json({ success: false, message: err.message || "Server error" });
};
