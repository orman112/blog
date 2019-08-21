import React from 'react'
import styles from './footer.module.scss'

class Footer extends React.Component {
    render() {
        const { children } = this.props

        return (
            <footer className={styles.container}>
                <div className={styles.footer}>
                    {children}
                </div>
          </footer>
        )
    }
}

export default Footer