import LocalStorage from "./localStorage.js";
import Dialog from "./dialog.js";

const localStorage = new LocalStorage();

export default class Todo{

    constructor() {
        this.enterButton = document.querySelector("#inputArea button");
        this.input = document.querySelector("#inputArea input");
        this.ul = document.querySelector("ul#toDoList");

        if(localStorage.items.length > 0){
            this.loadFromLocalStorage();
        }

        this.enterButton.addEventListener('click',(e)=>{
            this.addItem(e);
        });

        this.input.addEventListener('keypress',(e)=>{
            this.addItem(e);
        });

    }

    addItem(e){
        if (this.input.value.length > 0 && (e.key === "Enter" || e.key === undefined )){
            this.createItem();
        }
    }

    createItem(){
        const li = document.createElement("li");
        li.innerHTML = `${this.input.value} <i class="far fa-trash-alt"></i>`;
        this.ul.appendChild(li);
        this.input.value = "";

        li.addEventListener("click",(e)=>{
            this.crossOut(e)
        });
        li.querySelector("i").addEventListener("click",(e)=>{
            this.deleteListItem(e)
        });

        localStorage.updateItems(this.ul);
    }

    crossOut(e){

        e.currentTarget.classList.toggle("done");
        localStorage.updateItems(this.ul);

    }

    async deleteListItem(e){
        e.stopPropagation();
        const listItem = e.currentTarget.parentNode;


        const dialog = new Dialog({
            questionText:"<h1>Er du sikker på du er sikker??</h1>",
            trueButtonText:"JA",
            falseButtonText:"NÆ"
        });
        const deleteItem = await dialog.confirm();

        if (deleteItem){
            console.log(123);
            listItem.remove();
            localStorage.updateItems(this.ul);
        }
    }

    loadFromLocalStorage(){
        let listItems = "";
        localStorage.items.forEach(item =>{
            listItems += item;
        });
        this.ul.innerHTML = listItems;
        this.ul.querySelectorAll("li").forEach(li =>{
            li.addEventListener("click",(e)=>{
                this.crossOut(e)
            });
            li.querySelector("i").addEventListener("click",(e)=>{
                this.deleteListItem(e)
            });
        })
    }

}