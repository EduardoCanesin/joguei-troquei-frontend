import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Input, Button, DatePicker, Row, Col, message } from 'antd';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
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

// Layout para as labels e inputs
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
  const password = watch('password');

  // Mensagens de sucesso e erro
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (data) => {
    try {
      // Enviar dados ao backend
      const response = await axios.post('/api/v1/register', data); // Ajuste a rota conforme o backend
      messageApi.success('Cadastro realizado com sucesso! Redirecionando para o login...');
      // Limpar o formulário após o sucesso
      reset();

      // Redireciona para a página de login após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      messageApi.error('Erro ao cadastrar usuário. Tente novamente.');
      console.error('Erro ao cadastrar usuário', error.response?.data || error.message);
    }
  };

  // Função para formatar a data de nascimento
  const handleDateChange = (date, dateString) => {
    setValue('birthDate', dateString);
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
          validateStatus={errors.firstName ? 'error' : ''}
          help={errors.firstName?.message}
        >
          <Input
            {...register('firstName', { required: 'Nome é obrigatório' })}
            aria-invalid={errors.firstName ? 'true' : 'false'}
            placeholder="Digite seu nome"
          />
          <ErrorMessage errors={errors} name="firstName" as={<ErrorText />} />
        </Form.Item>

        {/* Sobrenome */}
        <Form.Item
          label="Sobrenome"
          validateStatus={errors.lastName ? 'error' : ''}
          help={errors.lastName?.message}
        >
          <Input
            {...register('lastName', { required: 'Sobrenome é obrigatório' })}
            aria-invalid={errors.lastName ? 'true' : 'false'}
            placeholder="Digite seu sobrenome"
          />
          <ErrorMessage errors={errors} name="lastName" as={<ErrorText />} />
        </Form.Item>

        {/* Estado */}
        <Form.Item
          label="Estado"
          validateStatus={errors.state ? 'error' : ''}
          help={errors.state?.message}
        >
          <Input
            {...register('state', { required: 'Estado é obrigatório' })}
            aria-invalid={errors.state ? 'true' : 'false'}
            placeholder="Digite seu estado"
          />
          <ErrorMessage errors={errors} name="state" as={<ErrorText />} />
        </Form.Item>

        {/* Cidade */}
        <Form.Item
          label="Cidade"
          validateStatus={errors.city ? 'error' : ''}
          help={errors.city?.message}
        >
          <Input
            {...register('city', { required: 'Cidade é obrigatória' })}
            aria-invalid={errors.city ? 'true' : 'false'}
            placeholder="Digite sua cidade"
          />
          <ErrorMessage errors={errors} name="city" as={<ErrorText />} />
        </Form.Item>

        {/* Data de Nascimento */}
        <Form.Item
          label="Data de Nascimento"
          validateStatus={errors.birthDate ? 'error' : ''}
          help={errors.birthDate?.message}
        >
          <StyledDatePicker
            onChange={handleDateChange}
            aria-invalid={errors.birthDate ? 'true' : 'false'}
            placeholder="Selecione sua data de nascimento"
            disabledDate={(current) => current && current > moment().endOf('day')}
          />
          <input
            type="hidden"
            {...register('birthDate', { required: 'Data de nascimento é obrigatória' })}
          />
          <ErrorMessage errors={errors} name="birthDate" as={<ErrorText />} />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Input
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message: 'Formato de email inválido',
              },
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
            placeholder="Digite seu email"
          />
          <ErrorMessage errors={errors} name="email" as={<ErrorText />} />
        </Form.Item>

        {/* Senha */}
        <Form.Item
          label="Senha"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Input.Password
            {...register('password', { required: 'Senha é obrigatória' })}
            aria-invalid={errors.password ? 'true' : 'false'}
            placeholder="Digite sua senha"
          />
          <ErrorMessage errors={errors} name="password" as={<ErrorText />} />
        </Form.Item>

        {/* Confirmar Senha */}
        <Form.Item
          label="Confirmar Senha"
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword?.message}
        >
          <Input.Password
            {...register('confirmPassword', {
              required: 'Confirmar senha é obrigatório',
              validate: (value) => value === password || 'As senhas não coincidem',
            })}
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            placeholder="Confirme sua senha"
          />
          <ErrorMessage errors={errors} name="confirmPassword" as={<ErrorText />} />
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
