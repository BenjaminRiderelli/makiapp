import { useState, useContext } from "react";
import { useQuery } from "react-query";
import { getTasksByUser, getTaskById } from "../../utils/apitask";
import myIssuesStyle from "./myissues.module.css";
import PageHeader from "../pageheader/pageheader.jsx";
import KanbanDnd from "../kanban-dnd/kanban-dnd";
import AddTaskModal from "../addtaskmodal/addtaskmodal";
import { Context } from "../../Context";
import MOCK_DATA from "../kanban-dnd/mock-data";
import TaskListView from "../tasklistview/tasklistview";
import EditTaskModal from "../edittaskmodal/edittaskmodal";
import DeleteModal from "../confirmdeletemodal/confirmdeletemodal";

const MyIssues = () => {
  const [activeView, setActiveview] = useState("kanban");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    userSessionContext: { id: userid, firstname, lastname },
  } = useContext(Context);
  const [data, setData] = useState(MOCK_DATA);
  const [taskId, setTaskId] = useState("");
  const [taskDataState, setTaskDataState] = useState("");

  const userFullName = `${firstname} ${lastname}`;

  const { data: myTasks, refetch: refetchTasks } = useQuery({
    queryKey: ["tasks", { userid: userid, username: userFullName }],
    queryFn: () => getTasksByUser(userid),
    onSuccess: (tasks) => {
      setData(tasks.data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { data: taskData } = useQuery({
    queryKey: ["task", { taskId: taskId }],
    queryFn: () => getTaskById(taskId),
    onSuccess: (task) => {
      setTaskDataState(task);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleEditModal = (taskid) => {
    setTaskId(taskid);
    setShowEditModal(true);
  };
  const handleDeleteModal = (taskid) => {
    setTaskId(taskid);
    setShowDeleteModal(true);
  };


  


  const headerElements = Object.keys(MOCK_DATA).map((columnHeader) => {
    let headerName = "";
    if (columnHeader === "backlog") {
      headerName = "Backlog";
    } else if (columnHeader === "todo") {
      headerName = "To do";
    } else if (columnHeader === "inprogress") {
      headerName = "In progress";
    } else if (columnHeader === "done") {
      headerName = "Done";
    }
    return (
      <h2 className={myIssuesStyle.headerElement} key={headerName}>
        {headerName}
      </h2>
    );
  });

  return (
    <div className={myIssuesStyle.myIssues}>
      <PageHeader
        activeView={activeView}
        setActiveview={setActiveview}
        refetchFn={refetchTasks}
        title="My Issues"
        btntitle="Issue"
        btnFunction={setShowAddModal}
      />
      {showAddModal && <AddTaskModal setShowModal={setShowAddModal} />}
      {showEditModal && (
        <EditTaskModal
          taskId={taskId}
          closeModal={setShowEditModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          taskId={taskId}
          deletedSchema={"task"}
          cancelFn={setShowDeleteModal}
        />
      )}
      {activeView === "kanban" ? (
        <>
          <div className={myIssuesStyle.header}>{headerElements}</div>
          <KanbanDnd handleEditModal={handleEditModal} 
          handleDeleteModal={handleDeleteModal}
          data={data} />
        </>
      ) : (
        <TaskListView handleEditModal={handleEditModal}
        handleDeleteModal={handleDeleteModal}
        data={data} />
      )}
    </div>
  );
};

export default MyIssues;
