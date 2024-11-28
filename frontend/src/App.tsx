import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  const [submitPressed, setSubmitPressed] = useState(false);

  // function to handle when add pricing scheme button is pressed
  const handleAddPricingScheme = () => {
    // when add button is pressed, initliase a SchemeData object
    const newScheme: SchemeData = {
      id: uuidv4(),
      amount: "rate",
      type: ""
    };
    // add the new scheme to the list
    setSchemeList([...schemeList, newScheme]);
  }

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

  // function to handle when the submit button is pressed
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // this is to prevent the page from refreshing everytime submit is pressed
    setSubmitPressed(false); // This resets the submitPressed state

    try {
      await deleteMethod(); // check and clear database first

      await postMethod(schemeList) // take the schemelist and insert into database

      setSubmitPressed(true); // Set submitPressed to true after successful POST request

    } catch (error: any) {
      // log the errors
      console.error(error.message);
      return; // Stop further execution if the methods fail
    }
  }

  {/* HTTP METHOD FUNCTIONS */ }
  const deleteMethod = async () => {

  }

  const postMethod = async (schemeList: SchemeData[]) => {

  }

  return (
    <>
      {/* TITLE */}
      <div>
        <h2> SOLX CODING CHALLENGE </h2>
      </div>

      {/* ADD PRICING BUTTON */}
      <div>
        <button
          onClick={handleAddPricingScheme}
        >Add pricing scheme</button>
      </div>

      {/* PRICING SCHEME DRAG AND DROP AREA */}
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

              {/* ITERATE AND MAP THROUGH SCHEMELIST AND RENDER EACH COMPONENT */}
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

                      {/* SCHEME COMPONENT */}
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
        {schemeList.length > 0 && schemeList[schemeList.length - 1].type !== "" && (
          <button
            onClick={handleSubmit}
          > Submit </button>
        )}
      </div >

      {/* RESULT AREA */}
      <div>
        <Result />
      </div>
    </>
  )
}

export default App
