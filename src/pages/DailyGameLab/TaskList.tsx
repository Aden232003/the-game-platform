import React from 'react';
import TaskCard from './TaskCard';
import { DailyTask } from '../../types';

interface TaskListProps {
  tasks: DailyTask[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;