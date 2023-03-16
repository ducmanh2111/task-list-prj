class ApplicationController < ActionController::Base
  protect_from_forgery prepend: true
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pagy::Backend
  include PaginationHandler
end
