import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Tag, List, Button, Popconfirm, Switch, DatePicker, Space } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import { disabledDate } from '../utils/time';

const TaskItem = ({
  task,
  onTaskRemoval,
  onTaskToggle,
  onChangeTaskDueDate
}) => {

  return (
    <List.Item
      actions={[
        <Space direction="vertical">
          <Tooltip
            title={'Due Date'}
          >
            <DatePicker
              disabledDate={disabledDate}
              defaultValue={task.due_date ? moment(task.due_date) : null}
              onChange={(date, dateString) => onChangeTaskDueDate(task, dateString)}
            />
          </Tooltip>
        </Space>,
        <Tooltip
          title={task.status === 'completed' ? 'Mark as uncompleted' : 'Mark as completed'}
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => onTaskToggle(task)}
            defaultChecked={task.status === 'completed'}
          />
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            onTaskRemoval(task);
          }}
        >
          <Button type="primary" danger>
            X
          </Button>
        </Popconfirm>
      ]}
      className="list-item"
      key={task.id}
    >
      <div className="task-item">
        <Tag color={task.status === 'completed' ? 'cyan' : 'red'}>
          <Link
            to={{
              pathname: `${task.id}`,
            }}
          >
            {task.title}
          </Link>
        </Tag>
      </div>
    </List.Item>
  );
};

export default TaskItem;
