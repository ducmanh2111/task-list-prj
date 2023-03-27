import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Tag, List, Button, Popconfirm, Switch, DatePicker, Space } from 'antd';
import { CloseOutlined, CheckOutlined, FlagFilled } from '@ant-design/icons';
import moment from 'moment';
import { disabledDate } from '../utils/time';

const TaskItem = ({
  task,
  onTaskRemoval,
  onTaskToggle,
  onChangeTaskDueDate
}) => {
  const currentTime = moment();
  const dueDate = moment(task.due_date || null);

  const isOverDueTaskAndNotComplete = currentTime.isAfter(dueDate) && task.status !== 'completed';

  return (
    <List.Item
      actions={[
        <FlagFilled
          style={{color: isOverDueTaskAndNotComplete ? 'red' : 'transparent', fontSize: '1.5em', marginRight: '3px' }}
        />,
        <Space direction="vertical">
          <Tooltip
            title={'Due Date'}
          >
            <DatePicker
              disabledDate={disabledDate}
              defaultValue={task.due_date ? moment(task.due_date) : null}
              onChange={(_date, dateString) => onChangeTaskDueDate(task, dateString)}
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
              pathname: `/tasks/${task.id}`,
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
