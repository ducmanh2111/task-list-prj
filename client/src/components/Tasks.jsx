import React, { useEffect, useState } from 'react';
import { Row, Col, Card, PageHeader, Tooltip, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import AddTaskForm from './AddTaskForm';
import FilterTaskForm from './FilterTaskForm';
import TaskList from './TaskList';
import { message } from 'antd';
import taskApi from '../api/tasks';
import AuthService from '../services/auth.service';
import { createQueryString } from '../utils/query';

export default function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  const [tasks, setTasks] = useState([]);
  const [tasksMetaData, setTasksMetaData] = useState({});
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    taskApi.loadTasks({ page: page }).then(response => {
      setTasks(response.data.data);
      setTasksMetaData(response.data.meta);
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

  const onChangePageNumber = (page, pageSize) => {
    const q = new URLSearchParams(searchParams.get('q'));
    const queryParams = createQueryString({ page: page, q: { due_date: q.get('due_date') } });
    setSearchParams(queryParams);
    taskApi.loadTasks({ page: page, per_page: pageSize, q: { due_date: q.get('due_date') } })
      .then(response => {
        setTasks(response.data.data);
        setTasksMetaData(response.data.meta);
      }).catch(error => {
        console.error(error.message);
      });
  }

  const onFilterByDueDate = (_date, dateString) => {
    const queryParams = createQueryString({ page: 1, q: { due_date: dateString } });
    setSearchParams(queryParams);
    taskApi.loadTasks({ page: 1, q: { due_date: dateString } })
      .then(response => {
        setTasks(response.data.data);
        setTasksMetaData(response.data.meta);
      }).catch(error => {
        console.error(error.message);
      });
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
          <FilterTaskForm onFilterByDueDate={onFilterByDueDate}/>
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
              tasksMetaData={tasksMetaData}
              onTaskRemoval={handleRemoveTask}
              onTaskToggle={handleToggleTaskStatus}
              onChangeTaskDueDate={onChangeTaskDueDate}
              onChangePageNumber={onChangePageNumber}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
