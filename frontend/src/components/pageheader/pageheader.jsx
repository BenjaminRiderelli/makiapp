import { useContext, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import headerStyle from "./pageheader.module.css";
import Select from "react-select";
import { Context } from "../../Context";

const PageHeader = ({
  setActiveview,
  activeView,
  title,
  btntitle,
  btnFunction,
  refetchFn,
  filterData,
  setFilterData,
}) => {

  const emptyOption = { label: "No option selected", id: "No options" };
  const context = useContext(Context);
  const { userSessionContext } = context;
  const [filterProjectOptions, setFilterProjectOptions] = useState([
    emptyOption,
  ]);
  const [filterCycleOptions, setFilterCycleOptions] = useState([emptyOption]);

  useEffect(() => {
    setFilterProjectOptions(() => {
      const projects = filterData?.teams?.map((team) => {
        return { label: team.project?.title, id: team.project?._id };
      });
      return [emptyOption, ...projects];
    });
    setFilterCycleOptions(
      filterData?.cycles?.map((cycle) => {
        return { label: cycle.title, id: cycle._id };
      })
    );
  }, [filterData]);

  const today = new Date().toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const parts = today.split("/");
  const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;

  const projectOptions = filterProjectOptions?.map((project) => {
    return { label: project.label, value: project.id };
  });

  const cycleOptions = filterCycleOptions?.map((cycle) => {
    return { label: cycle.label, value: cycle.id };
  });
  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.wrapper}>
        <span></span>
        <div className={headerStyle.titleContainer}>
          <h1>{title}</h1>
          <p className={headerStyle.date}>{formattedDate}</p>
        </div>
        <span></span>
      </div>
      <div className={headerStyle.toolBar}>
        <div className={headerStyle.filterWrapper}>
          {filterData.type === "complex" ? (
            <>
              {/* PROJECTS */}
              <Select
                value={filterData.selectedProject}
                onChange={(e) => {
                  setFilterData((prevState) => {
                    return { ...prevState, selectedProject: e };
                  });
                }}
                classNames={{ control: () => headerStyle.select }}
                options={projectOptions}
              />
              {/* CYCLES */}
              <Select
                isMulti
                value={filterData.selectedCycles || filterData.cycles}
                onChange={(e) => {
                  console.log(e)
                  setFilterData((prevState) => {
                    return { ...prevState, selectedCycles: e };
                  });
                }}
                classNames={{ control: () => headerStyle.select }}
                options={cycleOptions}
              />
            </>
          ) : (
            <div className={headerStyle.searchDialog}>
              <label htmlFor="searchinput">
                <SearchIcon className={headerStyle.icon} />
              </label>
              <input
                id="searchinput"
                type="text"
                placeholder="Search an issue"
              />
            </div>
          )}
        </div>
        {title !== "Projects" && (
          <div className={headerStyle.switchViewBtnContainer}>
            <button
              onClick={() => {
                refetchFn();
                setActiveview("kanban");
              }}
              className={
                activeView === "kanban"
                  ? headerStyle.activebtn
                  : headerStyle.btn
              }
            >
              <ViewKanbanOutlinedIcon className={headerStyle.icon} />
              Board view
            </button>
            <button
              onClick={() => setActiveview("list")}
              className={
                activeView === "list" ? headerStyle.activebtn : headerStyle.btn
              }
            >
              <FormatListBulletedOutlinedIcon className={headerStyle.icon} />
              List view
            </button>
          </div>
        )}
        {filterData.type === "complex" && <span></span>}

        <button onClick={() => btnFunction(true)} className={headerStyle.btn}>
          <AddCircleOutlineOutlinedIcon />
          Add {btntitle}
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
