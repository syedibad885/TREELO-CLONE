// const columns = document.querySelector(".column");
const input = document.querySelector("#add_task");
const parent_main = document.querySelector("#main");
const addCardBtn = document.querySelector("#addCard");


/* create elements in javascript */
const createElementParagraph = (inputValue) => {
    const paragraph_Element = document.createElement("p");
    const paragraph_Text = document.createTextNode(inputValue);
    paragraph_Element.appendChild(paragraph_Text);
    paragraph_Element.setAttribute("draggable", "true")

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-solid');
    trashIcon.classList.add("fa-trash");
    // trashIcon.classList.add('trash');
    paragraph_Element.appendChild(trashIcon);

    return paragraph_Element;
}

let UserSaveTasks = JSON.parse(localStorage.getItem("savedTasks")); // local storage me se data ko fetch kar rahe hain savedTasks ko object me convert kar rahe hain
// console.log(savedTasks);

if (!UserSaveTasks) {
    UserSaveTasks = {};
}

// savedtask pehly se local storage me save hai just column me display karwaya hai 
// for (let i = 0; i < savedTasks.length; i++) {
//     const p = createElement(savedTasks[i]);
//     // console.log(savedTasks[i]);
//     // console.log(p);
//     columns[0].insertBefore(p, columns[0].lastElementChild);

// }

const addTask = (event) => {
    event.preventDefault();

       console.log(event);
       const currentForm = event.target; // current form element
       let inputValue = currentForm.elements[0].value; // value written in form's input 
       console.log(inputValue);
       const parentElement = currentForm.parentElement; // parent of form i.e div.column

    if (!inputValue) {
        input.style.border = '2px solid red'; // agr user input empty enter kary tw input ka border red ho jaega 
        console.log("please input");
    }else{
        // input.style.border = ''; // agr user input empty enter kary tw input ka border red ho jaega 
        const paragraph_Element = createElementParagraph(inputValue); // paragraph create element function call

        parentElement.insertBefore(paragraph_Element, currentForm);  // paragraph added in column before the form

        currentForm.reset(); // clearing form
        
        const h3Value = parentElement.children[0].innerText;
        console.log(h3Value);
        
        if (!Array.isArray(UserSaveTasks[h3Value])) {
            UserSaveTasks[h3Value] = []; // agar array nahi hai tw empty array set krwa do because undefined me .push nho ho sakta error ayega 
        }
        
        UserSaveTasks[h3Value].push(inputValue);
        localStorage.setItem("savedTasks", JSON.stringify(UserSaveTasks)); // local storage me data ko save kar rhe hain 
    }
}

// for (let i = 0; i < columns.length; i++) {
//     const form = columns[i].lastElementChild; // selecting every column's form because form is last element
//     form.addEventListener("submit", addTask);
// }

const createCard = (cardsTitle) => {

    // <div class="column">
    //     <h5>Work Todo</h5>
    //      <p>task 1</p>
    //         <p>task 2 <i class="fa-solid fa-trash"></i></p>
    //         <p>task 3</p> 
    //     <form>
    //       <input type="text" placeholder="add task" id="add_task" />
    //     </form>
    //   </div>

    const myDiv = document.createElement("div")
    myDiv.setAttribute("class", "column");
    // console.log(myDiv);

    const h5 = document.createElement("h5");
    const h5Text = document.createTextNode(cardsTitle);

    const myForm = document.createElement("form");

    const myInput = document.createElement("input");
    myInput.setAttribute("type","text");
    myInput.setAttribute("placeholder","add task");
    myInput.setAttribute("id","add_task");
    
    h5.appendChild(h5Text);
    myDiv.appendChild(h5);
    myForm.appendChild(myInput);
    myDiv.appendChild(myForm);

    myForm.addEventListener("submit", addTask)

    return myDiv;
    
}
// createCard();

addCardBtn.addEventListener("click", () => {
    const cardTitle = prompt("Enter card name"); 
    const yourDiv = createCard(cardTitle);
    parent_main.appendChild(yourDiv)
}) 