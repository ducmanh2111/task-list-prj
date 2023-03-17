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
    pagy, pagy_tasks = pagy(tasks, items: per_page, page: page)
    {
      pagy_tasks: pagy_tasks,
      tasks: tasks,
      pagy: pagy
    }
  end

  private

  def tasks
    user.tasks.order(id: :desc).includes(:user)
  end
end
