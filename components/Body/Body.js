import React from 'react'

export default function Body(props) {
  return (
    <div className="flex justify-center w-full pl-4 pr-4"><div className="max-w-[900px] grow">{props.children}</div></div>
  )
}
