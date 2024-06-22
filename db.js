import express, { response } from 'express';;
import mysql from 'mysql';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import jwt, { decode } from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
// import { parse } from 'csv-parse';
// import multer from 'multer';






const app = express();
app.use(express.json());
app.use(cors({
    origin : ["http://localhost:3000"],
    methods : ["POST","GET"],
    credentials : true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : false,
    cookie : {
        secure : false,
        maxAge : 1000 * 60 * 60 * 24
    }
}))


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nsdb"
})



// // Multer setup for file upload
// const upload = multer({ dest: 'uploads/' });

// // POST endpoint to handle file upload
// app.post('/upload', upload.single('csvfile'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   const results = [];

//   // Parse CSV file
//   fs.createReadStream(req.file.path)
//     .pipe(csv())
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//       // Insert data into MySQL
//       const sql = 'INSERT INTO sample (``,`EAN_Barcode`, `ASIN_Code`, `Product_Description`, `Supplier_Name`, `Pack_Size`, `Brand`, `Total_Stock`, `Single_Price`, `Case_Price`) VALUES ?';
//       const values = results.map(result => [result.EAN_Barcode, result.ASIN_Code, result.Product_Description, result.Supplier_Name, result.Pack_Size, result.Brand, result.Total_Stock, result.Single_Price, result.Case_Price]);

//       db.query(sql, [values], (err, result) => {
//         if (err) throw err;
//         console.log(`Inserted ${result.affectedRows} rows`);
//         res.status(200).send('File uploaded successfully');
//       });
//     });
// });



// app.get('/', (req, res) => {
//     if(!req.session.Username){
//         return res.json({valid : true, username : req.session.Username});
//     }else{
//         return res.json({valid : false}
            
//         );
//     }
// })

app.post('/Registration',(req, res) => {
    const sql = "INSERT INTO users (`Username`,`Email`,`Password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error:" Error in Hashing Password..!"})    
            const values = [
                req.body.username,
                req.body.email,
                hash
            ]
            db.query(sql, [values], (err, result) => {
                if(err) return res.json({Message : "Insertting data in a server"});
                return res.json({Status : "Success"});
            })    
    })
})

app.post('/Signin',(req, res) => {
    const sql = "SELECT Username,Email,Password FROM users WHERE `Email` = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json({Error : "Login Error in inside the server"});
        if(data.length > 0){
            const pass = req.body.password; 
            const hashpass = data[0].Password;
            bcrypt.compare(pass,hashpass, (err, response) => {
                console.log(response);
                if(err) return res.json({Error : "Password Compare error"});
                if(response){
                    const uname = data[0].Username;
                    console.log(uname);
                    const token = jwt.sign({uname}, "jwt-secret-key", {expiresIn : '1d'});
                    res.cookie('token', token);
                    return res.json({Status : "Success"});
                }else{
                    return res.json({Status : "Password Not matched"});
                }
            })
        }else{
            return res.json({Error : "No Email Existed"});
        }
    })
})


const salt = 10;
const verifyuser = (req, res, next) =>{
    const demo = req.cookie.token;
    console.log(demo);
    if(!demo){
        return res.json({Error:" You are not Authenticate!"})
    }else{
        jwt.verify(demo, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json({Error:" Token is not corrct"});
            }else{
                req.uname = decoded.uname;
                console.log(req.uname);
                next();
            }
        })
    }
}
app.get('/', verifyuser, (req,res) => {
    return res.json({Status:"Success", name: req.uname});
})

app.listen(8081, ()=>{
    console.log("Connected to the server");
})
