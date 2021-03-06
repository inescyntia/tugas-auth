const db = require("../db");
const bcrypt = require("bcrypt");

function rootRequest(_req, res) {
  res.render('homepage.ejs')
}

function loginPage(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.role === "admin") {
      return res.redirect("/admin");
    } else {
      return res.redirect("/student");
    }
  } else {
    res.render("login.ejs");
  }
}

async function register(req, res) {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await db.query(
    `INSERT INTO users (email, password, role) VALUES ('${email}', '${hashPassword}', 'student')`
  );
  if (user.rowCount === 1) {
    res.redirect("/login");
  } else {
    res.redirect("/register");
  }
}

function registerPage(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.role === "admin") {
      return res.redirect("/admin");
    } else {
      return res.redirect("/student");
    }
  } else {
    res.render("register.ejs");
  }
}

async function login(req, res) {
  const user = req.user
  if (user.role === 'admin') {
    return res.redirect('/admin')
  } else {
    return res.redirect('/student')
  }
}

async function adminPage(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.role === "admin") {
      const result = await db.query(`SELECT * FROM users WHERE role = 'student'`);
      users = result.rows;
      res.render("admin.ejs", { users });
    } else {
      res.render("limited_access.ejs");
    }
  } else {
    res.render("forbidden.ejs");
  }
}

function studentPage(req, res) {
  if (req.isAuthenticated()) {
    res.render("student.ejs");
  } else {
    res.render("forbidden.ejs");
  }
}

function logout(req, res) {
  req.logout();
  res.redirect("/");
}

async function deleteStudent(req, res){
  const id = req.params.id;
  await db.query(`DELETE FROM users WHERE id = ${id}`);
  res.redirect("/admin");
}

module.exports = {
  rootRequest,
  login,
  adminPage,
  studentPage,
  logout,
  loginPage,
  registerPage,
  register,
  deleteStudent
};
