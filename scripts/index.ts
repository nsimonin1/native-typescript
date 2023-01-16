const persons = [
    {
        "firstName":"Tom",
        "lastName": "Evans",
        "age": 31
    },
    {
        "firstName":"James",
        "lastName": "Bond",
        "age": 19
    }
];
let firstNameInput, lastNameInput, ageInput: HTMLInputElement;
const table = document.createElement("table");
table.style.border = '1px solid';
table.style.borderCollapse = 'collapse';
table.style.marginBottom = '10px';
const headRow = document.createElement("thead") ;
table.appendChild(headRow);


createHead(headRow);


persons.forEach(person => {
    

    addRow(person);
});

const doc = document.getElementById('main');


doc.appendChild(table);
const form = document.createElement('form');
doc.appendChild(form);

form.addEventListener('submit', saveForm);

createForm(form);

//---------------------------------------------------------------------------------------


function createHead(headRow: HTMLTableSectionElement): void {
    const colFirstName = initHeadCol('First Name');
    colFirstName.addEventListener('click', sort);
    headRow.appendChild(colFirstName);

    const colLastName = initHeadCol('Last Name');
    headRow.appendChild(colLastName);

    const colAge = initHeadCol('Age');
    colAge.textContent =  'Age';
    colAge.style.backgroundColor = 'grey';
    headRow.appendChild(colAge);

}

function createTextCell(row: HTMLTableRowElement, value: string) {
    const col = initCol();
    col.textContent = value;
    row.appendChild(col);
}

function createNumberCell(row: HTMLTableRowElement, value: number) {
    const col = initCol();
    col.textContent = value?.toString();
    col.style.backgroundColor = 'grey';
    row.appendChild(col);
}

function initCol() : HTMLTableCellElement {
    const col = document.createElement("td");
    col.style.border = '1px solid';
    col.style.padding = '10px';
   return col;
}

function initHeadCol(headerName: string) : HTMLTableCellElement {
    const col = document.createElement("th");
    col.style.border = '1px solid';
    col.style.padding = '10px';
    col.textContent =  headerName;
    return col;
}


function createForm(form: HTMLFormElement) {
    firstNameInput = document.createElement('input');
    firstNameInput.style.marginRight = '10px';
    firstNameInput.placeholder = 'First Name'
    form.appendChild(firstNameInput);

    lastNameInput = document.createElement('input');
    lastNameInput.style.marginRight = '10px';
    lastNameInput.placeholder = 'Last Name';
    form.appendChild(lastNameInput);

    ageInput = document.createElement('input');
    ageInput.style.marginRight = '10px';
    ageInput.type = 'number';
    ageInput.placeholder = 'Age';
    form.appendChild(ageInput);

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Save';
    form.appendChild(button); 
}

function addRow(person: { firstName: string; lastName: string; age: number; }) : HTMLTableRowElement {
    const row = document.createElement("tr");
    row.style.border = '1px solid';
    table.appendChild(row);

    createTextCell(row, person.firstName);

    createTextCell(row, person.lastName);

    createNumberCell(row, person.age);
    return row;
}

function saveForm(this: HTMLFormElement, ev: SubmitEvent) {
    ev.preventDefault();
    const person = {
        'firstName': firstNameInput.value,
        'lastName': lastNameInput.value,
        'age': +ageInput.value
    };
    persons.push(person);
    addRow(person);

    this.reset();
}

function sort(this: HTMLTableCellElement, ev: MouseEvent) {
    persons.sort((a,b) => a.firstName.toUpperCase().localeCompare(b.firstName.toUpperCase()));
    
    for(let i = 0; i < table.rows.length; i++){
        
        const existingRow = table.rows.item(i);
        const newRow = document.createElement('tr');
        createTextCell(newRow, persons[i].firstName);
        createTextCell(newRow, persons[i].lastName);
        createNumberCell(newRow, persons[i].age);
        table.replaceChild(newRow, existingRow);
    }
    
}

