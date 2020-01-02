import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faRedditAlien,
} from "@fortawesome/free-brands-svg-icons"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
} from "react-share"
//Styles
import "./social.scss"

const Social = ({ socialConfig, tags }) => (
  <div className="post-social">
    <FacebookShareButton
      url={socialConfig.config.url}
      className="button is-outlined is-rounded facebook"
    >
      <span className="icon">
        <FontAwesomeIcon icon={faFacebookF} />
      </span>
      <span className="text">Facebook</span>
    </FacebookShareButton>
    <TwitterShareButton
      url={socialConfig.config.url}
      className="button is-outlined is-rounded twitter"
      title={socialConfig.config.title}
      via={socialConfig.twitterHandle.split("@").join("")}
      hashtags={tags}
    >
      <span className="icon">
        <FontAwesomeIcon icon={faTwitter} />
      </span>
      <span className="text">Twitter</span>
    </TwitterShareButton>
    <LinkedinShareButton
      url={socialConfig.config.url}
      className="button is-outlined is-rounded linkedin"
      title={socialConfig.config.title}
    >
      <span className="icon">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </span>
      <span className="text">LinkedIn</span>
    </LinkedinShareButton>
    <RedditShareButton
      url={socialConfig.config.url}
      className="button is-outlined is-rounded reddit"
      title={socialConfig.config.title}
    >
      <span className="icon">
        <FontAwesomeIcon icon={faRedditAlien} />
      </span>
      <span className="text">Reddit</span>
    </RedditShareButton>
  </div>
)

Social.propTypes = {
  socialConfig: PropTypes.shape({
    twitterHandle: PropTypes.string.isRequired,
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}
Social.defaultProps = {
  tags: [],
}

export default Social
