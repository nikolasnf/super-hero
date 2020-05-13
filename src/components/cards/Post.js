import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import {
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';
import SingleLightbox from '../pages/SingleLightbox';
import CommentWithLikes from '../pages/CommentWithLikes';

class Post extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderLikeAndCommentCount = this.renderLikeAndCommentCount.bind(this);
  }

  renderLikeAndCommentCount() {
    const { messages } = this.props.intl;
    return (
      <div className="mb-3">
        <div className="post-icon mr-3 d-inline-block">
          <NavLink to="#" location={{}}>
            <i className="simple-icon-heart mr-1" />
          </NavLink>
          <span>12 {messages['pages.likes']}</span>
        </div>

        <div className="post-icon mr-3 d-inline-block">
          <NavLink to="#" location={{}}>
            <i className="simple-icon-bubble mr-1" />
          </NavLink>
          <span>6 {messages['pages.comments-title']}</span>
        </div>
      </div>
    );
  }

  renderComments() {
    return this.props.data.comments.map((item, index) => {
      return <CommentWithLikes data={item} key={index} />;
    });
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <Card className={this.props.className}>
        <CardBody>
          <div className="d-flex flex-row mb-3">
            <NavLink to="#" location={{}}>
              <img
                src={this.props.data.profilePic}
                alt="thumbnail"
                className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
              />
            </NavLink>
            <div className="pl-3">
              <NavLink to="#" location={{}}>
                <p className="font-weight-medium mb-0 ">
                  {this.props.data.name}
                </p>
                <p className="text-muted mb-0 text-small">
                  {this.props.data.date}
                </p>
              </NavLink>
            </div>
          </div>
          <p>{this.props.data.detail}</p>
          {this.renderContent()}
          {this.renderLikeAndCommentCount()}
          <div className="mt-5 remove-last-border">{this.renderComments()}</div>

          <InputGroup className="comment-contaiener">
            <Input placeholder={messages['pages.addComment']} />
            <InputGroupAddon addonType="append">
              <Button color="primary">
                <span className="d-inline-block">{messages['pages.send']}</span>{' '}
                <i className="simple-icon-arrow-right ml-2" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </CardBody>
      </Card>
    );
  }
}

export default injectIntl(Post);
