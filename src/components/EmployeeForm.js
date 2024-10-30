import React, { useState, useEffect } from 'react';
import { addEmployee, updateEmployee, fetchDepartments } from '../services/api';
import { useNavigate } from 'react-router-dom';

function EmployeeForm({ currentEmployee, onSave }) {
  // Form state that will either be blank for a new employee or pre-filled for an edit
  const [employeeData, setEmployeeData] = useState(
    currentEmployee || { name: '', department: '' }
  );
  const [departments, setDepartments] = useState([]); // List of available departments
  const [error, setError] = useState(''); // Error handling state
  const navigate = useNavigate();

  // Fetch departments when the component mounts
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const response = await fetchDepartments();
        setDepartments(response.data); // Populate the departments dropdown
      } catch {
        setError('Failed to load departments');
      }
    };
    loadDepartments();
  }, []);

  // Update form fields as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value }); // Update specific field in employeeData
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (currentEmployee) {
        // If editing, update the employee
        await updateEmployee(currentEmployee.empNo, employeeData);
      } else {
        // Otherwise, add a new employee
        await addEmployee(employeeData);
      }
      onSave(); // Clear selected employee in parent App
      navigate('/'); // Redirect to employee list
    } catch {
      setError('Failed to save employee');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border">
      <h3>{currentEmployee ? 'Edit Employee' : 'Add New Employee'}</h3>

      {/* Name input field */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={employeeData.name}
          onChange={handleChange}
          placeholder="Enter employee name"
          required
        />
      </div>

      {/* Department dropdown */}
      <div className="mb-3">
        <label htmlFor="department" className="form-label">Department</label>
        <select
          className="form-control"
          name="department"
          value={employeeData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Error message display */}
      {error && <p className="text-danger">{error}</p>}

      {/* Submit button */}
      <button type="submit" className="btn btn-primary">
        {currentEmployee ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
}

export default EmployeeForm;
