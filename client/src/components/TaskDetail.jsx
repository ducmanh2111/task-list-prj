import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, message, Row, Switch } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import taskApi from '../api/tasks';
import { disabledDate } from '../utils/time';

export default function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState({});
  const [isReload, setIsReload] = useState(false);
  const [form] = Form.useForm();

  const DATE_FORMAT = "YYYY-MM-dd h:mm:ss a Z";;

  useEffect(() => {
    taskApi.loadTask(taskId)
      .then(response => {
        setTask(response.data.data);
    }).catch(error => {
      message.error(error.message);
    })
  }, [taskId, isReload])

  const initialValues = {
    title: task.title,
    description: task.description,
    status: task.status === 'completed',
    due_date: task.due_date ? moment(task.due_date) : null,
    created_at: moment(task.created_at).format(DATE_FORMAT)
  }
  
  const onFinish = (values) => {
    const payload = Object.keys(values).reduce((result, key) => {
      if (key !== 'created_at' && key !== 'status') {
        result[key] = values[key];
      }

      if (key === 'status') {
        result[key] = values[key] ? 'completed' : 'open';
      }

      return result;
    }, {});

    taskApi.updateTask({ ...payload, id: task.id }).then(_res => {
      setIsReload(!isReload);
      message.success('Task updated');
    }).catch(error => {
      message.error(error);
    })
  }
  
  return (
    <>
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col xs={20} sm={16} md={12} lg={8}>
          { Object.keys(task).length !== 0 &&
            <Form
            form={form}
            onFinish={onFinish}
            layout="horizontal"
            size={"large"}
            initialValues={initialValues}
            labelCol={{
              span: 5
            }}
            >
              <Form.Item
                label={'Title'}
                name={'title'}
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={'Description'}
                name={'description'}
              >
                <Input.TextArea showCount maxLength={100}/>
              </Form.Item>
              <Form.Item
                label={'Completed'}
                name={'status'}
                valuePropName="checked"
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  // onChange={() => onTaskToggle(task)}
                />
              </Form.Item>
              <Form.Item
                name='due_date'
                label='Due Date'
              >
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={disabledDate}
                  showTime={{
                    defaultValue: moment('00:00:00', 'HH:mm:ss'),
                  }}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                name='created_at'
                label='Created Date'
              >
                <Input readOnly />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit"> Save </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button size={'large'} type='dashed'>
                  <Link to='/tasks'>Back</Link>
                </Button>
              </Form.Item>
            </Form>
          }
        </Col>
      </Row>
    </>
  );
};
