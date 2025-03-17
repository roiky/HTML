let numberOfTables = 0;
let numberOfGuests = 0;


$(function () {
    //console.log("Handler running...")
    

    $("#main-header").css("background-color", "gray");
    $("#add").on("click", function () {

        if(! $("#tableGuests").val() || !$("#tableContact").val() || !$("#tablePhone").val()) return console.log("must fill ll inputs!");
        let guestsToAdd = parseInt($("#tableGuests").val(), 10);

        if (numberOfGuests + guestsToAdd > 20) {
            return console.log("we don't have room!");
        } 
    
        numberOfGuests += guestsToAdd;

        let tableDiv = $("<div>").addClass(`table-${numberOfTables}`);
        let infoList = $("<ul>").attr("id", `info-${numberOfTables}`);

        $("<li>").text(guestsToAdd).appendTo(infoList);
        $("<li>").text($("#tableContact").val()).appendTo(infoList);
        $("<li>").text($("#tablePhone").val()).appendTo(infoList);

        tableDiv.append(infoList);
        $("#table-container").append(tableDiv);

        // $("#table-container").append(`<div class="table-${numberOfTables}">  <ul id="info-${numberOfTables}"> 
        //     <li> ${$("#tableGuests").val()} </li>
        //     <li> ${$("#tableContact").val()} </li> 
        //     <li> ${$("#tablePhone").val()} </li> 
        //     </ul>  </div>`)
        numberOfTables++;

    })


    // const jqueryListItems = $("#list-items").children()
    // jqueryListItems.css({ cursor: "pointer" })
    // jqueryListItems.addClass("selectMeHover")
    // jqueryListItems.on("click", function (event) {
    //     console.log(event)
    //     $(this).toggleClass("selectMe")
    // })

    // $(document).on("keydown", function (event) {
    //     console.log(event?.originalEvent?.code)
    //     if (!currentPlayer) return;
    //     if (event?.type?.toLowerCase() === "keydown") {
    //         moveOnScreen(currentPlayer, event?.originalEvent?.code)
    //     }

    // })

})
