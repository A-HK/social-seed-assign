import styles from '@/styles/CardStyles.module.css'

const CardTag = ({ topic, color }) => {
    return (
      <span
        className={styles.cardTag}
        style={{
          border: `2px solid ${color}`,
          color: color,
        }}
      >
        #{topic}
      </span>
    );
  };
  
  export default CardTag;