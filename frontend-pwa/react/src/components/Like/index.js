import {useState, useEffect} from 'react'
import styles from './styles.module.css'
import {ReactComponent as Favorite} from '../../assets/icons/favorite.svg'

const Like = ({likes}) => {
  const [numberLikes, setNumberLikes] = useState(0)

  useEffect(() => {
    setNumberLikes(likes)
  }, [likes])
  return (
    <>
    <div className={styles.myLike}>
    <span>
        <Favorite/>
        </span>
        <p>{numberLikes}</p>
  </div>
  </>
  )
}

export default Like
