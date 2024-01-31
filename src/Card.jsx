import React from "react";
import "./index.css";

function Card(props) {
  return (
    <div className="p-2 sm:w-[200px] w-full h-[240px]">
      <p className="line-clamp-1 text-lg text-start ps-3 rounded-t-lg texto2 border border-1 border-opacity-10 p-1 bg-slate-600 border-[#7e7e7e]">
        {" "}
        {props && props.author ? props.author : "NEWS"}
      </p>

      <article className="border border-gray-600 border-opacity-50 p-2 rounded-b-lg  overflow-hidden ">
        <a
          className="text-start text-lg  text-white cursor-pointer  line-clamp-6"
          href={props && props.url}
          target="_blank">
          {props && props.description}
        </a>
      </article>
    </div>
  );
}
export default Card;
