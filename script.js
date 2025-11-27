/**
Name: John Wesley Agojo
johnwesley_agojo@student.uml.edu

Date: 11/26/2025
File: script.js
Assignment:
    This assignment requires the creation of a dynamic multiplication table generator
    PART 1: Implementing jQuery Validation plugin for client-side validation.
    Part 2: Adding jQuery UI sliders for input selection along with tabs for multiple tables.
**/

$(document).ready(function() {
    console.log("Doc is ready, initializing form validation.");

    $.validator.addMethod("greaterThanMin", function(value, element, param) {
        var minValue = $(param).val();
        return this.optional(element) || parseFloat(value) >= parseFloat(minValue);
    }, "Maximum value must be greater than or equal to minimum value.");
    
    $("#table-form").validate({
        rules: {
            "minColumn": {
                required: true,
                number: true,
                range: [-50, 50]
            },
            "maxColumn": {
                required: true,
                number: true,
                range: [-50, 50],
                greaterThanMin: "#minColumn"
            },
            "minRow": {
                required: true,
                number: true,
                range: [-50, 50]
            },
            "maxRow": {
                required: true,
                number: true,
                range: [-50, 50],
                greaterThanMin: "#minRow"
            }
        },
        messages: {
            "minColumn": {
                required: "Min value for column is required.",
                number: "Please enter a valid number."
            },
            "maxColumn": {
                required: "Max value for column is required.",
                number: "Please enter a valid number.",
                greaterThanMin: "Maximum column value must be greater than or equal to minimum column value."
            },
            "minRow": {
                required: "Min value for row is required.",
                number: "Please enter a valid number.",
            },
            "maxRow": {
                required: "Max value for row is required.",
                number: "Please enter a valid number.",
                greaterThanMin: "Maximum row value must be greater than or equal to minimum row value."
            }
        },
        errorPlacement: function(error, element) {
            console.log("Placing error for element:", element.attr("id"));
            error.addClass("error-message");
            error.insertAfter(element.parent());
        },
        submitHandler: function() {
            console.log("Form is valid, generating table.");
            generateTable();
        }
    });

    function generateTable() {
        $("#error-message").text("");
        $("#table-container").html("");
        const minCol = parseFloat($("#minColumn").val());
        const maxCol = parseFloat($("#maxColumn").val());
        const minRow = parseFloat($("#minRow").val());
        const maxRow = parseFloat($("#maxRow").val());
        let table = $("<table></table>");
        let thead = $("<thead></thead>");
        let tbody = $("<tbody></tbody>");
        let headerRow = $("<tr></tr>");
        headerRow.append($("<th></th>"));
        for (let i = minCol; i <= maxCol; i++) {
            headerRow.append($("<th></th>").text(i));
        }
        
        thead.append(headerRow);
        table.append(thead);
        for (let i = minRow; i <= maxRow; i++) {
            let bodyRow = $("<tr></tr>");
            bodyRow.append($("<th></th>").text(i));
            
            for (let j = minCol; j <= maxCol; j++) {
                bodyRow.append($("<td></td>").text(i * j));
            }
            
            tbody.append(bodyRow);
        }
        table.append(tbody);
        $("#table-container").append(table);
    }
});