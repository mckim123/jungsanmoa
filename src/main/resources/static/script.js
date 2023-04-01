$(function () {
    let expenseCount = 1;

    // Add new expense fields
    $('#add-expense').click(function () {
        expenseCount++;

        let html = '<div class="expense-inputs">' +
            '<div class="form-group">' +
            '<label for="payer' + expenseCount + '">Payer:</label>' +
            '<input type="text" class="form-control" id="payer' + expenseCount + '" name="payer' + expenseCount + '">' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="participants' + expenseCount + '">Participants:</label>' +
            '<input type="text" class="form-control" id="participants' + expenseCount + '" name="participants' + expenseCount + '">' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="amount' + expenseCount + '">Amount:</label>' +
            '<input type="number" class="form-control" id="amount' + expenseCount + '" name="amount' + expenseCount + '">' +
            '</div>' +
            '</div>';

        $('#jungsan-form').find('.expense-inputs:last').after(html);
    });

    // Submit form
    $('#jungsan-form').submit(function (event) {
        event.preventDefault();

        let members = $('#members').val().split(',');
        let expenses = [];

        // Create expense objects
        for (let i = 1; i <= expenseCount; i++) {
            let payer = $('#payer' + i).val();
            let participants = $('#participants' + i).val().split(',');
            let amount = parseInt($('#amount' + i).val());

            expenses.push({
                payer: payer,
                participants: participants,
                amount: amount
            });
        }

        let truncationOption = $('input[name="truncationOption"]:checked').val();
        let advancedTransfer = $('#advancedTransfer').val();

        // Create request object
        let request = {
            members: members,
            expenses: expenses,
            truncationOption: truncationOption,
            advancedTransfer: advancedTransfer
        };

        // Send AJAX request
        $.ajax({
            url: '',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(request),
            success: function (response) {
                let resultHtml = '<h3>Results:</h3>' +
                    '<p>Total expense: ' + response.totalExpense + '</p>' +
                    '<p>Expenses per person:</p>' +
                    '<ul>';

                for (let i = 0; i < response.expensesPerPerson.length; i++) {
                    let expense = response.expensesPerPerson[i];
                    resultHtml += '<li>' + expense.person + ': ' + expense.amount + '</li>';
                }

                resultHtml += '</ul>';

                $('#result').html(resultHtml);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});
