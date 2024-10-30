import React, { useState, useEffect } from 'react';
import { fetchEmployees, deleteEmployee } from '../services/api';
import { useNavigate } from 'react-router-dom';

function EmployeeList({ onEdit }) {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await fetchEmployees();
      setEmployees(response.data); // Set the employee list
      setError(''); // Clear error if fetch is successful
    } catch (err) {
      setError('Could not load employees. Please check your network or contact support.'); // Friendly error message
    }
  };

  const handleDelete = async (empNo) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(empNo); // Delete employee
        loadEmployees(); // Reload employee list
      } catch {
        setError('Failed to delete employee.'); // Error handling for delete operation
      }
    }
  };

  const handleEdit = (employee) => {
    onEdit(employee); // Trigger edit in parent component
    navigate('/employee-form'); // Redirect to form
  };

  return (
    <div>
      <h2>Employee List</h2>
      <input
        type="text"
        placeholder="Search employees"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <p className="text-danger">{error}</p>} {/* Display error message */}
      <ul>
        {employees.filter(emp =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(emp => (
          <li key={emp.empNo}>
            {emp.name} - {emp.department}
            <button onClick={() => handleEdit(emp)}>Edit</button>
            <button onClick={() => handleDelete(emp.empNo)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
