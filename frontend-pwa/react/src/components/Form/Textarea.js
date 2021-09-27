import {useEffect, useRef} from 'react'
import { useField } from '@unform/core'

export default function Textarea({name, label, ...rest}) {
  const textareaRef = useRef(null)
  const {fieldName, registerField, defaultValue, error} = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: "value"
    })
  }, [fieldName, registerField])
  return (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <textarea id={fieldName} ref={textareaRef} defaultValue={defaultValue} {...rest} />
      {error && <span style={{color: '#f00'}}>{error}</span>}
    </>
  )
}

 
