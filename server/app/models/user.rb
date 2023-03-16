class User < ApplicationRecord
  extend Devise::Models
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :tasks, dependent: :destroy
end
