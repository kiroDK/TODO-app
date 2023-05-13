window.addEventListener('load',()=>{
    const form = document.querySelector("#todo_form");
    const input = document.querySelector("#new-task");
    const list_el = document.querySelector("#tasks");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks on page load
    tasks.forEach((task) => {
        const task_el = createTaskElement(task);
        list_el.appendChild(task_el);
    });

    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        const task = input.value;

        if(!task){
            alert("Please fill out the task");
            return ;
        }

        // Create task element and add it to the page
        const task_el = createTaskElement(task);
        list_el.appendChild(task_el);

        // Add task to local storage
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        input.value="";
    });

    function createTaskElement(task) {
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el =  document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el=document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "EDIT";

        const task_delete_el=document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "DELETE";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        task_edit_el.addEventListener('click',()=> {
            if(task_edit_el.innerText.toLowerCase() == "edit"){
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            }
            else{
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";

                // Update task in local storage
                const index = tasks.indexOf(task);
                tasks[index] = task_input_el.value;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });

        task_delete_el.addEventListener('click',()=> {
            list_el.removeChild(task_el);

            // Remove task from local storage
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        return task_el;
    }
});