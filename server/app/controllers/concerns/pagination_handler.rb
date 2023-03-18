# frozen_string_literal: true

module PaginationHandler
  def pagy_info(data, pagy)
    {
      page: pagy.page,
      total_pages: pagy.pages,
      total_result: data.size
    }
  end
end
