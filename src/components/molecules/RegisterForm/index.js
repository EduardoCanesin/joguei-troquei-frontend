import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Input, Button, DatePicker, message } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createNewUser } from '../../../services/actions/users';

const StyledForm = styled(Form)`
  max-width: 600px;
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const ErrorText = styled.p`
  color: red;
  margin: 0;
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (data) => {
    const { confirmPassword, ...formData } = data;

    const payload = {
      ...formData,
      status: true,
    };

    try {
      const response = await createNewUser(payload);
      if(response && response.status === 201) {
        messageApi.success('Cadastro realizado com sucesso! Redirecionando para o login...');
        reset();
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      messageApi.error('Erro ao cadastrar usuário. Tente novamente.');
      console.error('Erro ao cadastrar usuário', error.response?.data || error.message);
    }
  };

  const handleDateChange = (dateString) => {
    setValue('date_of_birth', dateString);
  };

  const handleFirstNameChange = (event) => {
    setValue('first_name', event.target.value);
  };

  const handleLastNameChange = (event) => {
    setValue('last_name', event.target.value);
  };
  
  const handleStateChange = (event) => {
    setValue('state', event.target.value);
  };

  const handleCityChange = (event) => {
    setValue('city', event.target.value);
  };

  const handleEmailChange = (event) => {
    setValue('username', event.target.value);
  };

  const handlePasswordChange = (event) => {
    setValue('password', event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setValue('confirmPassword', event.target.value);
  }; 

return (
  <>
    {contextHolder}
    <StyledForm
      {...layout}
      onFinish={handleSubmit(onSubmit)}
      aria-label="Formulário de Cadastro"
    >
      {/* Nome */}
      <Form.Item
        label="Nome"
        onChange={handleFirstNameChange}
        rules={[{ required: true, message: 'O nome é obrigatório.' }]}
        >
        <Input
          {...register('first_name', { required: true })}
          aria-invalid={errors.first_name ? 'true' : 'false'}
          placeholder="Digite seu nome"
        />
        {errors.first_name && <ErrorText>{errors.first_name.message}</ErrorText>}
      </Form.Item>

      {/* Sobrenome */}
      <Form.Item
        label="Sobrenome"
        onChange={handleLastNameChange}
        rules={[{ required: true, message: 'O sobrenome é obrigatório.' }]}
      >
        <Input
          {...register('last_name', { required: true })}
          aria-invalid={errors.last_name ? 'true' : 'false'}
          placeholder="Digite seu sobrenome"
        />
        {errors.last_name && <ErrorText>{errors.last_name.message}</ErrorText>}
      </Form.Item>

      {/* Estado */}
      <Form.Item
        label="Estado"
        onChange={handleStateChange}
        rules={[{ required: true, message: 'O estado é obrigatório.' }]}
      >
        <Input
          {...register('state', { required: true })}
          aria-invalid={errors.state ? 'true' : 'false'}
          placeholder="Digite seu estado"
        />
        {errors.state && <ErrorText>{errors.state.message}</ErrorText>}
      </Form.Item>

      {/* Cidade */}
      <Form.Item
        label="Cidade"
        onChange={handleCityChange}
        rules={[{ required: true, message: 'A cidade é obrigatória.' }]}
      >
        <Input
          {...register('city', { required: true })}
          aria-invalid={errors.city ? 'true' : 'false'}
          placeholder="Digite sua cidade"
        />
        {errors.city && <ErrorText>{errors.city.message}</ErrorText>}
      </Form.Item>

      {/* Data de Nascimento */}
      <Form.Item
        label="Data de Nascimento"
        rules={[{ required: true, message: 'A data de nascimento é obrigatória.' }]}
      >
        <StyledDatePicker
          onChange={handleDateChange}
          aria-invalid={errors.date_of_birth ? 'true' : 'false'}
          placeholder="Selecione sua data de nascimento"
          disabledDate={(current) => current && current > moment().endOf('day')}
        />
        <input
          type="hidden"
          {...register('date_of_birth', { required: true })}
        />
        {errors.date_of_birth && <ErrorText>{errors.date_of_birth.message}</ErrorText>}
      </Form.Item>

      {/* Email */}
      <Form.Item
        label="Email"
        onChange={handleEmailChange}
        rules={[{ required: true, message: 'O email é obrigatório.' }]}
      >
        <Input
          {...register('username', { required: true }, {
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: 'Formato de email inválido',
            },
          })}
          aria-invalid={errors.username ? 'true' : 'false'}
          placeholder="Digite seu email"
        />
        {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
      </Form.Item>

      {/* Senha */}
      <Form.Item
        label="Senha"
        onChange={handlePasswordChange}
        rules={[{ required: true, message: 'A senha é obrigatória.' }]}
      >
        <Input.Password
          {...register('password', { required: true })}
          aria-invalid={errors.password ? 'true' : 'false'}
          placeholder="Digite sua senha"
        />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      </Form.Item>

      {/* Confirmar Senha */}
      <Form.Item
        label="Confirmar Senha"
        onChange={handleConfirmPasswordChange}
        rules={[{ required: true, message: 'A confirmação da senha é obrigatória.' }]}
      >
        <Input.Password
          {...register('confirmPassword', { required: true }, {
            validate: (value) => value === watch('password') || 'As senhas não coincidem',
          })}
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          placeholder="Confirme sua senha"
        />
        {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
      </Form.Item>

      {/* Botão de Cadastro */}
      <Form.Item wrapperCol={{ span: 24, offset: 8 }}>
        <StyledButton type="primary" htmlType="submit">
          Cadastrar
        </StyledButton>
      </Form.Item>
    </StyledForm>
  </>
);

};

export default RegistrationForm;
