import React from "react";

function Picture(props) {
  return (
    <div className="p-2">
      <div className="text-yellow-500 text-2xl pl-10 py-4">{props.heading}</div>
      <div className="grid grid-cols-3">
        <div className="p-2">
          <img src={props.imageLink} className="h-72 w-full" />
        </div>
        <div className="px-2 text-gray-200 col-span-2 text-lg">
          {props.details}
        </div>
      </div>
    </div>
  );
}

export default Picture;
