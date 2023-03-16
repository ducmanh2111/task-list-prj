import React, { useEffect, useState } from 'react';
import { Row, Col, Card, PageHeader } from 'antd';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import { message } from 'antd';
import taskApi from '../api/tasks';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [toggleReload, setToggleReload] = useState(false);

  useEffect(() => {
    taskApi.loadTasks({}, (response) => {
      setTasks(response.data)
    });
  }, [toggleReload]);

  const handleFormSubmit = (title) => {
    taskApi.createTask(title, () => {
      message.success('Task added!');
      setToggleReload(!toggleReload);
    });
  };

  const handleRemoveTask = (task) => {
    taskApi.deleteTask(task, () => {
      message.warn('Task removed!');
      setToggleReload(!toggleReload);
    });
  };

  const handleToggleTaskStatus = (task) => {
    taskApi.updateTask({...task, status: task.status === 'open' ? 'completed' : 'open'}, () => {
      message.info('Task state updated!');
      setToggleReload(!toggleReload);
    })
  };

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 20]}
      className="tasks-container"
    >
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <PageHeader
          title="Add Task"
          subTitle="To add a task, just fill the form below and click in add task."
        />
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Create a new task">
          <AddTaskForm onFormSubmit={handleFormSubmit} />
        </Card>
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Task List">
          <TaskList
            tasks={tasks}
            onTaskRemoval={handleRemoveTask}
            onTaskToggle={handleToggleTaskStatus}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Tasks;
