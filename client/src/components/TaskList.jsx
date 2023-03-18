import React from 'react';

import { List } from 'antd';

import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  onTaskRemoval,
  onTaskToggle,
  onChangeTaskDueDate
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
        onChangeTaskDueDate={onChangeTaskDueDate}
      />
    )}
    pagination={{
      position: 'bottom',
      pageSize: 5,
    }}
  />
);

export default TaskList;
