import React from "react";
import "./index.css";

function Card(props) {
  return (
    <div className="p-4 w-96 mx-auto">
      <p className="line-clamp-1 text-lg text-start ps-3 rounded-t-lg texto2 border border-1 border-opacity-10 p-1 bg-slate-600 border-[#7e7e7e]"> {props && props.author}</p>
      <article className="border border-gray-600 border-opacity-50 p-3 rounded-b-lg h-48 overflow-hidden ">
        <a className="text-start text-xl flex text-white cursor-pointer block line-clamp-6" href={props && props.url}>
          {props && props.title}
        </a>
      </article>
    </div>
  );
}
export default Card;
