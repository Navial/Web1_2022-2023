import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const nbLines = document.querySelector("#nbLines");
const nbColumns = document.querySelector("#nbColumns");
const text = document.querySelector("#textTab");
const button = document.querySelector("#button");
const table = document.querySelector("#table");

button.addEventListener("click", createTable);

function createTable(){
    let html = `
    <table class="talbe table-bordered">
        <tbody>`;
        for(let i=1; i<=nbLines.value; i+=1){
            html += '<tr>'
            for(let j=1; j<=nbColumns.value; j+=1){
                html +=`<td>${text.value}[${i}][${j}]</td>` 
            }
            html += '</tr>'
        }
    html +=`</tbody>
    </table>`
    table.innerHTML = html;
}

