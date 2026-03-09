import styled from 'styled-components';

const StyledInput = styled.input`
     padding:5px;
      `

const StyledDiv = styled.div`display:flex;flex-direction:column`;      

export default function FormCommonField({label,name,value,onChange,type,list,rows,ref,maxLength,children}){

    return(
        <>
        <StyledDiv>
         {label && <label htmlFor={name}>{label} {label === "Description" ? <small>(max {maxLength})</small>: ''} </label>}
         { type === "textarea" ? (<textarea id={name} name={name} value={value} onChange={onChange} rows={rows} required />)
                             : (<><StyledInput id={name} name={name} value={value} onChange={onChange} list={list} ref={ref} required/> {children}
                             </>
                             )}
         </StyledDiv>
         </>
    )
}