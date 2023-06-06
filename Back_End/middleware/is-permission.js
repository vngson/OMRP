exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.permission == 1) {
    // Nếu người dùng có quyền admin, tiếp tục xử lý middleware tiếp theo
    next();
  } else {
    // Nếu người dùng không có quyền admin, trả về lỗi
    return res.status(401).json({ message: "Unauthorized" });
  }
};
exports.isPartner = (req, res, next) => {
  if (req.user && req.user.permission == 2) {
    // Nếu người dùng có quyền dối tác, tiếp tục xử lý middleware tiếp theo
    next();
  } else {
    // Nếu người dùng không có quyền admin, trả về lỗi
    return res.status(401).json({ message: "Unauthorized" });
  }
};

exports.isCustomer = (req, res, next) => {
  if (req.user && req.user.permission == 3) {
    // Nếu người dùng có quyền khách hàng, tiếp tục xử lý middleware tiếp theo
    next();
  } else {
    // Nếu người dùng không có quyền admin, trả về lỗi
    return res.status(401).json({ message: "Unauthorized" });
  }
};

exports.isEmployee = (req, res, next) => {
  if (req.user && req.user.permission == 4) {
    // Nếu người dùng có quyền nhân viên, tiếp tục xử lý middleware tiếp theo
    next();
  } else {
    // Nếu người dùng không có quyền admin, trả về lỗi
    return res.status(401).json({ message: "Unauthorized" });
  }
};
