class WatchlistSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :watchlist_movie_id

  belongs_to :user
end
