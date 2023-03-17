import React, { useEffect, useState } from 'react';
import { Row, Col, Card, PageHeader, Tooltip, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import { message } from 'antd';
import taskApi from '../api/tasks';
import AuthService from '../services/auth.service';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    try {
      taskApi.loadTasks({}, (response) => {
        setTasks(response.data)
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleFormSubmit = (title) => {
    try {
      taskApi.createTask(title, () => {
        taskApi.loadTasks({}, (response) => {
          setTasks(response.data);
          message.success('Task added!');
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveTask = (task) => {
    taskApi.deleteTask(task, () => {
      taskApi.loadTasks({}, (response) => {
        setTasks(response.data);
        message.success('Task removed!');
      });
    });
  };

  const handleToggleTaskStatus = (task) => {
    taskApi.updateTask({...task, status: task.status === 'open' ? 'completed' : 'open'}, () => {
      taskApi.loadTasks({}, (response) => {
        setTasks(response.data);
        message.success('Task state updated!');
      });
    })
  };

  const handleClickLogout = () => {
    AuthService.logout().then(() => {
      window.location.reload();
    })
  }

  return (
    <>
      <Row
        justify="end"
        align="middle"
        gutter={[0, 20]}
      >
        <Col style={{margin: '10px 12% 0 0'}}>
          <Tooltip title="Logout">
            <Button icon={<LogoutOutlined />} onClick={handleClickLogout}>Logout</Button>
          </Tooltip>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
        gutter={[0, 20]}
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
    </>
  );
};

export default Tasks;
