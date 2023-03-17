import React from "react";
import { useNavigate  } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

import AuthService from "../services/auth.service";


export default function Login() {
  let navigate = useNavigate();


  const onFinish = (values) => {
    const { email, password } = values;

    AuthService.login(email, password).then(data => {
      navigate("/tasks");
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center'}}>
        <div>
          <h1 style={{textAlign: 'center'}}>Task List Application</h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
