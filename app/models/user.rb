class User < ApplicationRecord
  has_many :rating, dependent: :destroy
  has_many :comment, dependent: :destroy
  has_many :watchlist, dependent: :destroy
  has_many :watchlater, dependent: :destroy

  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :email, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :username, uniqueness: true, presence: true
  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :password,
            length: {minimum: 6},
            confirmation: true,
            if: lambda{new_record? || !password.nil?}

  def generate_password_token!
   self.reset_password_token = generate_token
   self.reset_password_sent_at = Time.now.utc
   save!
  end

  def password_token_valid?
   (self.reset_password_sent_at + 4.hours) > Time.now.utc
  end

  def reset_password!(password)
   self.reset_password_token = nil
   self.password = password
   save!
  end

  private

  def generate_token
   SecureRandom.hex(10)
  end
end
