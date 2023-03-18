# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :task, only: %i[show update destroy]

  def index
    presenter = TasksPresenter.new(params, current_user)
    searched_results = presenter.result
    render json: {
      data: TaskListSerializer.new(data: searched_results[:pagy_tasks]).generate,
      meta: pagy_info(searched_results[:tasks], searched_results[:pagy])
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
      render json: { status: :ok, message: 'Success' }
    else
      render json: { status: :unprocessable_entity, errors: @form.errors }
    end
  end

  def show
    render json: { status: :ok, data: task }
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
