import React from 'react';
import { Form, Input } from 'antd';
import { useForm } from 'react-hook-form';
import { createToken } from '../../../services/actions/token';
import { useNavigate } from 'react-router-dom';
import { getUserByUsername } from '../../../services/actions/users';
import { useUser } from '../../../context/UserContext'
import CustomButton from '../../atoms/Button';

const LoginForm = () => {
  const { login } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const getToken = async (data) => {
    try {
      const response = await createToken({
        username: data.username,
        password: data.password
      });

      if (response && response.status === 200) {
        localStorage.setItem('token', response.data.access);
        return response.data.access
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  const onFinish = async (data) => {
    try {
      const token = await getToken(data);

      const userData = await getUserByUsername(data.username, token);
      console.log("userData:", userData)
      
      if(userData && userData.status === 200) {
        login(userData.data);
        navigate(`/dashboard/${userData.data.id}`)
        return userData.data;
      }
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
   
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return(
    <Form
      name="basic"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Email"
        name="username"
        rules={[
          {
            required: true,
            message: 'Email é obrigatório',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[
          {
            required: true,
            message: 'Senha é obrigatória',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <CustomButton text="Entrar" htmlType="submit" />
      </Form.Item>
    </Form>
  )
};
export default LoginForm;
