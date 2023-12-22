import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { French } from "flatpickr/dist/l10n/fr";
import "flatpickr/dist/themes/material_green.css";
import React, { forwardRef, useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import httpClient from "./config/http";

const departmentOptions = ["Informatique", "Logistique", "Financier", "Commercial"];

function UpdateEmployeeModal({ employeeData, onClose, onCancel }, ref) {
  const [employee, setEmployee] = useState(employeeData);
  const navigate = useNavigate();

  // Créer un état pour gérer les erreurs de validation
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // Valider le formulaire ici avant de soumettre
    if (validateForm()) {
      httpClient.put(`/update/${employee.id}`, employee)
        .then((res) => {
          onClose();
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };
  const cancelUpdate = () => {
    onCancel();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });

    // Effacer les erreurs de validation lorsque l'utilisateur commence à corriger le champ
   
  };



  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Valider chaque champ en utilisant des règles génériques
    for (const fieldName in employee) {
      const value = employee[fieldName];

      if (value === null || value === undefined || (typeof value === 'string' && value.trim() === "")) {
        isValid = false;
        errors[fieldName] = "Ce champ est obligatoire.";
      }
      if ((fieldName === "FirstName" || fieldName === "LastName" || fieldName === "City" || fieldName === "State" || fieldName === "Address") && value && !/^[a-zA-Z]+$/.test(value)) {
        isValid = false;
        errors[fieldName] = `Le champ ${fieldName} doit contenir uniquement des lettres.`;
      }
      if (fieldName === "PhoneNumber" && value && value.length > 8) {
        isValid = false;
        errors[fieldName] = "Le numéro de téléphone doit avoir au maximum 8 caractères.";
      }
      if (fieldName === "Email" && value && !/^\S+@\S+\.\S+$/.test(value)) {
        isValid = false;
        errors[fieldName] = "Veuillez entrer une adresse email valide.";
      }
      if (fieldName === "ZipCode" && value && !/^\d{4}$/.test(value)) {
        isValid = false;
        errors[fieldName] = "Le code postal doit être composé de 4 chiffres.";
      }

    }
    setValidationErrors(errors);
    return isValid;
  };
  useEffect(() => {
    // Récupérer les données de l'employé à partir de l'API ou de votre source de données
    if (employeeData) {
      setEmployee(employeeData)
    }
  }, [employeeData]);


  return (
    <Box
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70vw",
        borderRadius: 4,
        boxShadow: 24,
        padding: 4,
        backgroundColor: "white",
      }}
    >
      <Typography
        p={2}
        variant="h5"
        textAlign={"center"}
        gutterBottom
        className="text-success"
      >
        Modifier l'employé
      </Typography>
      <Grid container my={1}>
        <Grid item lg={6} md={6} p={1}>
          <TextField

            variant="outlined"
            fullWidth
            name="FirstName"
            defaultValue={employee?.FirstName || ""}
            onChange={handleInputChange}
            error={!!validationErrors.FirstName}
            helperText={validationErrors.FirstName || " "}



          />
        </Grid>

        <Grid item lg={6} md={6} p={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="LastName"
            defaultValue={employee?.LastName || ""}
            onChange={handleInputChange}
            error={!!validationErrors.LastName}
            helperText={validationErrors.LastName || " "}

          />
        </Grid>
      </Grid>
      <Grid container my={1}>
        <Grid item lg={6} md={6} p={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="Email"
            defaultValue={employee?.Email || ""}
            onChange={handleInputChange}
            error={!!validationErrors.Email}
            helperText={validationErrors.Email || " "}

          />
        </Grid>
        <Grid item lg={6} md={6} p={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="Address"
            defaultValue={employee?.Address || ""}
            onChange={handleInputChange}
            error={!!validationErrors.Address}
            helperText={validationErrors.Address || " "}

          />
        </Grid>
      </Grid>
      <Grid container my={1}>
        <Grid item lg={6} md={6} p={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="City"
            defaultValue={employee?.City || ""}
            onChange={handleInputChange}
            error={!!validationErrors.City}
            helperText={validationErrors.City || " "}

          />
        </Grid>
        <Grid item lg={6} md={6} p={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="State"
            defaultValue={employee?.State || ""}
            onChange={handleInputChange}
            error={!!validationErrors.State}
            helperText={validationErrors.State || " "}

          />
        </Grid>
      </Grid>
      <Grid container my={1}>
        <Grid item lg={6} md={6} p={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="ZipCode"
            defaultValue={employee?.ZipCode || ""}
            onChange={handleInputChange}
            error={!!validationErrors.ZipCode}
            helperText={validationErrors.ZipCode || " "}

          />
        </Grid>
        <Grid item lg={6} md={6} p={1}>
          <Flatpickr
            options={{
              dateFormat: "Y-m-d",
              enableTime: false,
              locale: French, // Utilisez "fr" pour le français
              defaultDate: "2023-01-20",
              maxDate: new Date()
            }}


            fullWidth
            defaultValue={employee?.HireDate || null}
            render={({ defaultValue }, ref) => (
              <TextField
                fullWidth
                defaultValue={defaultValue}
                inputRef={ref}
              />
            )}
            onChange={(date) => setEmployee({ ...employee, HireDate: date[0] })}
          />
        </Grid>

      </Grid>
      <Grid container my={1}>
        <Grid item lg={6} md={6} p={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="Salary"
            defaultValue={employee?.Salary || ""}
            onChange={handleInputChange}
            error={!!validationErrors.Salary}
            helperText={validationErrors.Salary || " "}

          />
        </Grid>
        <Grid item lg={6} md={6} p={1}>
          <TextField
            fullWidth
            select
            variant="outlined"
            name="Department"
            value={employee?.Department || ""}
            onChange={handleInputChange}
            error={!!validationErrors.Department}
            helperText={validationErrors.Department || " "}
          >
            {departmentOptions.map((department, index) => (
              <MenuItem key={index} value={department}>
                {department}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item lg={6} md={6} p={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="Numero de téléphone"
            defaultValue={employee?.PhoneNumber || ""}
            onChange={handleInputChange}
            error={!!validationErrors.PhoneNumber}
            helperText={validationErrors.PhoneNumber || " "}

          />
        </Grid>
      </Grid>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "red", color: "white", margin: "8px" }}
          onClick={cancelUpdate}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "green", color: "white", margin: "8px" }}
          onClick={handleSubmit}
        >
          Enregistrer
        </Button>
      </div>
    </Box>
  );
}
export default forwardRef(UpdateEmployeeModal);