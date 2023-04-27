import { useState } from "react";
import DroppingArea from "./droppingarea/droppingarea";
import DraggableWidget from "./draggablewidget/draggablewidget";
import kanbanStyle from "./kanban.module.css";

function Kanban() {
  //   Hacer que pueda recibir un array con "estados" y generar una columna y un useState para cada uno
  //   con el objetivo de hacerlo más reutilizable

  const [groupOneWidgets, setGroupOneWidgets] = useState(["1", "2"]);
  const [groupTwoWidgets, setGroupTwoWidgets] = useState(["3", "4"]);
  const [groupThreeWidgets, setGroupThreeWidgets] = useState([
    "5",
    "6",
  ]);
  const [groupFourWidgets, setGroupFourWidgets] = useState(["7", "8"]);

  return (
    <div className={kanbanStyle.kanbanArea}>
      <DroppingArea setWidgets={setGroupOneWidgets} widgets={groupOneWidgets}>
        {groupOneWidgets?.map((widget, index) => (
          <DraggableWidget
            widgetList={groupOneWidgets}
            updateWidgetList={setGroupOneWidgets}
            title={widget}
            key={index}
            index={index}
          />
        ))}
      </DroppingArea>

      <DroppingArea setWidgets={setGroupTwoWidgets} widgets={groupTwoWidgets}>
        {groupTwoWidgets?.map((widget, index) => (
          <DraggableWidget
            widgetList={groupTwoWidgets}
            updateWidgetList={setGroupTwoWidgets}
            title={widget}
            key={index}
            index={index}
          />
        ))}
      </DroppingArea>
      <DroppingArea
        setWidgets={setGroupThreeWidgets}
        widgets={groupThreeWidgets}
      >
        {groupThreeWidgets?.map((widget, index) => (
          <DraggableWidget
            widgetList={groupThreeWidgets}
            updateWidgetList={setGroupThreeWidgets}
            title={widget}
            key={index}
            index={index}
          />
        ))}
      </DroppingArea>
      <DroppingArea setWidgets={setGroupFourWidgets} widgets={groupFourWidgets}>
        {groupFourWidgets?.map((widget, index) => (
          <DraggableWidget
            widgetList={groupFourWidgets}
            updateWidgetList={setGroupFourWidgets}
            title={widget}
            key={index}
            index={index}
          />
        ))}
      </DroppingArea>
    </div>
  );
}

export default Kanban;
