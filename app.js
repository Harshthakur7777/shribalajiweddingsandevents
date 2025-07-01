const express = require('express');
const app = express();
// For parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const ejsMate = require('ejs-mate')
const path = require('path');
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))
app.engine('ejs', ejsMate)
const flash = require('connect-flash');
const session = require('express-session')
app.use(session({
    secret: 'yourSecretKey', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true
}));

// ✅ Initialize flash middleware
app.use(flash());

// ✅ Make flash messages available in all views
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});



// Start Server
const PORT = 4000; // or the port you actually want

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.get('/',(req,res,next)=>{
    res.render('index')
})
app.get('/home',(req,res,next)=>{
    res.render('index')
})
app.get('/gallery',(req,res,next)=>{
    res.render('gallery')
})
app.get('/contact',(req,res,next)=>{
    res.render('contact')
})
app.get('/about',(req,res,next)=>{
    res.render('about')
})
const nodemailer = require('nodemailer');

app.post('/contact', (req, res) => {
  const { name, email, message, subject, event } = req.body;

  // setup your transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shribalajiweddingsandevents@gmail.com',
      pass: 'wcld smgi zfik esdp' // use app password, not your actual Gmail password
    }
  });

  const mailOptions = {
    from: email,
    to: 'shribalajiweddingsandevents@gmail.com',
    subject: 'New Contact Form Message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nSubject: ${subject}\nEvent: ${event}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Something went wrong.');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/contact'); // or send a success message
    }
  });
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
