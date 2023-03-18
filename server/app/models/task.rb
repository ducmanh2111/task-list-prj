# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :user

  enum status: { open: 0, completed: 1, expired: 2 }

  def self.ransackable_attributes(_auth_object = nil)
    %w[title due_date user_id]
  end
end
