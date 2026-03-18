import trashbinicon from '../../assets/trash.png';
import editicon from '../../assets/pencil.png';
import styles from './NoteCard.module.css';
import pin from "../../assets/pin.png";
import unpin from "../../assets/push-pin.png";

export default function NoteCard({selectedCategory,note,setIsEditing,removeNote,togglePinEvent,colorList,updateNoteColor}){
   
    return (
        <>    
        <div className={styles.cardheader}> 
        <div className={styles.colorpicker}>        
               {colorList.map((colors) => (            
               <span key={colors} className={styles.colorcircle} 
                    style={{background:colors}} onClick={() => updateNoteColor(colors,note.id)}/>
                ))}
         </div>  
         <div className={styles.pinalign}>
          <button type="button" onClick={() => togglePinEvent(note.id)}>
               {note.pinned ? <img src={pin} alt="pin"/> : <img src={unpin} alt="unpin"/>}</button>
       
        </div>
        </div>
       {selectedCategory === 'All' && (<><div className={styles.noteheader}>
                             <h2>{note.category.charAt(0).toUpperCase() + note.category.slice(1)} </h2> </div></>) } 
        <p className={styles.title}>{note.title.charAt(0).toUpperCase() + note.title.slice(1)}</p>
        <p className={styles.description}>{note.description}</p>
        <p className={styles.date}>{note.date} </p>
        <div className={styles.imagebutton}>
            <button type="button" onClick = {() => setIsEditing(true)}>
                <img src={editicon} alt="Edit"/></button>            
            <button type="button" onClick={() => removeNote(note.id)}><img src={trashbinicon} alt="Delete"/></button>  
        </div>
        </>
    )
}

