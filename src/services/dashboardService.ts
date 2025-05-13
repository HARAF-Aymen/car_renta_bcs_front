    import axios from 'axios';

    export const fetchDashboardStats = async () => {
    const token = localStorage.getItem('token');
    console.log('Dashboard token :', token);
    const response = await axios.get('http://localhost:5000/api/dashboard/', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
    };
