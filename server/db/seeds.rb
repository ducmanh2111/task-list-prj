# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create!(email: 'manh@gmail.com', password: '123456789')

5.times do |i|
  user.tasks.build(title: "user_#{user.id}| task #{i} | title", description: "task #{i} | description",
                   due_date: Date.tomorrow, status: :open).save
end
