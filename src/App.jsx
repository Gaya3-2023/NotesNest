import './App.css';
import { useState,useEffect, useCallback,useMemo } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import styles from './App.module.css';
import { Routes,Route,useLocation } from 'react-router';
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import NotesPage from './pages/NotesPage';
import ErrorComponent from './shared/ErrorComponent';
import { getNotes,saveNotes } from './services/notesService';

function App() {
  
  const [isSaving,setIsSaving]  = useState(false);
  const [isLoading,setIsLoading] = useState(true);
  const [errorMessage,setErrorMessage] = useState("");
  const [searchNote,setSearchNote] = useState('');
  const [selectedCategory,setSelectedCategory] = useState("All");
  const [viewBy,setViewBy] = useState("New to Old");  
  const [viewPinnedNotes,setViewPinnedNotes] = useState(false);
  const currentDate = new Date();
  const currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  const date = `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentTime}`; 
  const [noteList,setNoteList] = useState([]);   
  const location = useLocation();
  const colorList = ['#cdfc93','#ff7ecd','#71d7ff','#c381ff','#fff68b'];
  
 
  const title = useMemo(() => {
      if(location.pathname === "/"){
        return "NotesNest";
      }
      else if(location.pathname === "/about"){
        return "About";
       }
       else{
        return "Page Not Found";
       }
  },[location.pathname]);

    //Load Notes
  useEffect(() => {
    async function loadNotes(){
      try{
        const notes = await getNotes();
        setNoteList(notes);
      }
      catch(e){
        setErrorMessage(`Failed to load Notes. ${e}`);
      }
      finally{
        setIsLoading(false);
      }
    }
    loadNotes();
  },[]);

  const categories = ["All",...new Set(noteList.map(note => note.category.toLowerCase()))];
  const noteTitle = [...new Set(noteList.map(note => note.title.toLowerCase()))];
         
  useEffect(() => {
    async function persistNotes(){
      try{
        await saveNotes(noteList);
      }
      catch(e){
        setErrorMessage(`Failed to Save Notes.  ${e}`);
      }
    }
    if(!isLoading){
      persistNotes();
    }
  },[noteList,isLoading]);
   
 
const filteredNoteList = useMemo(() => {

  let filtered;
  if(selectedCategory === "All") {
    filtered=[...noteList];      
  }
  else{
    filtered = noteList.filter((note) => note.category.toLowerCase() === selectedCategory.toLowerCase())       
  }
  if(searchNote.trim()){
     let searchVal = searchNote.toLowerCase();
     filtered = filtered.filter((item) => {
     if(item.category.toLowerCase().includes(searchVal) || item.title.toLowerCase().includes(searchVal) || 
            item.description.toLowerCase().includes(searchVal))
              {return item;}
       })
  }

  filtered.sort((a,b) =>  {
        const dateA= new Date(a.date);
        const dateB= new Date(b.date);
        if(viewBy === "New to Old"){
          return dateB - dateA 
        }
        else{
          return dateA - dateB 
        }
      });

   if(viewPinnedNotes){
    filtered = noteList.filter((note) => note.pinned)
   } 
   

     
  return filtered;      

},[noteList,selectedCategory,searchNote,viewBy,viewPinnedNotes])


 const addNote = useCallback(async ({category, title, description}) => {
  setIsSaving(true); 
  //const newNote = { category, title, description, id: Date.now(), date,pinned:false };
  const newNote = { category, title, description, id: Date.now(), date,pinned :false,color:'#FFFAAE' };
  const updatedNotes = [...noteList,newNote];
  setNoteList(updatedNotes);
  await saveNotes(updatedNotes);
  setTimeout(() => setIsSaving(false), 500);
}, [noteList,date]);


 async function removeNote(id){
    try{       
    const noteItems = noteList.filter((note) => note.id !== id);
    setNoteList(noteItems); 
    await saveNotes(noteItems);   
    }
    catch(e){
      setErrorMessage(`Failed to remove the note. ${e}`);
    }
  }

 async function updateNote(updatedNote){
    try{      
     const updatedNotes = noteList.map(note=> (note.id === updatedNote.id ? {...updatedNote,date} : note));
     setNoteList(updatedNotes);
     await saveNotes(updatedNotes);  
    }
    catch(e){
      setErrorMessage(`Failed to update the note. ${e}`);
    }
  } 

   function updateNoteColor(colors,id){
    setNoteList(prevNotes => prevNotes.map(note => (note.id === id ? {...note,color:colors}: note)))      
    
  }

    function togglePinEvent(id){
    try{
      setNoteList(prevNotes => prevNotes.map(note=> (note.id === id ? {...note,pinned:!note.pinned}: note)));
    }
    catch(e){
      setErrorMessage(`Failed to update the pin. ${e}`);
    }
   }

 return (
    <>    
       <div className={styles.header}>
       <Header title={title} searchNote={searchNote} setSearchNote={setSearchNote} /> 
       </div>
       <div className={styles.bodycontent}>          
       <Routes>
         <Route path="/" element={<>  
                      <NotesPage addNote={addNote} categories={categories} noteTitle={noteTitle} isSaving={isSaving}
                        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} searchNote={searchNote}
                        filteredNoteList={filteredNoteList} removeNote={removeNote}  
                        isLoading={isLoading} updateNote={updateNote} 
                        viewBy={viewBy} setViewBy={setViewBy}
                        setErrorMessage={setErrorMessage} errorMessage={errorMessage}
                        togglePinEvent={togglePinEvent}
                        viewPinnedNotes={viewPinnedNotes} setViewPinnedNotes={setViewPinnedNotes}
                        colorList={colorList} updateNoteColor={updateNoteColor}/>
                     </>
                    }/>
         <Route path="/about" element={ <About/>}/>
         <Route path="/*" element={<NotFound/>}/>           
       </Routes>
        {errorMessage && <ErrorComponent errorMessage={errorMessage} setErrorMessage={setErrorMessage} 
                                         setSearchNote={setSearchNote} />}  
       
      </div>
       <Footer/>        
    </>
  )
}
export default App;
