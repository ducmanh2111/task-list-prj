class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :task, only: %i[:show, :update, :destroy]

  def index
    presenter = TasksPresenter.new(params, current_user)
    render json: {
      data: TaskListSerializer.new(data: presenter.result.dig(:pagy_tasks)).generate,
      meta: pagy_info(presenter.result.dig(:tasks), presenter.result.dig(:pagy))
    }
  end

  def create
    @form = TasksForm.new(task_params, current_user)
    if @form.save
      render json: { status: :ok }
    else
      render json: { status: :unprocessable_entity, errors: task.errors }
    end
  end

  def update
    @form = TasksForm.new(task_params, current_user)
    @form.record = task
    if @form.save
      render json: { status: :ok, message: "Success" }
    else
      render json: { status: :unprocessable_entity, errors: @form.errors }
    end
  end

  def destroy
    @form = TasksForm.new({}, current_user)
    @form.record = task
    @form.destroy
  end

  private

  def task
    @task ||= Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :due_date, :status)
  end
end
