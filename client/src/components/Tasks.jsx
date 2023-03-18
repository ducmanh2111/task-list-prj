import React, { useEffect, useState } from 'react';
import { Row, Col, Card, PageHeader, Tooltip, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import { message } from 'antd';
import taskApi from '../api/tasks';
import AuthService from '../services/auth.service';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    taskApi.loadTasks().then(response => {
      setTasks(response.data.data);
    }).catch(error => {
      console.error(error.message);
    });
  }, [isReload]);

  const handleFormSubmit = (title) => {
    taskApi.createTask(title).then(_response => {
      setIsReload(!isReload);
      message.success('Task added!');
    }).catch(error => {
      message.error(error.message);
    });
  };

  const handleRemoveTask = (task) => {
    taskApi.deleteTask(task).then(_response => {
      setIsReload(!isReload);
      message.success('Task removed!');
    }).catch(error => {
      message.error(error.message);
    });
  };

  const handleToggleTaskStatus = (task) => {
    taskApi.updateTask({...task, status: task.status === 'open' ? 'completed' : 'open'}).then(_res => {
      setIsReload(!isReload);
      message.success('Task state updated!');
    }).catch(error => {
      message.error(error.message);
    });
  };

  const onChangeTaskDueDate = (task, date) => {
    taskApi.updateTask({...task, due_date: date}).then(_res => {
      setIsReload(!isReload);
      message.success('Task Due Date updated!');
    }).catch(error => {
      message.error(error.message);
    })
  }

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
              onChangeTaskDueDate={onChangeTaskDueDate}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
