import React from 'react'

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`px-3 py-2 border rounded-md ${className}`}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }

