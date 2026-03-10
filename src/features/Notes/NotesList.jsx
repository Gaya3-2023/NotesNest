import styles from './NotesList.module.css';
import {useState} from 'react';
import FormCommonField from '../../shared/FormCommonField';
import NoteCard from './NoteCard';

export default function NotesList({note,removeNote,updateNote,categories,noteTitle,selectedCategory}){
  
    const [isEditing,setIsEditing] = useState(false);
    const [workingNoteList,setWorkingNoteList] = useState(note);

    function handleChange(e){
         const {name,value} = e.target;  
        setWorkingNoteList((prevValues) => ({
          ...prevValues, [name]:value }));
    }
    
    function handleUpdate(e){
        e.preventDefault();
        updateNote(workingNoteList);
        setIsEditing(false);
    }

    return(
        <>
        <div className={styles.notelist}>
            {isEditing ? ( <> 
              <form onSubmit={handleUpdate}>
                <FormCommonField type="input" label="Category" name="category" value={workingNoteList.category} list="noteCategories"
                                 onChange={handleChange} maxLength="20"><datalist id="noteCategories">
                      {categories.map((category) => (<option key={category} value={category}/>))}</datalist> </FormCommonField> 
                <FormCommonField type="input" label="Title" name="title" value={workingNoteList.title} 
                                 onChange={handleChange} list='noteTitle' maxLength="50" >
                                  <datalist id="noteTitles">{noteTitle.map((title) => (<option key={title} value={title}/>))}
                                 </datalist>  </FormCommonField> 
                <FormCommonField type="textarea" label="Description" name="description" value={workingNoteList.description} 
                                 onChange={handleChange} rows="5" maxLength="300"> </FormCommonField> 
             
               <button type="submit">Update</button>
               <button onClick={() => setIsEditing(false)}>Cancel</button>
              </form> 
            
             </> ) : ( 
                <>
                 <NoteCard note={note} selectedCategory={selectedCategory} 
                             setIsEditing={setIsEditing} removeNote={removeNote}/>
                                          </>
                )}
             </div>
        </>
    )
}