import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {

    const [list,setList] = useState([]);

    const fetchList = async() =>{
        const response = await axios.get(`${url}/api/art/list`);

        if (response.data.success){
            setList(response.data.data);
        }
        else{
            toast.error("ERROR!")
        }
    }

    const removeArt = async(artId) => {
        const response = await axios.post(`${url}/api/art/remove`,{id:artId})
        await fetchList();
        if (response.data.success){
            toast.success(response.data.message);
        }
        else{
            toast.error("ERROR!");
        }
    }

    useEffect(() => {
        fetchList();
    }, []);



  return (
    <div className='list add flex-col'>
        <p>All Art Items</p>
        <div className="list-table">
            <div className="list-table-format title">
                <b>Image</b>
                <b>Title</b>
                <b>Category</b>
                <b>Price</b>
                <b>Actions</b>

            </div>
            {list.map((item,index)=> {
                return (
                    <div key={index} className="list-table-format">
                        <img src={`${url}/images/`+item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p onClick={() => removeArt(item._id)} className='cursor'>X</p>

                    </div>
                )


            })}
        </div>
      
    </div>
  )
}

export default List
