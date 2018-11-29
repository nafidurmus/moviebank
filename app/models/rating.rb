class Rating < ApplicationRecord
	belongs_to :user

	validates :user_id, presence: true
	validates :rating_value, presence: true
	validates :rating_movie_id, presence: true
end
