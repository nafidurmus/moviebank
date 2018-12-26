class UserSerializer < ActiveModel::Serializer
  attributes :id, :firstname, :lastname, :username, :email, :password_digest, :twofa, :twofa_on_off

  has_many :rating, dependent: :destroy
  has_many :comment, dependent: :destroy
  has_many :watchlist, dependent: :destroy
  has_many :watchlater, dependent: :destroy
end