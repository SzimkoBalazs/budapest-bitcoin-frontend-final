import React from "react";

const RegularText = ({data}) => {
  return (
        data.format === 'heading' ? (
            <ul>
                {data.children.map((listItem)=>{
                    return (
                        <li>{listItem.children.text}</li>
                    )
                })}
            </ul>
        ) : (
            <ol>
                {data.children.map((listItem)=>{
                    return (
                        <li>{listItem.children.text}</li>
                    )
                })}
            </ol>
        )
  );
};

export default RegularText;
