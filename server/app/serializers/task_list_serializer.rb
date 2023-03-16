class TaskListSerializer
  attr_reader :data

  def initialize(args)
    @data = args[:data]
  end

  def generate
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: TaskSerializer)
  end
end
