import axios from '../utils/api';

const tasks = {
  loadTasks(params = {}, cb) {
    axios.get('/tasks.json', {
      params: params
    }).then(function(response) {
      cb(response.data);
    }).catch(function(error) {
      console.log(error.response);
    });
  },
  createTask(params, cb) {
    axios.post('/tasks.json',
        { task: params }
    ).then(function(response) {
      cb(response.data);
    }).catch(function(error) {
      console.log(error.response);
    });
  },
  updateTask(params, cb) {
    axios.patch(`/tasks/${params.id}.json`, { task: params }).then(res => cb(res.data)).catch(error => console.log(error));
  },
  deleteTask(params, cb) {
    axios.delete(`/tasks/${params.id}`)
    .then(function(response) {
      cb(response.data);
    }).catch(function(error) {
      console.log(error.response);
    });
  },
}

export default tasks;
