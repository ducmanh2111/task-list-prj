import React from 'react';
import { Form, Row, Col, Button, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const AddTaskForm= ({ onFormSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    onFormSubmit({
      title: form.getFieldValue('title'),
    });

    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item
            name={'title'}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="What needs to be done?" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Add task
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddTaskForm;
