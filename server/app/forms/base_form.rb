class BaseForm
  include ActiveModel::Model
  include ActiveModel::Attributes

  attr_accessor :record
end
