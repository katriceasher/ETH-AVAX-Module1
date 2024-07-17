// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TaskManager {
    struct Task {
        uint taskId;
        string taskDescription;
        bool isCompleted;
    }

    uint public totalTasks = 0;
    mapping(uint => Task) public taskList;

    event TaskAdded(uint taskId, string taskDescription, bool isCompleted);
    event TaskStatusChanged(uint taskId, bool isCompleted);
    event TaskRemoved(uint taskId);

    function addTask(string memory _description) public {
        totalTasks++;
        taskList[totalTasks] = Task(totalTasks, _description, false);
        emit TaskAdded(totalTasks, _description, false);
    }

    function changeTaskStatus(uint _taskId) public {
        Task memory _task = taskList[_taskId];
        _task.isCompleted = !_task.isCompleted;
        taskList[_taskId] = _task;
        emit TaskStatusChanged(_taskId, _task.isCompleted);
    }

    function removeTask(uint _taskId) public {
        delete taskList[_taskId];
        emit TaskRemoved(_taskId);
    }

    function getTask(uint _taskId) public view returns (uint, string memory, bool) {
        Task memory _task = taskList[_taskId];
        return (_task.taskId, _task.taskDescription, _task.isCompleted);
    }

    function getTotalTasks() public view returns (uint) {
        return totalTasks;
    }
}
