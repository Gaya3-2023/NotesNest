import trashbinicon from '../../assets/trash.png';
import editicon from '../../assets/pencil.png';
import styles from './NoteCard.module.css';

export default function NoteCard({selectedCategory,note,setIsEditing,removeNote}){
    return (
        <>
        <div className={styles.noteheader}>
                   {selectedCategory === 'All' && <h2>{note.category} </h2> }                  
        </div>
        <p className={styles.title}>{note.title}</p>
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

