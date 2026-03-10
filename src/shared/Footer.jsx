import styled from 'styled-components';

const StyledParagraph = styled.p`
     text-align:center;
     font-size:12px`;
     
export default function Footer() {

  return (
    <footer>
      <hr/>
        <StyledParagraph>
          NotesNest @  2026 | A React Note-Taking App    
        </StyledParagraph>
    </footer>
  );
}