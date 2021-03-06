var User = require('../').User;
var Comment = require('../').Comment;
var Url = require('../').Url;

module.exports = function(sequelize, dataTypes) {
  var Heart = sequelize.define('Heart', {
    UserId: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    CommentId: {
      type: dataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      toggleHeart: function(){
        var faved = true;
      },

      getUserFaves: function(userId, lastCommentId) {
        var comment = {
          model: Comment,
          attributes: ['id', 'text', 'createdAt'],
          include: [{
            model: User,
            attributes: ['name']
          }, {
            model: Url,
            attributes: ['url']
          }],
        };

        if (lastCommentId !== undefined && lastCommentId !== 'undefined') {
          comment.where = {};
          comment.where.id = {};
          comment.where.id.$lt = lastCommentId;
        }

        var query = {
          where: {
            UserId: userId
          },
          include: [
            comment
          ]
        };

        // limit the number of comments we send to the user
        query.limit = 25;

        // return in ascending order of heart id
        query.order = [
          ['id', 'DESC']
        ];

        return Heart.findAll(query)
          .then(function(result) {
            return result;
          })
          .catch(function(err) {
            console.log("Heart: getUserFaves error ", err);
          });
      }
    }
  });

  return Heart;
};
