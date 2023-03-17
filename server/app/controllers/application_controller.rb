class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pagy::Backend
  include PaginationHandler

  wrap_parameters format: []
end
