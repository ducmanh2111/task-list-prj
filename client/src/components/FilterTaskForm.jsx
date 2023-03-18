import { Col, DatePicker, Form, Row } from "antd";
import React from "react";

export default function FilterTaskForm({onFilterByDueDate}) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="horizontal"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item
            label={'Due Date'}
            name={'due_date'}
          >
            <DatePicker onChange={onFilterByDueDate}/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
