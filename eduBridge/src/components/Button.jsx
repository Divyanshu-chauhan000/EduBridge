import React from 'react'

const Button = ({text, onClick, type = 'button', className =""}) => {
  return (
    <div>
      <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 shadow ${className}`}
    >
      {text}
    </button>
    </div>
  )
}

export default Button