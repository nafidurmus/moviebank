class Comment < ApplicationRecord
	belongs_to :user

	validates :user_id, presence: true
	validates :comment_title, presence: true
	validates :comment_body, presence: true
	validates :comment_movie_id, presence: true
end
