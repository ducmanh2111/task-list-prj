# frozen_string_literal: true

class TasksPresenter
  include Pagy::Backend

  attr_reader :params, :per_page, :page, :user

  def initialize(params, user)
    @user = user
    @params = params
    @per_page = params[:per_page] || 5
    @page = params[:page] || 1
  end

  def result
    return @result if @result

    q_params = params[:q].presence || ActionController::Parameters.new
    @q = SearchTasksForm.new(q_params.merge(user_id: user.id).permit!).build_params
    @result ||= Task.ransack(@q).result.order(due_date: :asc)
    pagy, pagy_tasks = pagy(@result, items: per_page, page: page)
    {
      pagy_tasks: pagy_tasks,
      tasks: @result,
      pagy: pagy
    }
  end
end
