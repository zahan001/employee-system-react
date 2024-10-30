import axios from 'axios';

const BASE_URL = 'https://examination.24x7retail.com'; // Updated to HTTPS
const API_TOKEN = '?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQf'; // API key

// Set up the axios instance with default headers
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Ensure the content type is JSON
    'apiToken': API_TOKEN, // Include the API token in the headers
  },
});

// Fetch all employees
export const fetchEmployees = async () => {
  try {
    const response = await apiClient.get('/api/v1.0/Employees');
    return response.data; // Return response data directly
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error; // Throw error to be handled in the calling component
  }
};

// Fetch all departments
export const fetchDepartments = async () => {
  try {
    const response = await apiClient.get('/api/v1.0/Departments');
    return response.data; // Return response data directly
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

// Add new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await apiClient.post('/api/v1.0/Employee', employeeData);
    return response.data; // Return response data directly
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

// Update existing employee
export const updateEmployee = async (employeeData) => {
  try {
    const response = await apiClient.put('/api/v1.0/Employee', employeeData);
    return response.data; // Return response data directly
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

// Delete an employee
export const deleteEmployee = async (empNo) => {
  try {
    await apiClient.delete(`/api/v1.0/Employee/${empNo}`);
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};
