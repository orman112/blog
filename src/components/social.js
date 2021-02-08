import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Twitter, Linkedin, Facebook } from "react-feather"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
} from "react-share"

const Social = styled.div`
  .button {
    margin: 0.5rem;
    font-size: 0.9em;
    &.linkedin {
      background-color: ${props => props.theme.brandColors.linkedin};
      color: ${props => props.theme.brandColors.linkedin};
      border: 1px solid ${props => props.theme.brandColors.linkedin};
      background-color: #fff;
      &:hover {
        background-color: ${props => props.theme.brandColors.linkedin};
        border-color: ${props => props.theme.brandColors.linkedin};
        color: #fff;
      }
    }
    &.facebook {
      background-color: ${props => props.theme.brandColors.facebook};
      color: ${props => props.theme.brandColors.facebook};
      border: 1px solid ${props => props.theme.brandColors.facebook};
      background-color: #fff;
      &:hover {
        background-color: ${props => props.theme.brandColors.facebook};
        border-color: ${props => props.theme.brandColors.facebook};
        color: #fff;
      }
    }
    &.twitter {
      background-color: ${props => props.theme.brandColors.twitter};
      color: ${props => props.theme.brandColors.twitter};
      border: 1px solid ${props => props.theme.brandColors.twitter};
      background-color: #fff;
      &:hover {
        background-color: ${props => props.theme.brandColors.twitter};
        border-color: ${props => props.theme.brandColors.twitter};
        color: #fff;
      }
    }
    &.reddit {
      background-color: ${props => props.theme.brandColors.reddit};
      color: ${props => props.theme.brandColors.reddit};
      border: 1px solid ${props => props.theme.brandColors.reddit};
      background-color: #fff;
      &:hover {
        background-color: ${props => props.theme.brandColors.reddit};
        border-color: ${props => props.theme.brandColors.reddit};
        color: #fff;
      }
    }

    .icon {
      margin-right: 0.5em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export default ({ socialConfig, tags }) => (
  <Social>
    <FacebookShareButton
      url={socialConfig.config.url}
      className="button is-outlined is-rounded facebook"
    >
      <span className="icon">
        <Facebook />
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
        <Twitter />
      </span>
      <span className="text">Twitter</span>
    </TwitterShareButton>
    <LinkedinShareButton
      url={socialConfig.config.url}
      className="button is-outlined is-rounded linkedin"
      title={socialConfig.config.title}
    >
      <span className="icon">
        <Linkedin />
      </span>
      <span className="text">LinkedIn</span>
    </LinkedinShareButton>
    {/* <RedditShareButton
      url={socialConfig.config.url}
      className="button is-outlined is-rounded reddit"
      title={socialConfig.config.title}
    >
      <span className="icon">
    
      </span>
      <span className="text">Reddit</span>
    </RedditShareButton> */}
  </Social>
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
