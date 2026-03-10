import {useRef,useState} from 'react';
import styles from './NotesForm.module.css';
import FormCommonField from '../shared/FormCommonField';

export default function NotesForm({addNote,categories,noteTitle,isSaving}){
    let  initialState = { id:'', category:'',title:'',description:'',date:''};
    const [workingNote,setWorkingNote] = useState(initialState);
    const noteCategoryInput = useRef();      
       
    function handleAddNote(event){
      event.preventDefault();
      const category = event.target.category.value;
      const title= event.target.title.value;
      const description= event.target.description.value;
      addNote({category,title,description}); 
      setWorkingNote(initialState);  
      noteCategoryInput.current.focus();     
    }

    function handleChange(e){
        const {name,value} = e.target;  
        setWorkingNote((prevValues) => ({...prevValues,[name]:value}));
     }
    
    return(
        <>
        <form onSubmit={handleAddNote} className={styles.formbox}>
             <FormCommonField type="input" label="Category" name="category" value={workingNote.category} onChange={handleChange}
                              list="noteCategories" maxLength="20" ref={noteCategoryInput}>
                                <datalist id="noteCategories">
                      {categories.map((category) => (category !== "All" ? <option key={category} value={category}/> : ''))}
                                </datalist> 
              </FormCommonField>  
              <FormCommonField type="input" label="Title" name="title" value={workingNote.title} onChange={handleChange}
                              list="noteTitles" maxLength="50">
                              <datalist id="noteTitles">{noteTitle.map((title) => (<option key={title} value={title}/>))}
                               </datalist> 
              </FormCommonField>  
               <FormCommonField type="textarea" label="Description" name="description" value={workingNote.description} onChange={handleChange}
                             rows="10" maxLength="300">
                                
              </FormCommonField>  
               <input type="submit" value= {isSaving ? "Saving..." : "Add Note"}
            disabled = {!workingNote.category && !workingNote.title && !workingNote.description } />                                   
        </form> 
        </>
    )

}