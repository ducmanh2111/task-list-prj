class Task < ApplicationRecord
  belongs_to :user

  enum status: { open: 0, completed: 1, expired: 2 }
end
