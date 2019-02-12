let filterBranch;

// Add event listener to the tabs
setTimeout(function () {
    const tabList = document.querySelector('div.tablist');
    console.log('%cTAB LIST', 'color: white; background: red; font-size: 25px', tabList);
    tabList.addEventListener('click', tabClicked);
}, 5000);

/**
 * Adds the filter message to the tabs in the UI
 */
function addFilterDisplay(){

    if (filterBranch !== undefined){
        const newFilterDiv = document.getElementById('newFilterDiv');

        if (newFilterDiv){
            newFilterDiv.remove();
        }

        if (filterBranch !== ''){
            const tabList = document.querySelector('div.tablist');

            const newNote = document.createElement('a');
            newNote.id = 'newFilterDiv';
            newNote.style.color = 'blue';
            const node = document.createTextNode(`Filtered by ${filterBranch} branch`);
            newNote.appendChild(node);

            tabList.appendChild(newNote);
        }

    } else {
        const newFilterDiv = document.getElementById('newFilterDiv');
            newFilterDiv.remove();
    }

}

/**
 * Gets the branch name of all elements in the list and hides any that aren't the specified branch.
 */
function filterList(){


    const elementNodeList = document.querySelectorAll('div.vc-pullRequest-list-row-focusable');

    //console.log(elementNodeList);

    for (let i = 0; i < elementNodeList.length; i++){
        const nodeValue = elementNodeList[i].children[0].children[0].children[0].children[1].children[1].children[0].childNodes[4].textContent;

        console.log('node value', nodeValue);

        if (!nodeValue.includes(filterBranch) && filterBranch !== undefined){
            elementNodeList[i].style.display = 'none';
           // elementNodeList[i].parentNode.removeChild(elementNodeList[i]);
        } else {
           // elementNodeList[i].style.visibility = 'visible'
            elementNodeList[i].style.display = 'inherit'
        }
    }
}

/**
 * Event listener to detect changes in local storage
 * Calls action and addFilterDisplay passing them the new value
 * @param changes
 * @param area
 */
function localStorageChange(changes, area){
    //console.log("Change in storage area: " + area);

    const changedItems = Object.keys(changes);

    for (let item of changedItems){
        //console.log(item + " has changed");
        //console.log(changes[item].newValue);
        filterBranch = changes[item].newValue;
    }

    //console.log(filterBranch);

    filterList();
    addFilterDisplay();
}

// filter the results again if the tab changes
function tabClicked(){
    //if tab is clicked re-apply filter
    console.log('tab clicked');
    setTimeout(function(){
        filterList();
    }, 1000);
}

chrome.storage.onChanged.addListener(localStorageChange);