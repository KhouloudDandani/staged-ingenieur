import { Button, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import { French } from "flatpickr/dist/l10n/fr";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import { useNavigate } from "react-router-dom";
import httpClient from "./config/http";
const defaultEmployee = {
  FirstName: "",
  LastName: "",
  Email: "",
  PhoneNumber: "",
  Address: "",
  City: "",
  State: "",
  ZipCode: "",
  HireDate: "",
  Salary: "",
  Department: "",
};
const departmentOptions = ["Informatique", "Logistique", "Finance", "Commercial", "Digitale"];
function CreateEmployee() {
  const [employee, setEmployee] = useState(defaultEmployee);
  const navigate = useNavigate();

  // Créer un état pour gérer les erreurs de validation
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // Valider le formulaire ici avant de soumettre
    if (validateForm()) {
      httpClient
        .post("/create", employee)
        .then((res) => {
          navigate("/employees");
        })
        .catch((err) => console.log(err));
    }
  };

  const cancelCreate = () => {
    setEmployee(defaultEmployee);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });

    // Effacer les erreurs de validation lorsque l'utilisateur commence à corriger le champ
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
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
      if (fieldName === "PhoneNumber" && value && !/^\d{8}$/.test(value)) {
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

    // Mettre à jour l'état des erreurs de validation
    setValidationErrors(errors);

    return isValid;
  };

  return (
    <div style={{marginTop: "30px" }}>
    <div className="container mt-5" >
       
      <div className="card">
      <div style={{ marginBottom: "20px", marginTop: "30px" }}>
        <Typography variant="h3" gutterBottom className="text-success">
          Ajouter un employé
        </Typography>
        </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Typography variant="h5" gutterBottom className="text-success">
                Information Générale
              </Typography>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <TextField
                    label="Nom"
                    variant="outlined"
                    fullWidth
                    name="FirstName"
                    value={employee.FirstName}
                    onChange={handleInputChange}
                    error={!!validationErrors.FirstName}
                    helperText={validationErrors.FirstName || " "}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <TextField
                    label="Prénom"
                    variant="outlined"
                    fullWidth
                    name="LastName"
                    value={employee.LastName}
                    onChange={handleInputChange}
                    error={!!validationErrors.LastName}
                    helperText={validationErrors.LastName || " "}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="Email"
                    value={employee.Email}
                    onChange={handleInputChange}
                    error={!!validationErrors.Email}
                    helperText={validationErrors.Email || " "}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <Typography variant="h5" gutterBottom className="text-success">
                Information Personnelle
              </Typography>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <TextField
                    label="Numéro de téléphone"
                    variant="outlined"
                    fullWidth
                    name="PhoneNumber"
                    value={employee.PhoneNumber}
                    onChange={handleInputChange}
                    error={!!validationErrors.PhoneNumber}
                    helperText={validationErrors.PhoneNumber || " "}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <TextField
                    label="Adresse"
                    variant="outlined"
                    fullWidth
                    name="Address"
                    value={employee.Address}
                    onChange={handleInputChange}
                    error={!!validationErrors.Address}
                    helperText={validationErrors.Address || " "}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <TextField
                    label="Cité"
                    variant="outlined"
                    fullWidth
                    name="City"
                    value={employee.City}
                    onChange={handleInputChange}
                    error={!!validationErrors.City}
                    helperText={validationErrors.City || " "}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <TextField
                    label="Couvernorat"
                    variant="outlined"
                    fullWidth
                    name="State"
                    value={employee.State}
                    onChange={handleInputChange}
                    error={!!validationErrors.State}
                    helperText={validationErrors.State || " "}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <TextField
                    label="Code Postal"
                    variant="outlined"
                    fullWidth
                    name="ZipCode"
                    value={employee.ZipCode}
                    onChange={handleInputChange}
                    error={!!validationErrors.ZipCode}
                    helperText={validationErrors.ZipCode || " "}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <Typography variant="h5" gutterBottom className="text-success">
                Information des Employés
              </Typography>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Flatpickr
                    options={{
                      dateFormat: "Y-m-d",
                      enableTime: false,
                      locale: French,
                      defaultDate: "2023-01-20",
                      maxDate: new Date(),
                    }}
                    value={employee.HireDate}
                    onChange={(date) =>
                      setEmployee({ ...employee, HireDate: date[0] })
                    }
                    render={({ defaultValue }, ref) => (
                      <TextField
                        fullWidth
                        defaultValue={defaultValue}
                        inputRef={ref}
                        label="Date d'embauche"
                        variant="outlined"
                        name="Date d'embauche"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <i className="fas fa-calendar-alt"></i>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <TextField
                    label="Salaire"
                    variant="outlined"
                    fullWidth
                    name="Salary"
                    value={employee.Salary}
                    onChange={handleInputChange}
                    error={!!validationErrors.Salary}
                    helperText={validationErrors.Salary || " "}
                  />
                </div>
              </div>
              <div className="mb-3">
                <TextField
                  select
                  label="Département"
                  variant="outlined"
                  fullWidth
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
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "red", color: "white", margin: "8px" }}
                onClick={cancelCreate}
              >
                Annuler
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "green", color: "white", margin: "8px" }}
                type="submit"
              >
                Ajouter
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
