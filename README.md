# Task Manager

## Overview

The TaskManager application is a task management system built on the Ethereum blockchain. It includes a Solidity smart contract for backend logic and a React frontend for user interaction. The application allows users to add, update, and remove tasks, with all data stored on the blockchain.

## Features

- **Add Task:** Create a new task with a description.
- **Change Task Status:** Toggle the completion status of a task.
- **Remove Task:** Delete a task from the task list.
- **Retrieve Tasks:** Get details of individual tasks.
- **Retrieve Total Tasks:** Get the total number of tasks.

## Functionality

- **Add Task:** Allows users to add new tasks with descriptions.
- **Change Task Status:** Users can mark tasks as completed or pending.
- **Remove Task:** Users can delete tasks.
- **Retrieve Tasks:** Fetch details of tasks including ID, description, and status.
- **Retrieve Total Tasks:** Fetch the total number of tasks in the system.

## Events

- TaskAdded: Emitted when a new task is added.
- TaskStatusChanged: Emitted when a task's status is changed.
- TaskRemoved: Emitted when a task is removed.

## Solidity Version

This contract uses Solidity version `^0.8.9`.

## Usage

### Deploying the Smart Contract

1. Open this repository in gitpod
2. Inside the project directory, in the terminal type: npm i
3. Open two additional terminals in your VS code
4. In the second terminal type: npx hardhat node
5. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
6. Back in the first terminal, type npm run dev to launch the front-end.
7. After this, the project will be running on your localhost.
Typically at http://localhost:3000/
8. Interact with the front-end functionalities.

Author:

@katriceasher
