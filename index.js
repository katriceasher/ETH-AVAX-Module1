import { useState, useEffect } from "react";
import { ethers } from "ethers";
import taskManagerAbi from "../artifacts/contracts/TaskManager.sol/TaskManager.json";

export default function TaskManagerApp() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [taskManager, setTaskManager] = useState(undefined);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const taskManagerABI = taskManagerAbi.abi;

  useEffect(() => {
    getWallet();
  }, []);

  const getWallet = async () => {
    try {
      if (window.ethereum) {
        setEthWallet(window.ethereum);
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        handleAccount(accounts);
      } else {
        console.log("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error getting wallet:", error);
    }
  };

  const handleAccount = (accounts) => {
    try {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        getTaskManagerContract();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.error("Error handling account:", error);
    }
  };

  const connectAccount = async () => {
    try {
      if (!ethWallet) {
        alert("MetaMask wallet is required to connect");
        return;
      }

      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);
    } catch (error) {
      console.error("Error connecting account:", error);
    }
  };

  const getTaskManagerContract = async () => {
    try {
      let provider;
      if (ethWallet) {
        provider = new ethers.providers.Web3Provider(ethWallet);
      } else {
        provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
      }

      const signer = provider.getSigner();
      const taskManagerContract = new ethers.Contract(contractAddress, taskManagerABI, signer);
      setTaskManager(taskManagerContract);
      loadTasks(taskManagerContract);
    } catch (error) {
      console.error("Error getting contract:", error);
    }
  };

  const loadTasks = async (taskManagerContract) => {
    try {
      const taskCount = await taskManagerContract.totalTasks();
      const tasks = [];
      for (let i = 1; i <= taskCount; i++) {
        const task = await taskManagerContract.taskList(i);
        if (!task.deleted) { // Only add tasks that are not marked as deleted
          tasks.push(task);
        }
      }
      setTasks(tasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const addTask = async () => {
    try {
      if (newTask.trim() === "") return;

      if (taskManager) {
        const tx = await taskManager.addTask(newTask, { gasLimit: 3000000 });
        await tx.wait();
        loadTasks(taskManager);
        setNewTask("");
      }
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const changeTaskStatus = async (id) => {
    try {
      if (taskManager) {
        const tx = await taskManager.changeTaskStatus(id, { gasLimit: 3000000 });
        await tx.wait();
        loadTasks(taskManager);
      }
    } catch (error) {
      console.error("Error changing task status:", error.message);
    }
  };

  const removeTask = async (id) => {
    try {
      if (taskManager) {
        const tx = await taskManager.removeTask(id, { gasLimit: 3000000 });
        await tx.wait();
        // After deletion, filter out the deleted task from state
        setTasks(tasks.filter(task => task.taskId !== id));
      }
    } catch (error) {
      console.error("Error removing task:", error.message);
    }
  };

  const taskList = tasks.map((task) => (
    <li key={task.taskId} className="task-item">
      <div className="task-details">
        <span className="task-content">{task.taskDescription}</span>
        &emsp;|&emsp;
        <span className={`task-status ${task.isCompleted ? "completed" : "pending"}`}>
          {task.isCompleted ? "Completed" : "Pending"}
        </span>
      </div>
      <div className="task-actions">
        <button onClick={() => changeTaskStatus(task.taskId)}>
          {task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button onClick={() => removeTask(task.taskId)}>Delete</button>
      </div>
    </li>
  ));

  return (
    <main className="container">
      <header>
        <h1>Blockchain Task Manager</h1>
      </header>
      {ethWallet ? (
        account ? (
          <div>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter new task"
              className="input-task"
            />
            <button onClick={addTask} className="btn-add-task">
              Add Task
            </button>
            <ul className="task-list">
              {taskList.length > 0 ? taskList : <li>No tasks found</li>}
            </ul>
          </div>
        ) : (
          <button onClick={connectAccount} className="btn-connect">
            Connect MetaMask
          </button>
        )
      ) : (
        <p>Connecting to the local network...</p>
      )}
     <style jsx>{`
        .container {
          text-align: center;
          margin-top: 50px;
          font-family: 'Arial', sans-serif;
          color: #333;
        }

        header {
          background-color: #007bff;
          color: white;
          padding: 20px;
          border-radius: 5px;
        }

        h1 {
          margin: 0;
          font-size: 2.5em;
        }

        .input-task {
          margin-right: 10px;
          padding: 10px;
          width: 300px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .btn-add-task {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: background-color 0.3s, transform 0.3s;
        }

        .btn-add-task:hover {
          background-color: #0056b3;
          transform: translateY(-2px);
        }

        .btn-connect {
          padding: 12px 24px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 18px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: background-color 0.3s, transform 0.3s;
        }

        .btn-connect:hover {
          background-color: #218838;
          transform: translateY(-2px);
        }

        .task-list {
          list-style: none;
          padding: 0;
          margin-top: 20px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .task-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 10px;
          background-color: #f8f9fa;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.3s;
        }

        .task-item:hover {
          transform: translateY(-2px);
        }

        .task-details {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .task-content {
          flex: 1;
          font-size: 16px;
        }

        .task-status {
          margin-left: 10px;
          padding: 4px 8px;
          border-radius: 5px;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 14px;
        }

        .completed {
          background-color: #28a745;
          color: white;
        }

        .pending {
          background-color: #ffc107;
          color: #212529;
        }

        .task-actions {
          display: flex;
          align-items: center;
        }

        .task-actions button {
          margin-left: 8px;
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s, transform 0.3s;
        }

        .task-actions button:hover {
          transform: translateY(-2px);
        }

        .task-actions button:first-child {
          background-color: #007bff;
          color: white;
        }

        .task-actions button:first-child:hover {
          background-color: #0056b3;
        }

        .task-actions button:last-child {
          background-color: #dc3545;
          color: white;
        }

        .task-actions button:last-child:hover {
          background-color: #c82333;
        }
      `}</style>
    </main>
  );
}
