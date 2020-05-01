// variable for holding all time block text
var timeBlocksText = ["", "", "", "", "", "", "", "", ""];
//accesses timeBlocks for event delegation
var timeBlocks = document.getElementById("timeBlocks");
// current hour for text area coloring
var currentHour = moment().format("H");

// calls initialization
initialize();

// function to initialize page
function initialize() {
    // sets current date in currentDay p
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    loadSchedule();
    renderTimeBlocks();
}

// renders time blocks
function renderTimeBlocks() {
    // clears time blocks
    $("#timeBlocks").empty();

    for (var i = 0; i < 9; i++) {
        // sets a variable for time of current block being rendered
        var time = i + 9;
        if (time > 12) {
            time -= 12;
        }

        //creates time block and adds classes
        var timeBlock = $("<div>");
        timeBlock.addClass("time-block row");

        // creates hour div and adds classes/text content
        var hourDiv = $("<div>");
        hourDiv.addClass("hour col-2 col-md-1");
        if (time > 8) {
            hourDiv.text(time + "AM");
        }
        else {
            hourDiv.text(time + "PM")
        }

        // creates text area addes classes, index and value
        var textArea = $("<textarea>").addClass("col-8 col-md-10");
        if ((i + 9) < currentHour) {
            textArea.addClass("past");
        }
        else if ((i + 9) == currentHour) {
            textArea.addClass("present");
        }
        else {
            textArea.addClass("future");
        }
        textArea.attr("index", i);
        textArea.val(timeBlocksText[i]);

        // creates save button
        var saveButton = $("<button>").attr("type", "button");
        saveButton.attr("index", i);
        saveButton.addClass("saveBtn col-2 col-md-1");

        // creates save button icon add appends it to save button
        var saveIcon = $("<i>").addClass("far fa-save");
        saveButton.append(saveIcon);

        // appends elements to timeBlock
        timeBlock.append(hourDiv, textArea, saveButton);

        // appends new time block to the page
        $("#timeBlocks").append(timeBlock);
    }
}

// adds event listener to save timeBlock
timeBlocks.addEventListener("click", function (event) {
    if (event.target.type === "button") {
        var index = event.target.getAttribute("index");
        var content = event.target.parentElement.children[1].value;
        timeBlocksText.splice(index, 1, content);
        saveSchedule();
    }
    else if (event.target.parentElement.type === "button") {
        var index = event.target.parentElement.getAttribute("index");
        var content = event.target.parentElement.parentElement.children[1].value;
        timeBlocksText.splice(index, 1, content);
        saveSchedule();
    }
});

// saves currently loaded schedule to localStorage
function saveSchedule() {
    localStorage.setItem("timeBlocksText", JSON.stringify(timeBlocksText));
}
// loads schedule from local storage
function loadSchedule() {
    var tempLoad = JSON.parse(localStorage.getItem("timeBlocksText"));

    if (tempLoad !== null) {
        timeBlocksText = tempLoad;
    }
}
