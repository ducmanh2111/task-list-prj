import axios from '../utils/api';

const tasks = {
  loadTasks(params = {}) {
    return axios.get('/tasks', { params: params });
  },
  loadTask(id) {
    return axios.get(`/tasks/${id}`);
  },
  createTask(params) {
    return axios.post('/tasks', { task: params });
  },
  updateTask(params) {
    return axios.patch(`/tasks/${params.id}`, { task: params });
  },
  deleteTask(params) {
    return axios.delete(`/tasks/${params.id}`);
  },
}

export default tasks;
