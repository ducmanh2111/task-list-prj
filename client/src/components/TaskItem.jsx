import React from 'react';
import { Tooltip, Tag, List, Button, Popconfirm, Switch, DatePicker, Space } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const TaskItem = ({
  task,
  onTaskRemoval,
  onTaskToggle,
}) => {
  return (
    <List.Item
      actions={[
        <Space direction="vertical">
          <Tooltip
            title={'Due Date'}
          >
            <DatePicker
              onChange={(date, dateSring) => {
                console.log(date, dateSring)
              }}
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
        <Tag color={task.status === 'completed' ? 'cyan' : 'red'} className="task-tag">
          {task.title}
        </Tag>
      </div>
    </List.Item>
  );
};

export default TaskItem;
