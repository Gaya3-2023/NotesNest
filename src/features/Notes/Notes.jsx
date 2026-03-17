import NotesList from "./NotesList";
import styles from "./Notes.module.css";
import {useEffect} from 'react';
import { useSearchParams,useNavigate } from "react-router";
import notesimg from '../../assets/top-view-open-notepad.jpg';
import styled from 'styled-components';
import NotesFilter from "./NotesFilter/NotesFilter.jsx";

const StyledDiv = styled.div`text-align:center`;


export default function Notes({noteList,removeNote,isLoading,updateNote,searchNote,categories,
                               noteTitle,selectedCategory,setSelectedCategory,viewBy,setViewBy,togglePinEvent,
                               viewPinnedNotes,setViewPinnedNotes}){

         
     const [searchParams,setSearchParams] = useSearchParams();
     const itemsPerPage = 9;
     const currentPage = parseInt(searchParams.get('page') || '1',10);
     const indexOfFirstNote = (currentPage - 1)* itemsPerPage;
     const totalPages= Math.ceil(noteList.length/itemsPerPage);
     const paginatedNotes = noteList.slice(indexOfFirstNote,indexOfFirstNote+itemsPerPage);
     const navigate=useNavigate();
    
     useEffect(() => {
      if(totalPages > 0 ){
         if(isNaN(currentPage) || currentPage < 1 ||  currentPage  > totalPages){
               navigate('/');
           }    
       }
    },[currentPage,totalPages,navigate]);
    let message='';
    let noMatches= false;
    if(searchNote) 
    {
      noMatches =true; 
      message="No Matching Note found"
    }
    else if(viewPinnedNotes)
    {
      message ="No Pinned Note Found"
    }
    else{
        message="No Notes Yet. Notes you added will appear here"
    }
    

     function handlePreviousPage(){
        if (currentPage > 1) {
            setSearchParams({page:currentPage - 1});
        }      
    }
    function handleNextPage(){
          if (currentPage < totalPages) {
            setSearchParams({page: currentPage + 1});
        }
    };     
   
    return(
        <>
        {
          (isLoading ? <p>Loading Notes...</p> : (
            (noteList.length === 0 ) && !viewPinnedNotes ? 
                (<><StyledDiv>
                      { !noMatches ? 
                           <img src={notesimg} alt="General Notes image" width='150px' height='150px'/> : ''}
                             <p>{message}</p></StyledDiv></>)
                            : 
                           ( ((noteList.length === 0) && viewPinnedNotes ) ? (<> <NotesFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                                           categories={categories} viewBy={viewBy} setViewBy={setViewBy} 
                                             setViewPinnedNotes={setViewPinnedNotes}/>  
                                              <StyledDiv><p>{message}</p></StyledDiv> 
                                             </>)
                                :             
                            (<>
                             <NotesFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                                           categories={categories} viewBy={viewBy} setViewBy={setViewBy} 
                                             setViewPinnedNotes={setViewPinnedNotes}/>         
                              <div className={styles.notebox}>
                                    {paginatedNotes.map(note => 
                                             <NotesList key={note.id} note={note} 
                                                  updateNote={updateNote} removeNote={removeNote}
                                                  categories={categories} noteTitle={noteTitle}
                                                  selectedCategory={selectedCategory}
                                                  togglePinEvent={togglePinEvent}/>)}                                            
                              </div>
                              <div className={styles.paginationControls}>
                                <button disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <button disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
                              </div> </> )
              ) 
            )
          )
          }
        </>
    )
}
