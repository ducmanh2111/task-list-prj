import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';

import AuthService from "../services/auth.service";


export default function Login() {
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errors.length !== 0) {
      message.error(errors);
    }
  }, [errors]);

  const onFinish = (values) => {
    const { email, password } = values;

    AuthService.login(email, password).then(data => {
      navigate("/tasks");
    }).catch(error => {
      setErrors(error.response.data.errors);
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
              style={{textAlign: 'center'}}
            >
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                Submit
              </Button>
              <Link to='/register'>
                I don't have an account
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
