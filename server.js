import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares = jsonServer.defaults();

server.db = router.db; // Kết nối với db.json
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware kiểm tra quyền admin cho các hành động chỉnh sửa
const checkAdmin = (req, res, next) => {
  const users = router.db.get("users").value();
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "Bạn chưa đăng nhập" });
  }

  const user = users.find((u) => `Bearer ${u.id}` === authHeader);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Bạn không có quyền truy cập" });
  }

  next();
};

// Cho phép mọi người đọc dữ liệu sách và danh mục
server.get("/books", (req, res) => {
  res.json(router.db.get("books"));
  try {
    const books = router.db.get("books").value();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu sách", error });
  }
});
server.get("/categories", (req, res) => {
  res.json(router.db.get("categories"));
  try {
    const categories = router.db.get("categories").value();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu danh mục", error });
  }
});

//  Chỉ admin mới được chỉnh sửa dữ liệu
server.use("/books/:id", checkAdmin);
server.use("/categories/:id", checkAdmin);
server.use("/users", checkAdmin);

server.use(router);
server.listen(5001, () => {
  console.log(`JSON Server đang chạy tại: http://localhost:5001`);
});
