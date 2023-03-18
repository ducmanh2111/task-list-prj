import React from 'react';

import { List } from 'antd';

import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  tasksMetaData,
  onTaskRemoval,
  onTaskToggle,
  onChangeTaskDueDate,
  onChangePageNumber
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
      current: tasksMetaData.page,
      total: tasksMetaData.total_result,
      onChange: (page, pageSize) => onChangePageNumber(page, pageSize)
    }}
  />
);

export default TaskList;
