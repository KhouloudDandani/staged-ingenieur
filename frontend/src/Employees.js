import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Modal, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import httpClient from "./config/http";


function Employee() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // Obtenir la date actuelle (année 2023)
  const currentDate = new Date();
  currentDate.setFullYear(2023);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    httpClient.get("/")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
    }

    const filteredEmployees = useMemo(() => {
      return employees.filter((employee) => {
        const { FirstName, LastName, Department, Email, PhoneNumber } = employee;
        const searchFields = [FirstName, LastName, Department, Email, PhoneNumber].join(" ").toLowerCase();
        return searchFields.includes(searchTerm.toLowerCase());
      });
    }, [employees, searchTerm]);


  const handleDelete = (id) => {
    // Remove the employee from the local state immediately
    console.log(id);
    httpClient.delete("/delete/" + id)
      .then(async (res) => {
        await fetchEmployees()
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "FirstName", headerName: "First name", width: 130 },
    { field: "LastName", headerName: "Last name", width: 130 },
    { field: "Email", headerName: "Email", width: 200 },
    { field: "PhoneNumber", headerName: "Phone Number", width: 150 },
    { field: "Department", headerName: "Department", width: 130 },
    {
      field: "HireDate",
      headerName: "Hire Date",
      width: 130,
      renderCell: (params) => (
        <Typography>
          {new Date(params.row.HireDate).toLocaleDateString("fr-FR")}
        </Typography>
      ),
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => openUpdateModal(params.row)}
          >  Mise à jour </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => openDelete(params.row.id)}
          >  Supprimer </button>
        </>
      ),
    },
  ];


  const openDelete = async (id) => {
    const result = window.confirm("Voulez vous vraiment  supprimer cet employé ?")
    if(result) {
      await handleDelete(id);
    }
  }

  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setOpenModal(true);
  };

  const closeUpdateModal = () => {
    setSelectedEmployee(null);
    setOpenModal(false);
  };

  const handleCloseUpdateModal = async () => {
    closeUpdateModal();
    await fetchEmployees();
  }

  const cancelUpdate = () => {
    setSelectedEmployee(null);
    setOpenModal(false);
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row px-4">
        <div className="col-md-12">

        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" ,justifyContent: "flex-end"}}>
        <div style={{ marginBottom: "20px", marginTop: "30px" }}>
        <TextField
              label="Rechercher"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FilterAltIcon />
                  </InputAdornment>
                ),
              }}
            />
        </div>
        </div>
          <Typography variant="h4" gutterBottom className="text-success">
            Liste des employés
          </Typography>

          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/create" className="btn btn-success right mb-3">
              Ajouter employés
            </Link>
          </Box>
          <DataGrid rows={filteredEmployees} columns={columns} pageSize={5} hideFooter />

          <DataGrid rows={employees} columns={columns} pageSize={5} hideFooter />

          <Modal
            open={openModal}
            onClose={closeUpdateModal}
            aria-labelledby="update-employee-modal-title"
            aria-describedby="update-employee-modal-description"
          >
            {/* Utilisation du composant de mise à jour */}
            <UpdateEmployeeModal
              employeeData={selectedEmployee}
              onCancel={cancelUpdate}
              onClose={handleCloseUpdateModal}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Employee;
