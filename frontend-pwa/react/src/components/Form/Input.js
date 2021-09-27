import {useEffect, useRef} from 'react'
import { useField } from '@unform/core'

export default function Input({name, label, ...rest}) {
  const inputRef = useRef(null)
  const {fieldName, registerField, defaultValue, error} = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    })
  }, [fieldName, registerField])
  return (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <input id={fieldName} ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span style={{color: '#f00'}}>{error}</span>}
    </>
  )
}

 
