class RatingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :rating_value, :rating_movie_id

  belongs_to :user
end
