# frozen_string_literal: true

class SearchTasksForm
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :due_date, :string
  attribute :user_id, :string

  def build_params
    {
      due_date_between: due_date,
      user_id_eq: user_id
    }
  end
end
