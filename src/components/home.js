import Addtodo from './addtodo';
import Todolist from './todolist';

import Pagination from './pagination';
import Posts from './posts';

import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [count, updateCount] = useState(0);
    const [update, setUpdate] = useState({});

    const navigate = useNavigate();

    const cookie = new Cookies();
    const cname = cookie.get("cname");
    debugger;
    useEffect(() => {
        if(cname === undefined) {
            navigate("/");
        }
    },[]);

    let getData = async () => {
        setLoading(true);        
        const url = await fetch(`http://localhost:4000/getData`);
        const data = await url.json();
        setData(data);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, [count]);

    const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <div className="App bg-light">
            <h1 className="h1 title p-3">TODO APP</h1>
            <div className="container body-container bg-light">
                <div className="row">
                    <div className="col"><Addtodo updateCount={updateCount} count={count} update={update} /></div>
                    <div className="col"><Todolist posts={currentPosts} loading={loading} updateCount={updateCount} count={count} setUpdate={setUpdate} /></div>
                    {/* <Posts posts={currentPosts} loading={loading} /> */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate} />
                </div>
            </div>
        </div>
    )
}

export default Home;