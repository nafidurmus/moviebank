class WatchlaterSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :watchlater_movie_id

  belongs_to :user
end
