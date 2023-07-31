import CardTag from './CardTag';

import styles from '@/styles/CardStyles.module.css'

const CardFooter = ({photo}) => {
    return (
    <div className={styles.cardTagWrapper}>
      {Object.keys(photo.topic_submissions).length > 0
        ? Object.entries(photo.topic_submissions).slice(0, 3).map((topic, index) => {
          return (
            <CardTag key={`${topic[0]}-${index}`} topic={topic[0]} color={photo.color} />
          )
        })
        : <div>
            <CardTag topic="life" color="black" />
            <CardTag topic="inspiration" color="black" />
            <CardTag topic="growth" color="black" />
          </div>
      }       
    </div>
    )
}

export default CardFooter;