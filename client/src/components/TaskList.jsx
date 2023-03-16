import React from 'react';

import { List } from 'antd';

import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  onTaskRemoval,
  onTaskToggle,
}) => (
  <List
    locale={{
      emptyText: "There's nothing to do :(",
    }}
    dataSource={tasks}
    renderItem={(task) => (
      <TaskItem
        task={task}
        onTaskToggle={onTaskToggle}
        onTaskRemoval={onTaskRemoval}
      />
    )}
    pagination={{
      position: 'bottom',
      pageSize: 10,
    }}
  />
);

export default TaskList;
