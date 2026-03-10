import styles from './NotesFilter.module.css';

export default function NotesFilter({categories,setSelectedCategory,selectedCategory,viewBy,setViewBy}){
    return(
       <>  
      <div className={styles.filterContainer}>
        <div className={styles.categoryContainer}>
            {categories.length > 1  && 
                (categories.map((category) => 
                                        (<button key={category} 
                                                 className={selectedCategory === category ? styles.active : styles.inactive}
                                                  onClick={() => setSelectedCategory(category)} >
                                                  {category}</button>)))}
        </div> 
        <div className={styles.viewBy}>
            <select name ="ViewBy" id="ViewBy" value={viewBy} onChange={(e) => setViewBy(e.target.value)}>
                <option value="New to Old">New to Old</option>
                <option value="Old to New">Old to New</option>
            </select>         
        </div>                  
       </div>    
      </>                         
    )

}