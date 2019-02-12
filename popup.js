/**
 * Stores the new filter value to local storage
 */
function storeFilter(input){
    // If the input is more than 1 char store the input to local storage
    if (input.length > 0){
        chrome.storage.local.set({'filter': input}, function () {});
    } else {
        chrome.storage.local.clear();
    }

}

document.addEventListener('DOMContentLoaded', function () {

    const inputBox = $('#filterBy');
    document.getElementById('clearButton').addEventListener('click', clearFilter);

    inputBox.val(chrome.storage.local.get(['filter'], function (result) {
        return result.filter;
    }));

    inputBox.on('input', function() {
        let input = $(this).val(); // get the current value of the input field.
        storeFilter(input);
    });
});

function clearFilter() {
    chrome.storage.local.clear();
    document.getElementById('filterBy').value = '';
}


