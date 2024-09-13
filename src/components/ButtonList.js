import React from 'react'
import Button from './Button';

const ButtonList = () => {
  const List = ["All", "Gaming", "Songs", "Live", "Soccer", "Cricket", "News", "Cooking", "Valentines", "kabaddi", "movies"]
  return (
    <div className="flex"><Button name="All" />
      {List.map((buttonsList, index) => <Button key={index} name={buttonsList} />)}
    </div>
  )
}

export default ButtonList;