var React = require('react');

// A Comment component that can be applied to a user profile feed,
// a url feed, or any other comment list.
// Comment data will be passed down in this.props.comment.
//
// TODO:
// - Show a delete link if this comment belongs to the logged in user?
//   How does the comment get deleted from the feed?
// - Show # Hearts?

// TODO: We need a way to check if user is either viewing their own comments
//       or if the user is an Admin and they can view all these things! Going
//       to simulate this for now.

var userStatus = 1;

var CommentActions = React.createClass({
  removeComment: function() {
    console.log('CLICK DETECTED IN COMMENTACTIONS.JS!');

    // $.ajax({
    //   url: window.location.origin + '/api/comments/remove/' + this.props.commentid,
    //   method: 'DELETE',
    //   dataType: 'json',
    //   success: function(data) {
    //     console.log('DELETED COMMENT OH SHIT OH SHIT')
    //     //React.render(<Admin/>);
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(xhr, status, err.message);
    //   }
    // });
  },

  // TODO: Move all this stuff into the above the comment.js component above this. Then we can get real about changing all our states.
  // 

  handleClick: function() {
    console.log('HANDLE CLICK DELETE: ', this.props.commentid);
    console.log('props', this.props);
    this.setState({lastClickedComment: this.props.commentid});
    //this.props.setLastClicked(this.props.commentid);
  },

  render: function() {
    console.log('RENDER COMMENT ID: ', this.props.commentid);
    if (userStatus === 1) {
      return (
          <p><a onClick={this.handleClick}>DELETE COMMENT</a> | REMOVE FLAG</p>
      );    
    } else {
      return null;  
    }
  }
});

module.exports = CommentActions;