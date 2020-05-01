// variable for holding all time block text
var timeBlocks = [];

renderTimeBlocks();

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

        // creates text area
        var textArea = $("<textarea>").addClass("future");
        textArea.addClass("col-8 col-md-10");
        textArea.attr("index", i);

        // creates save button
        var saveButton = $("<button>").attr("type", "button");
        saveButton.attr("index", i);
        saveButton.addClass("saveBtn col-2 col-md-1");

        // creates save button icon add appends it to save button
        var saveIcon = $("<i>").addClass("far fa-save");
        saveButton.append(saveIcon);

        // appends elements to timeBlock
        timeBlock.append(hourDiv, textArea, saveButton);

        $("#timeBlocks").append(timeBlock);
    }
}