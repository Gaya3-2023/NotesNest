import {Link} from 'react-router';
import styled from 'styled-components';

const StyledDiv = styled.div`text-align:center`;

export default function NotFound(){
    return(
        <>
        <div className='fullWidth'>
         <StyledDiv>
           <p>Page Not Found</p>
           <Link className="linkButton" to="/">Go Back Home</Link>
         </StyledDiv>
        </div>        
        </>
    )
}