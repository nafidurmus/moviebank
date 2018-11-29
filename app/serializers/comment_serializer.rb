class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :comment_title, :comment_body, :comment_movie_id
  belongs_to :user
end
