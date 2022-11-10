const mysql = require('mysql');
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const port = 3000
//static
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))




const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "abekahotel"
});

db.connect(function(error){
    if(error){
        console.error(error);
    } else {
        console.info("Berhasil Konek Database");
    }
});

module.exports = db;

// get
app.get('', (req, res)=>{
  res.render('index.ejs')
})

app.get('/homepage', (req, res)=>{
  res.render('homepage.ejs')
})

app.get('/category', (req, res)=>{
  res.render('category.ejs')
})

app.get('/gallery', (req, res)=>{
  res.render('gallery.ejs')
})

app.get('/facilities', (req, res)=>{
  res.render('facilities.ejs')
})

app.get('/rooms', (req, res)=>{
  res.render('rooms.ejs')
})

app.get('/detail1', (req, res)=>{
  res.render('detail1.ejs')
})

app.get('/booking1', (req, res)=>{
  res.render('booking1.ejs')
})

app.get('/booking2', (req, res)=>{
  res.render('booking2.ejs')
})

app.get('/success', (req, res)=>{
  res.render('success.ejs')
})
app.get('/editkategori', (req, res)=>{
  res.render('editkategori.ejs')
})
app.get('/loginadmin', (req, res)=>{
  res.render('loginadmin.ejs')
})

//login
app.get('/loginadmin',(req,res)=>{
    res.render('loginadmin.ejs');
  })
  
  app.post("/loginadmin",encoder,(req,res)=>{
    const username = req.body.adminusername;
    const password = req.body.adminpassword;
    
    db.query("select * from admin_account where admin_username = ? and admin_password = ?",[username,password],(error,results,fields)=>{
      if(results.length > 0){
        console.log("Successful Login");
        res.redirect("/admin");
      } else {
        res.redirect("/loginadmin")
      }
      res.end();
    })
  })


//kategori

app.get('/admin',(req,res)=>{
  db.query('SELECT * FROM kategori',(err,rows)=>{
    if(err) throw err;
    res.render('admin.ejs',{kategori:rows});
  })
  db.query('SELECT * FROM booking',(err,rows)=>{
    if(err) throw err;
    res.render('admin.ejs',{booking:rows});
  })
})

app.get('/adminkategori', (req, res)=>{
  res.render('adminkategori.ejs')
})

app.post('/tambah-kategori',encoder, (req,res)=>{
    let kategori = req.body.kategori
    let nama_kamar = req.body.nama_kamar
    let harga_kamar = req.body.harga_kamar
    
    db.query(`INSERT INTO kategori(kategori,nama_kamar,harga_kamar) VALUES ('${kategori}','${nama_kamar}','${harga_kamar}')`, (err,results)=>{
        if(err) throw err;
        res.redirect("/admin")
    })
})


// booking

app.get('/adminbooking',(req,res)=>{
  db.query('SELECT * FROM booking',(err,rows)=>{
    if(err) throw err;
    res.render('adminbooking.ejs',{booking:rows});
  })
})

app.post('/tambah-databooking',encoder, (req,res)=>{
    let nama_booking = req.body.nama_booking
    let alamat_booking = req.body.alamat_booking
    let email_booking = req.body.email_booking
    let notelp_booking = req.body.notelp_booking
    let jumlah_hari = req.body.jumlah_hari
    
    
    db.query(`INSERT INTO booking(nama_booking, alamat_booking, email_booking, notelp_booking, jumlah_hari) VALUES ('${nama_booking}','${alamat_booking}','${email_booking}', '${notelp_booking}','${jumlah_hari}')`, (err,results)=>{
        if(err) throw err;
        res.redirect("/booking1")
    })
})


//edit

app.get('/editkategori/:id_kategori',(req,res)=>{
  let id = req.params.id_kategori;
  let sql = `select * from kategori where id_kategori='${id}'`;
  let query = db.query(sql,(err,results)=>{
    if (err) throw err;
    res.render("editkategori.ejs",{kategori: results[0]})
  })
})



app.post('/update-edit/:id_kategori',encoder, (req,res)=>{
  let id_kategori = req.params.id_kategori
  let data = {
      kategori : req.body.kategori,
      nama_kamar : req.body.nama_kamar,
      harga_kamar : req.body.harga_kamar
  }
        db.query('UPDATE kategori SET ? WHERE id_kategori = ?;' ,[data, id_kategori], function(err, result) {
            if (err) throw err;
    res.redirect('/admin')
  })
})

    


// app.post('/update-edit/:id_kategori',encoder, (req,res)=>{
//   let data = {kategori: req.body.kategori, nama_kamar: req.body.nama_kamar, harga_kamar: req.body.harga_kamar};
//   let sql = "UPDATE kategori set ?";
//   let query = db.query(sql,data,(err, results)=>{
//     if (err) throw err;
//     res.redirect('/admin')
//   })
// })

//delete
app.get('/admin/:id_kategori',(req,res)=>{
    db.query(`DELETE FROM kategori where id_kategori ='${req.params.id_kategori}'`,(req,rows)=>{
        res.redirect("/admin");
    })
})

app.get('/adminbooking/:id_booking',(req,res)=>{
    db.query(`DELETE FROM booking where id_booking ='${req.params.id_booking}'`,(req,rows)=>{
        res.redirect("/adminbooking");
    })
})








// listen
app.listen(3000, ()=> {
  console.log('Sever is Running on Port 3000');
});