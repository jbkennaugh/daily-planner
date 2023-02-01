let tasks = JSON.parse(localStorage.getItem('tasks'))
// if nothing is in tasks then creates empty array in format we need
if(tasks === []){
    tasks = [
        [9, ""],
        [10, ""],
        [11, ""],
        [12, ""],
        [13, ""],
        [14, ""],
        [15, ""],
        [16, ""],
        [17, ""]    
    ]
}