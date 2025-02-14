import React from 'react'
import Login from './Login'

function Cards({item}) {
    console.log(item)
  return (
    <>
    <div className="my-5 mx-3 flex space-x-4 dark:bg-slate-900 dark:text-white dark:border">
    <div className="card bg-base-100 w-96 shadow-xl dark:bg-slate-900 dark:text-white hover:scale-105 duration-200">
  <figure className="w-full h-60 overflow-hidden">
    <img
      src={item.image}
      className="w-75 h-full object-cover mt-4"
      alt="Shoes"
    />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {item.name}
      <div className="badge badge-primary">{item.category}</div>
    </h2>
    <p>{item.title}</p>
    <div className="card-actions justify-between">
      <div className="badge badge-outline">₹{item.price}</div>
      <div className=" cursor-pointer px-2 py-1 badge badge-outline hover:bg-blue-500 hover:text-white">
        <button onClick={()=>document.getElementById("my_modal_3").showModal()}>Buy Now</button>{" "}
      </div>
      <Login/>
    </div>
  </div>
</div>

    </div>
    </>
  )
}

export default Cards
