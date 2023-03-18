# frozen_string_literal: true

class TasksForm < BaseForm
  attribute :title, :string
  attribute :description, :string
  attribute :due_date, :string
  attribute :status, :string, default: :open

  validates :title, presence: true

  def initialize(params, current_user)
    @current_user = current_user
    @params = params

    super params
  end

  def save
    return false unless valid?

    task.update!(attributes)

    true
  end

  delegate :destroy, to: :task

  def task
    @task ||= record || @current_user.tasks.build
  end
end
