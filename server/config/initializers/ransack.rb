# frozen_string_literal: true

Ransack.configure do |config|
  config.add_predicate 'between',
                       arel_predicate: 'between',
                       formatter: proc { |v| (Time.zone.parse(v).beginning_of_day..Time.zone.parse(v).end_of_day) },
                       validator: proc { |v| v.present? },
                       type: :string
end
