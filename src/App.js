import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import 'bootstrap/dist/css/bootstrap.min.css';

// Main application component
function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to hold the employee to edit

  // Function to handle editing an employee
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee); // Set selected employee to be edited
  };

  // Function to reset the selected employee after saving
  const resetSelectedEmployee = () => {
    setSelectedEmployee(null); // Clear the selected employee data
  };

  return (
    <Router>
      <div className="container">
        <h1 className="text-center my-4">Employee Management System</h1>
        <Routes>
          {/* Route for the Employee List page */}
          <Route
            path="/"
            element={<EmployeeList onEdit={handleEditEmployee} />}
          />

          {/* Route for Add/Edit Employee Form page */}
          <Route
            path="/employee-form"
            element={<EmployeeForm currentEmployee={selectedEmployee} onSave={resetSelectedEmployee} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
