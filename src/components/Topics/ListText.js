import React from "react";

const ListText = ({data}) => {
    console.log('data in listText:,', data)
  return (
        data.format === 'unordered' ? (
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

export default ListText;
