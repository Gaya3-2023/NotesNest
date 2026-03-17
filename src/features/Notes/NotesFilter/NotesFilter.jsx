import styles from './NotesFilter.module.css';

export default function NotesFilter({categories,setSelectedCategory,selectedCategory,viewBy,setViewBy,setViewPinnedNotes}){
    return(
       <>  
      <div className={styles.filterContainer}>
        <div className={styles.categoryContainer}>
            {categories.length > 1  && 
                (categories.map((category) => 
                                        (<button key={category} 
                                                 className={selectedCategory === category ? styles.active : styles.inactive}
                                                  onClick={() => {setSelectedCategory(category); setViewPinnedNotes(false)}} >
                                                  {category}</button>)))}
        </div> 
        <div className={styles.viewBy}>
            <button onClick={() =>  setViewPinnedNotes(true)}>NestPicks</button>
            <select name ="ViewBy" id="ViewBy" value={viewBy} onChange={(e) => setViewBy(e.target.value)}>
                <option value="New to Old">New to Old</option>
                <option value="Old to New">Old to New</option>
            </select>         
        </div>                  
       </div>    
      </>                         
    )

}