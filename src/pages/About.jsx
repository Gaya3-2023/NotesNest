import styled from 'styled-components';

const StyledDiv = styled.div`
           display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  max-width: 700px;
  margin: 40px auto; 
  padding: 20px;
  line-height: 1.6;
  font-size: 16px;
          `; 

export default function About(){
  return(
    <>
      <div className="fullWidth">                   
        <StyledDiv>
          <p>
            <strong>NotesNest</strong> is a note-taking application created to help people
             quickly capture and organize their thoughts, ideas, and notes.
          </p>
          <p>The app allows users to create notes with a category, title, and description so information can be organized in a way that makes sense.
               You can easily search through your notes, filter them by category, update them when needed, or remove notes that are no longer useful.
          </p>
          <p>All notes are stored locally in the browser using local storage. This  means your notes remain on your device and can be accessed whenever you
             return to the application.
          </p>
          <p> NotesNest was built using React. The project focuses on practicing component-based design, React hooks,
              routing, and efficient state management while creating a practical productivity tool.
          </p>
          <p> Whether you are keeping track of ideas, or small pieces of information, NotesNest aims to provide a simple and reliable place to
             store them.
          </p>
        </StyledDiv>
      </div>
    </>
)
}
