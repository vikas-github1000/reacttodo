import { useEffect, useState } from 'react';
import '../index.css';

function Addtodo ({updateCount, count, update}) {

    const [ id, setId ] = useState("");
    const [ task, setTodo ] = useState("");
    const [ date, setDate] = useState("");

    useEffect(() => {
        if(update.id === undefined){
            console.log("error");
            return;
        }else{
            updateTask(update);
        }
    }, [update]);


    let updateTask = (update) => {
        setId(update.id);
        setTodo(update.name);
        setDate(update.date);
    };

    let updateDetails = (e) => {
        e.preventDefault();

        var data = {
            id,
            task,
            date,
        };
    
        fetch("http://localhost:4000/updateData", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
    
        document.getElementById('task').value = "";
        document.getElementById('date').value = "";
        setId("");
        setTodo("");
        setDate("");
        updateCount(count+1);
    };

    let addTask = (e) => {
        e.preventDefault();
        console.log(task);
        console.log(date);

        var data = {
            task,
            date,
        };
    
        fetch("http://localhost:4000/addTodoList", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        setId("");
        setTodo("");
        setDate("");
        updateCount(count+1);
    }

    return (
        <div className=' add'>
        <form className="row bg-light" id="new-task-form">
                    <br/>
                    <p className="h2">Add</p>
                    <input type="hidden" name="" value="" id="hiddenid"/>
                    <div className="col-12">
                        <label for="inputAddress2" className="form-label text-dark" id="">Work to
                            do...</label>
                        <input type="text" className="form-control input-control" id="task" required value={task} onChange={((event) => setTodo(event.target.value))}/>
                    </div>
                    <div className="col-12">
                        <label for="inputAddress2" className="form-label text-dark" id="">Deadline
                            Date</label>
                        <input type="date" className="form-control" id="date" required value={date} onChange={((event) => setDate(event.target.value))}/>
                    </div>
                    <div className="col-12 btn-class">
                        <button type="button" className="btn btn-primary submit-btn"
                            id="new-task-submit" onClick={addTask}>ADD</button>
                       <button type="button" className="btn btn-primary submit-btn"
                            id="updateBtn" onClick={updateDetails}>UPDATE</button>
                    </div><br/>
        </form>
        </div>
    );
}

export default Addtodo;