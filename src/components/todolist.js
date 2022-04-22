import '../index.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Todolist({ data, updateCount, count, setUpdate , posts , loading }) {

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    console.log(data);
    const navigate = useNavigate();

    let updateData = (id, name, date) => {
        setUpdate({ id, name, date });
    };

    let deleteTask = (e) => {
        console.log(e);
        var id = e;
        console.log(id);
        var payload = {
            id,
        };

        fetch("https://vishal-node.herokuapp.com/deleteTask", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        updateCount(count + 1);
    }

   

    if (loading) {
        return <h2>Loading...</h2>;
      }

    return (
        <div className="tablelist">
            <br /><p className="h1">task</p>
            <table className="table table-light table-hover" id="tasklist">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Work</th>
                        <th scope="col">Date</th>
                        <th scope="col">Completed</th>
                    </tr>
                </thead>
                <tbody className="todoelm">
                    {posts.map((listValue, index) => {
                        return (
                            <tr key={index}>
                                <td>{listValue.id}</td>
                                <td>{listValue.task}</td>
                                <td>{listValue.date.slice(0, 10)}</td>
                                <td><button className="btn " id="updateBtn" onClick={() => updateData(listValue.id, listValue.task, listValue.date.slice(0, 10))}>Update</button>{" "}
                                    <button className="btn " id="updateBtn" onClick={() => deleteTask(listValue.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Todolist;