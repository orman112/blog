import React from 'react'
import styles from './footer.module.scss'

class Footer extends React.Component {

    render() {
        const { children } = this.props

        const SocialButton = (props) => {
            let style = '';
            let url = '';

            if (props.site === 'twitter') {
              style = styles.buttonTwitter;
              url = 'https://twitter.com/' + props.username;
            }
            else if (props.site === 'linkedin') {
              style = styles.buttonLinkedin;
              url = 'https://www.linkedin.com/in/' + props.username;
            }
            else if (props.site === 'github') {
              style = styles.buttonGithub;
              url = 'https://www.github.com/' + props.username;
            }

            return (
              <a href={url} target='_blank' rel='noopener noreferrer'>
                <div className={style}>{props.children}&nbsp;</div>
              </a>
            )
        }

        return (
            <footer className={styles.container}>
                <div className={styles.footerContainer}>
                    <div className={styles.footer}>
                        {children}
                    </div>
                    <div className={styles.row}>
                        <SocialButton site='github' username='orman112'></SocialButton>
                        <SocialButton site='linkedin' username='claytonorman'></SocialButton>
                        <SocialButton site='twitter' username='thefrugaldev'></SocialButton>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer