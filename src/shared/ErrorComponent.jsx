import styles from './ErrorComponent.module.css';
import notesimg from '../assets/top-view-open-notepad.jpg';

export default function ErrorComponent({errorMessage,setErrorMessage,setSearchNote}){
        
    return(
        <>
         <div className={styles.outer}> 
            <div className={styles.errorbox}>
                <img src={notesimg} alt="General Notes image" width='150px' height='150px'/> 
                <p>{errorMessage}</p>
                <button onClick = {()=> {setErrorMessage('');
                                         setSearchNote('')}} >Dismiss</button> 
           </div>
         </div>  
        </>
    )
}