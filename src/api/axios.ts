    import axios from 'axios';

    axios.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
        }
        return Promise.reject(err);
    }
    );
