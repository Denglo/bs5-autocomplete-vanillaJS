'use strict';

// =============== Autocomplete for input fields =====================

/**
 * Description : Add an autocomplete list to an input field with bootstrap style.
 * @param {[string]} id_formfield [ID from form element where an autocomplete list should added]
 * @param {[string]} id_autocomplete_div []
 * @param {[Array of strings]} result_list [Array of all possible search results] - you must create your own variable and API, look at ./Example/example.html
 * @param {[number]} start_at_letters [inputted string length at which autocomplete list should shown]
 * @param {[number]} count_results [number of max results]
 * @return {[Undefined]} Nothing returned, only make autocomplete visible or invisble
 */


function set_autocomplete(id_formfield, id_autocomplete_div, result_list, start_at_letters=3, count_results=5) {
    let input = document.getElementById(id_formfield);
    let autocomplete_div = document.getElementById(id_autocomplete_div);
    input.onkeyup = function() {
        var characters = input.value;
        if (characters.length>=start_at_letters) {
            var res = autocomplete(result_list, characters);
            renderResults(res, characters, autocomplete_div, input, count_results);
            autocomplete_div.classList.remove('invisible');

            // clear input field on lost focus if reult not in result list
            input.onblur = function() {
                setTimeout(function() {
                    if (result_list.indexOf(input.value) == -1) {
                        input.value = "";
                        }
                    autocomplete_div.classList.add("invisible");
                    }, 200);
                }
            }
        else {
            autocomplete_div.classList.add("invisible");
            // delete all childs from result list
            while (autocomplete_div.firstChild) {
                autocomplete_div.removeChild(autocomplete_div.firstChild);
            }
        }
    }
}


function autocomplete(item_list, search_string) {
    let results = [];
    item_list.filter( function(item) {
        if (item.toLowerCase().includes(search_string.toLowerCase())) {
            results.push(item);
        };
    });
    return results
}


function renderResults(results, search, container, form_id, max_results) {
    // delete unordered list from previous search result
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    // get properties from input field
    let form_font = window.getComputedStyle(form_id, null).getPropertyValue('font-size');
    let form_width = form_id.offsetWidth;

    //set result list to same width less borders
    container.style.width = form_width.toString() + 'px';
    
    if (results.length>0) {
        // create ul and set classes
        let ul = document.createElement('UL');
        ul.classList.add('list-group', 'mt-1');

        // create list of results and append to ul
        if (results.length>max_results) {
            results = results.slice(0, max_results);
        }
        results.map(function(item) {
                let a = document.createElement('A');
                a.classList.add('autocomplete-result', 'list-group-item', 'p-1'); // autocomplete used for init click event, other classes are from bootstrap
                a.setAttribute("reference", form_id.id); // used for click-Event to fill the form
                a.style.fontSize = form_font;
                a.href = '#';

                // see function below - marked search string in results
                a.innerHTML = colored_result(item, search);

                // add Eventlistener for search renderResults
                a.addEventListener("click", function(event) {
                    event.preventDefault();
                    event.stopPropagation();
            
                    // get text from list item and set it into reffered form field
                    let content = a.innerText;
                    let form_id = a.getAttribute('reference');
                    document.getElementById(form_id).value = content;

                    // after choosen a result make div with results invisible -> after changing input content again,
                    // all of childs of current div will be deleted [line 48,49]
                    container.classList.add('invisible');
            
                });
                ul.append(a);
        });

        // append ul to container and make container visible
        container.append(ul);
        container.classList.remove('invisible');
        //choose_result(); // add Eventlistener to every result in ul
    }
    else {
        container.classList.add('invisible');

    }
}


// create span's with colored marked search strings
function colored_result(string, search) {
    let splitted = string.toLowerCase().split(search.toLowerCase());

    let sp = []; // array of all spans, created in folling loop
    let start = 0; //start for slicing

    splitted.map(function(element, index) {
        // empty string at the beginning
        if (element == false) {
            sp.push("<span class='text-info'>" + string.slice(start, start + search.length) + "</span>");
            start = start + search.length;
        }
        else if (index +1 == splitted.length) {
            sp.push("<span>" + string.slice(start, start + element.length) + "</span>");
    }
        else {
            sp.push("<span>" + string.slice(start, start + element.length) + "</span>");
            start = start + element.length;
            sp.push("<span class='text-info'>" + string.slice(start , start + search.length) + "</span>");
            start = start  + search.length;
        }
        });
    return sp.join('')
}
