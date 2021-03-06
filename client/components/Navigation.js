var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Navigation = React.createClass({
  getInitialState: function() {
    return {
      user: null,
    };
  },
  checkUser: function() {
    $.ajax({
      url: window.location.origin + '/api/user/loggedin',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        if (data.user) {
          this.setState({user: data.user});
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.message);
      }
    });
  },
  componentDidMount: function() {
    this.checkUser();
  },
  render: function() {
    var user = this.state.user;
    return (
      <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#oxidizer-collapse" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Oxidizer</a>
          </div>
          <div className="collapse navbar-collapse" id="oxidizer-collapse">

          {(() => {
              if (user){
                return (
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="website" params={{website: ""}}>Search</Link></li>
                    <li><Link to="leaderboard">Popular</Link></li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-user"></i></a>
                      <ul className="dropdown-menu user-menu">
                        <li><Link to="profile">My Profile <i className="fa fa-user"></i></Link></li>
                        <li><a href="/api/auth/logout">Log Out <i className="fa fa-sign-out"></i></a></li>
                      </ul>
                    </li>
                  </ul>
                  )
                } else {
                return (
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="/api/auth/google">Login with Google <i className="fa fa-google"></i></a></li>
                    <li><a href="/api/auth/facebook">Login with Facebook <i className="fa fa-facebook-square"></i></a></li>
                  </ul>
                  )
                }
            })()} 

          
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Navigation;