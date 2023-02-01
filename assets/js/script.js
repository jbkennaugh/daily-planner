$(function() { 
    let container = $(".container");
    let currentDay = $("#currentDay");
    let currentDate;
    let tasks = JSON.parse(localStorage.getItem('tasks'))

    init();

    // function to load on startup, builds the task list and current date
    function init() {
        // if nothing is in localStorage for tasks then creates empty array in format we need
        if(!tasks){
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
        container.html("");
        currentDate = moment().format("dddd, Do of MMMM YYYY");
        currentDay.text(currentDate);

        for (let i = 0; i<tasks.length; i++){
            let hourRow = $("<div>").addClass("time-block row").attr("hour-count", i);
            
            container.append(hourRow);
            
            if(tasks[i][0] <= 12){ var hour = $("<p>").addClass("hour").text(tasks[i][0]+"am"); }
            else { var hour = $("<p>").addClass("hour").text(tasks[i][0]-12+"pm"); }

            if(tasks[i][0] < moment().hour()){
                var taskInput = $("<textarea>").addClass("task past");
            }
            else if(tasks[i][0] > moment().hour()){
                var taskInput = $("<textarea>").addClass("task future");
            }
            else {
                var taskInput = $("<textarea>").addClass("task present");
            }

            let saveButton = $("<button>").addClass("saveBtn");
            let saveIcon = $("<i>").addClass("fa-solid fa-floppy-disk");
            saveButton.append(saveIcon);
            hourRow.append(hour, taskInput, saveButton);
        }
    }

    $(".saveBtn").on("click", function() {
        //hourCount is used to know where this button corresponds to in the tasks array
        hourCount = $(this).parent().attr("hour-count");

        tasks[hourCount][1] = $(this).siblings(".task").val();
        
        localStorage.setItem("tasks", JSON.stringify(tasks));

        $("#saveNotification").toggleClass("hide");
        setTimeout(function(){
            $("#saveNotification").toggleClass("hide");
        }, 2500);
    })

    //updates classes of timeblocks every seconds to ensure is up to date with current hour
    setInterval(function(){
        for(let i = 0; i<tasks.length; i++){
            let taskInput = $(`[hour-count=${i}]`).children(".task");

            if(tasks[i][0] < moment().hour()){
                taskInput.addClass("past").removeClass("future present");
            }
            else if(tasks[i][0] > moment().hour()){
                taskInput.addClass("future").removeClass("past present");
            }
            else {
                taskInput.addClass("present").removeClass("future past");
            }
        }
    }, 1000);
});