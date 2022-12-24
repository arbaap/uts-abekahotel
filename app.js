const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const port = 3000;
const fileUpload = require("express-fileupload");
var session = require("express-session");

//static
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

app.use(session({ secret: "ssshhhhh!" }));
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));

const bcrypt = require("bcryptjs");
const { redirect } = require("express/lib/response");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "abekahotel",
});

connection.connect(function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("Koneksi = Success");
  }
});

module.exports = connection;

app.set("view engine", "ejs");

// login

var pwVerify = (pwd, hash) => {
  if (bcrypt.compareSync(pwd, hash)) {
    return true;
  } else {
    return false;
  }
};

app.post("/loginadmin", function (req, res) {
  console.log(req.body);
  let usr = req.body;
  connection.query(
    `SELECT * from admins where username="${usr.username}"`,
    function (err, rows, fields) {
      if (!err) {
        console.log("The solution is: ", rows[0]);

        if (
          typeof rows[0] != "undefined" &&
          pwVerify(usr.password, rows[0].password)
        ) {
          console.log("Successful Login");
          req.session.admin = {
            id: rows[0].id,
            username: rows[0].username,
          };
          res.redirect("/dashboard");
        } else {
          res.render("loginadmin");
        }
      } else throw err;
    }
  );
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

app.get("/dashboard", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    res.render("dashboard.ejs");
  } else {
    res.redirect("/loginadmin");
  }
});

//kategori

app.get("/admin", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    connection.query("SELECT * FROM kategori", (err, rows) => {
      if (err) throw err;
      ``;
      res.render("admin.ejs", { kategori: rows });
    });
  } else {
    res.redirect("/loginadmin");
  }
});

app.get("/adminkategori", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    connection.query("SELECT * FROM kategori", (err, rows) => {
      if (err) throw err;
      ``;
      res.render("adminkategori.ejs", { kategori: rows });
    });
  } else {
    res.redirect("/loginadmin");
  }
});

app.post("/tambah-kategori", encoder, (req, res) => {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    let nama_kategori = req.body.nama_kategori;
    let nama_kamar = req.body.nama_kamar;
    let harga_kamar = req.body.harga_kamar;
    connection.query(
      `INSERT INTO kategori(nama_kategori,nama_kamar,harga_kamar) VALUES ('${nama_kategori}','${nama_kamar}','${harga_kamar}')`,
      (err, results) => {
        if (err) throw err;
        res.redirect("/admin");
      }
    );
  } else {
    res.redirect("/");
  }
});

//editkategori

app.get("/editkategori", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    res.render("editkategori.ejs");
  } else {
    res.redirect("/loginadmin");
  }
});

app.get("/editkategori/:id_kategori", (req, res) => {
  let id = req.params.id_kategori;
  let sql = `select * from kategori where id_kategori='${id}'`;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.render("editkategori.ejs", { kategori: results[0] });
  });
});

app.post("/update-edit/:id_kategori", encoder, (req, res) => {
  let id_kategori = req.params.id_kategori;
  let data = {
    nama_kategori: req.body.nama_kategori,
    nama_kamar: req.body.nama_kamar,
    harga_kamar: req.body.harga_kamar,
  };
  connection.query(
    "UPDATE kategori SET ? WHERE id_kategori = ?;",
    [data, id_kategori],
    function (err, result) {
      if (err) throw err;
      res.redirect("/admin");
    }
  );
});

// kelola booking / form

app.get("/adminbooking", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    connection.query("SELECT * FROM booking", (err, rows1) => {
      if (err) throw err;
      connection.query("SELECT * FROM payment", (err, rows2) => {
        if (err) throw err;
        res.render("adminbooking.ejs", { booking: rows1, payment: rows2 });
      });
    });
  } else {
    res.redirect("/loginadmin");
  }
});

// user
app.post("/tambah-databooking", encoder, (req, res) => {
  let nama_booking = req.body.nama_booking;
  let alamat_booking = req.body.alamat_booking;
  let email_booking = req.body.email_booking;
  let notelp_booking = req.body.notelp_booking;
  let jumlah_hari = req.body.jumlah_hari;

  connection.query(
    `INSERT INTO booking(nama_booking, alamat_booking, email_booking, notelp_booking, jumlah_hari) VALUES ('${nama_booking}','${alamat_booking}','${email_booking}', '${notelp_booking}','${jumlah_hari}')`,
    (err, results) => {
      if (err) throw err;
      res.redirect("/booking1");
    }
  );
});

app.post("/upload-pembayaran", encoder, (req, res) => {
  let nama_pengirim = req.body.nama_pengirim;
  let asal_bank = req.body.asal_bank;
  connection.query(
    `INSERT INTO payment(nama_pengirim,asal_bank) VALUES ('${nama_pengirim}','${asal_bank}')`,
    (err, results) => {
      if (err) throw err;
      res.redirect("/booking2");
    }
  );
});

//

//delete
app.get("/admin/:id_kategori", (req, res) => {
  connection.query(
    `DELETE FROM kategori where id_kategori ='${req.params.id_kategori}'`,
    (req, rows) => {
      res.redirect("/admin");
    }
  );
});

app.get("/adminbooking/:id_booking", (req, res) => {
  connection.query(
    `DELETE FROM booking where id_booking ='${req.params.id_booking}'`,
    (req, rows) => {
      res.redirect("/adminbooking");
    }
  );
});

app.get("/adminkamar/:id_rooms", (req, res) => {
  connection.query(
    `DELETE FROM rooms where id_rooms ='${req.params.id_rooms}'`,
    (req, rows) => {
      res.redirect("/adminkamar");
    }
  );
});

// kamar

app.get("/adminkamar", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    connection.query("SELECT * FROM rooms", (err, rows) => {
      if (err) throw err;
      ``;
      res.render("adminkamar.ejs", { rooms: rows });
    });
  } else {
    res.redirect("/loginadmin");
  }
});

app.get("/kelolakamar", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    res.render("kelolakamar.ejs");
  } else {
    res.redirect("/loginadmin");
  }
});

app.post("/kelolakamar", encoder, (req, res) => {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    let id_rooms = req.body.id_rooms;
    let nama_rooms = req.body.nama_rooms;
    let harga_rooms = req.body.harga_rooms;
    let image_rooms = req.body.image_rooms;
    connection.query(
      `INSERT INTO rooms(id_rooms,nama_rooms,harga_rooms,image_rooms) VALUES ('${id_rooms}','${nama_rooms}','${harga_rooms}','${image_rooms}')`,
      (err, results) => {
        if (err) throw err;
        res.redirect("/adminkamar");
      }
    );
  } else {
    res.redirect("/");
  }
});

app.get("/category", (req, res) => {
  connection.query("SELECT * FROM rooms", (err, rows) => {
    if (err) throw err;
    res.render("category.ejs", { rooms: rows });
  });
});

app.get("/rooms", (req, res) => {
  connection.query("SELECT * FROM rooms", (err, rows) => {
    if (err) throw err;
    res.render("rooms.ejs", { rooms: rows });
  });
});

//succes booking

app.get("/success", (req, res) => {
  connection.query("SELECT * FROM booking", (err, rows) => {
    if (err) throw err;
    res.render("success.ejs", { booking: rows });
  });
});

// kamar

// get
app.get("", (req, res) => {
  res.render("homepage.ejs");
});

app.get("/homepage", (req, res) => {
  res.render("homepage.ejs");
});

app.get("/category", (req, res) => {
  res.render("category.ejs");
});

app.get("/gallery", (req, res) => {
  res.render("gallery.ejs");
});

app.get("/facilities", (req, res) => {
  res.render("facilities.ejs");
});

app.get("/rooms", (req, res) => {
  res.render("rooms.ejs");
});

app.get("/detail1", (req, res) => {
  res.render("detail1.ejs");
});

app.get("/booking1", (req, res) => {
  res.render("booking1.ejs");
});

app.get("/booking2", (req, res) => {
  res.render("booking2.ejs");
});

app.get("/success", (req, res) => {
  res.render("success.ejs");
});
app.get("/editkategori", (req, res) => {
  res.render("editkategori.ejs");
});
app.get("/loginadmin", (req, res) => {
  res.render("loginadmin.ejs");
});

// listen
app.listen(3000, () => {
  console.log("Sever is Running on Port 3000");
});
