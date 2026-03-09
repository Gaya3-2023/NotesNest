import styles from "./Header.module.css";
import { NavLink } from 'react-router';
import searchIcon from '../assets/search.png';
import {useEffect,useState} from 'react';


export default function Header({title,searchNote,setSearchNote})
{
    //debounce it to avoid fetches on every keystroke
    const [localSearchString,setLocalSearchString] = useState(searchNote);

    useEffect(()=> {
        const debounce = setTimeout(() => {
            if(localSearchString.trim()){
               setSearchNote(localSearchString);                  
            }                  
            },500); //500ms delay
            return () =>{clearTimeout(debounce)};

        },[setSearchNote,localSearchString]);
    

    return(
        <>
        <div className={styles.title}>
            <h1>{title}</h1>
            <nav className={styles.nav}>
                <div className={styles.searchstyle}>                             
                       <img src={searchIcon} alt="Search" className={styles.img}/>
                       <input type="text" id="search" name="search" value={localSearchString} 
                             placeholder="type search" className={styles.inputbox}
                             onChange={(e) => setLocalSearchString(e.target.value)}/>

                       {localSearchString && <button type="button" 
                        onClick={()=> { setSearchNote('');setLocalSearchString('')}} className={styles.clearbutton}>x</button>}
                            
                </div>     
                       
            <NavLink to ={"/"} className={({ isActive }) => isActive ? styles.active: styles.inactive}>Home</NavLink>
            <NavLink to={"/about"} className={({ isActive }) => isActive ? styles.active: styles.inactive}>About</NavLink>           
            
        </nav>
                 
         </div>   
         
            
        
        </>
    )
}