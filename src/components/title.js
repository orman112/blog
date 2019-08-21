import React from 'react'
import styles from './title.module.scss'

class Title extends React.Component {
    render() {
        return (
            <section className={styles.container}>
                <h1 className={styles.title}>{this.props.text}</h1>
                <div className={styles.subtitle}>
                    {this.props.subtitle}
                </div>
            </section>
        )
    }
}

export default Title