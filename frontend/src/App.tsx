import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// components
import Scheme from "./components/Scheme";
import Result from "./components/Result";

// interfaces
// Interface for SchemeData
interface SchemeData {
  id: string;
  amount: string;
  type: string;
}

function App() {
  // array to store the schemes 
  const [schemeList, setSchemeList] = useState<SchemeData[]>([]);

  // function to handle when user makes an input
  const handleSchemeDataChange = (id: string, updatedData: SchemeData) => {
    // map through the list and find the scheme that matches the id 
    const updatedSchemeList = schemeList.map(scheme =>
      scheme.id === id ? updatedData : scheme // update the data
    );

    // re-set the new list
    setSchemeList(updatedSchemeList);
  }

  // function to handle deletion of price scheme in the UI NOT in the database
  const handleDelete = (event: any) => {
    const { id } = event.target;

    // Filter out the scheme with the matching id
    const updatedSchemeList = schemeList.filter((scheme) => scheme.id !== id);

    // Update the list with the filtered list
    setSchemeList(updatedSchemeList);
  }

  return (
    <>
      <div>
        <h2> SOLX CODING CHALLENGE </h2>
      </div>

      {/* ADD PRICING BUTTON */}
      <div>
        <button>Add pricing scheme</button>
      </div>

      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;
          if (!destination) return;
          const updatedSchemeList = Array.from(schemeList);
          const [movedItem] = updatedSchemeList.splice(source.index, 1);
          updatedSchemeList.splice(destination.index, 0, movedItem);
          setSchemeList(updatedSchemeList);
        }}
      >
        <Droppable droppableId="schemeList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {schemeList.map((scheme, index) => (
                <Draggable key={scheme.id} draggableId={scheme.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="scheme"
                    >
                      {/* DELETE BUTTON */}
                      <button
                        id={scheme.id}
                        onClick={(event) => handleDelete(event)}
                        className="button"
                      >
                        -
                      </button>
                      <Scheme
                        schemeData={scheme}
                        onSchemeDataChange={(updatedData) =>
                          handleSchemeDataChange(scheme.id, updatedData)
                        }
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext >

      {/* SUBMIT BUTTON */}
      < div >
        <button>Submit</button>
      </div >

      <div>
        <Result />
      </div>
    </>
  )
}

export default App
