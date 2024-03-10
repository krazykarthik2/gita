import React from 'react'
import "./ContentLoad.css"
const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ex quia, aliquam reprehenderit placeat similique error praesentium temporibus in eveniet. Quaerat alias nihil provident dolores neque aliquam cumque et praesentium autem eius!"
function ContentLoad({value,lorem_count=10}) {
  
  return (
    value?
    <>{value}</>:
    <div className="content-loading font-redacted pe-none user-select-none font-size-inherit">
    {lorem.split(' ').filter((e,i)=>i<lorem_count).join(' ')}
    </div>
  )
}

export default ContentLoad