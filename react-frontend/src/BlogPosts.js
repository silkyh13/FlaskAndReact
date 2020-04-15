import React from "react";

const blogPost = ({ data, onClick, edit }) => {
  // return (
  //   <div>
  //     {data.map((item, index) => {
  //       return (
  //         <div className="txn-row" key={index}>
  //           <div className="txn-data">{item.topic}</div>
  //           <div className="txn-data" id={item.topic} onClick={edit}>
  //             {item.content} &#9999;
  //           </div>
  //           <div className="txn-data">{item.created_at}</div>
  //           <button className="txn-data" id={item.topic} onClick={onClick}>
  //             &#9587;
  //           </button>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
};

export default blogPost;
