import Notes from '../features/Notes/Notes.jsx';
import NotesForm from '../features/NotesForm.jsx';
import styles from './NotesPage.module.css';

export default function NotesPage({
    addNote,categories,noteTitle,isLoading,isSaving,setSelectedCategory,
    selectedCategory,searchNote,filteredNoteList,removeNote,updateNote,viewBy,setViewBy,setErrorMessage,errorMessage,
    togglePinEvent,viewPinnedNotes,setViewPinnedNotes,colorList,updateNoteColor})
{
    return(
           <>
           <div className={styles.noteform}>                                 
                <NotesForm addNote={addNote} categories={categories} noteTitle={noteTitle} isSaving={isSaving}/> 
            </div>           
            <div className={styles.notesdisplay}>                               
                <Notes noteList={filteredNoteList} removeNote={removeNote} 
                       categories={categories} noteTitle={noteTitle}
                       isLoading={isLoading} updateNote={updateNote}
                       searchNote={searchNote} selectedCategory={selectedCategory} 
                       setErrorMessage={setErrorMessage} errorMessage={errorMessage} setSelectedCategory={setSelectedCategory}
                       viewBy={viewBy} setViewBy={setViewBy}
                       togglePinEvent={togglePinEvent} 
                       viewPinnedNotes={viewPinnedNotes} setViewPinnedNotes={setViewPinnedNotes}
                       colorList={colorList} updateNoteColor={updateNoteColor}
                        /> 
            </div> 
            </>
    )
}

