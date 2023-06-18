# bs5-autocomplete-vanillaJS

Because Bootstrap no longer depends on jquery here is a simmple and small but powerful alternative to auto-complete the search string in an bootstrap based <input>.


## Advantages:
  + simple array with possible results is needed only
  + optional choosing after how many inputed characters the results list is visible / default = 3
  + optional parameter, how long the result is max / default = 5
  + width and the font size of every result refers to the input field / more depending style components could be added in the script easily 
  + search string in results are colored   



## Handling: see also my example
1. Create an input field with BS5 standard class="form-control".
2. The input field needs an ID which is used in the function.
3. Directly below the input field create a div with bootstrap based class="position-absolute invisible" and an ID.
4. Download and include the file "autocomplete.js".
5. Create a variable wich includes an array with possible results as strings.
6. Call the function 'set_autocomplete' with params:
    - ID of input field as string without '#'
    - ID of div which should includes the results as string without '#'
    - variable name which includes the array with possible results
    - optional param "start_at_letters= " (default=3)
    - optional param "count_results= " (default=5)



![Preview](https://user-images.githubusercontent.com/79878266/120938430-f6ddc580-c712-11eb-8da8-80d217365043.PNG)
