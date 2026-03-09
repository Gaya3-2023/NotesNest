import Notes from '../features/Notes/Notes.jsx';
import NotesForm from '../features/NotesForm.jsx';
import styles from './NotesPage.module.css';
/*import NotesFilter from '../features/Notes/NotesFilter/NotesFilter.jsx'; */

export default function NotesPage({
    addNote,categories,noteTitle,isLoading,isSaving,setSelectedCategory,
    selectedCategory,searchNote,filteredNoteList,removeNote,updateNote,viewBy,setViewBy,setErrorMessage,errorMessage})
{
    return(
           <>
           <div className={styles.noteform}>                                 
                <NotesForm addNote={addNote} categories={categories} noteTitle={noteTitle} isSaving={isSaving}/> 
            </div>           
            <div className={styles.notesdisplay}>  
               {/*} <NotesFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                             categories={categories} viewBy={viewBy} setViewBy={setViewBy}/> */}
                
                <Notes noteList={filteredNoteList} removeNote={removeNote} 
                       categories={categories} noteTitle={noteTitle}
                       isLoading={isLoading} updateNote={updateNote}
                       searchNote={searchNote} selectedCategory={selectedCategory} 
                       setErrorMessage={setErrorMessage} errorMessage={errorMessage} setSelectedCategory={setSelectedCategory}
                       viewBy={viewBy} setViewBy={setViewBy}
                        /> 
            </div> 
            </>
    )
}

