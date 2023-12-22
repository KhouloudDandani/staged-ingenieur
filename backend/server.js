const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
require('dotenv').config(); // Load environment variables from a .env file
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  connectionLimit: 10, // Set a limit to the number of connections in the pool
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "manage",
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "personne@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "personne",
  },
});

app.post("/api/send-email", async (req, res) => {
  const { to, subject, content } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER || "dandanikhouloud8@gmail.com",
    to,
    subject,
    text: content,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "An error occurred while sending the email" });
  }
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "An error occurred while fetching data from the database" });
    } else {
      res.json(data);
    }
  });
});



app.get("/", (req, res) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(400).json({ error: "An error occurred" });
    } else {
      res.json(data);
    }
  });
});

app.post('/create', (req, res) => {
  const { FirstName	,LastName,	Email,	PhoneNumber,	Address,	City,	State,	ZipCode,	HireDate,	Salary,	Department } = req.body;
  const sql = "INSERT INTO employee (FirstName ,LastName,	Email,	PhoneNumber,	Address,	City,	State,	ZipCode,	HireDate,	Salary,	Department	) VALUES (?, ?,?,?,?,?,?,?,?,?,?)";
  db.query(sql, [FirstName,	LastName,	Email,	PhoneNumber,	Address,	City,	State,	ZipCode,	HireDate,	Salary,	Department	], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(400).json({ error: "An error occurred while adding the employer", errorMessage: err.message });
    } else {
      res.json({ message: "Employee added successfully" });
    }
  });
});
app.put('/update/:id', (req, res) => {
  const sql = "UPDATE employee SET FirstName = ?, LastName = ?, Email = ?, PhoneNumber = ?, Address = ?, City = ?, State = ?, ZipCode = ?, HireDate = ?, Salary = ?, Department = ? WHERE id = ?";
  const values = [
    req.body.FirstName,
    req.body.LastName,
    req.body.Email,
    req.body.PhoneNumber,
    req.body.Address,
    req.body.City,
    req.body.State,
    req.body.ZipCode,
    req.body.HireDate,
    req.body.Salary,
    req.body.Department,
    req.params.id, // La valeur de l'ID à   mettre à jour
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Erreur lors de la mise à jour de l'employé" });
    }
    
    return res.json({ message: "Employé mis à jour avec succès" });
  });
});
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const checkEmployeeExists = "SELECT * FROM employee WHERE id = ?";
  
  // Vérifier si l'employé existe avant de le supprimer
  db.query(checkEmployeeExists, [id], (checkErr, checkData) => {
      if (checkErr) {
          return res.status(500).json({ error: "Une erreur s'est produite lors de la vérification de l'employé" });
      }

      if (checkData.length === 0) {
          return res.status(404).json({ error: "L'employé n'a pas été trouvé" });
      }

      const deleteEmployee = "DELETE FROM employee WHERE id = ?";
      db.query(deleteEmployee, [id], (err, data) => {
          if (err) {
              return res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de l'employé" });
          }
          return res.json(data);
      });
  });
});

app.listen(3002, () => {
  console.log("Server is listening on port 3002");
});



