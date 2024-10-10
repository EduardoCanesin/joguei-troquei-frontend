import React, { useEffect } from 'react';
import { Form, Input, Button, message, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const { Title } = Typography;

const EditProfileContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
  margin-bottom: 40px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 0;
`;

const ProfileSection = styled.div`
  margin-bottom: 40px;
`;

const EditProfile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile'); // Endpoint para obter os dados do perfil
        if (!response.ok) throw new Error('Erro ao carregar dados do usuário');
        const data = await response.json();
        
        setValue('firstName', data.firstName);
        setValue('lastName', data.lastName);
        setValue('state', data.state);
        setValue('city', data.city);
        setValue('birthDate', data.birthDate);
        setValue('email', data.email);
        setValue('profileMessage', data.profileMessage);
      } catch (error) {
        message.error(error.message);
      }
    };

    fetchUserData();
  }, [setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('state', data.state);
    formData.append('city', data.city);
    formData.append('birthDate', data.birthDate);
    formData.append('email', data.email);
    formData.append('profileMessage', data.profileMessage);

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Erro ao atualizar o perfil');
      
      message.success('Perfil atualizado com sucesso!');
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFileChange = (info) => {
    setProfileImage(info.file.originFileObj);
  };

  const onSubmitPassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      message.error('As senhas não correspondem.');
      return;
    }

    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: data.newPassword,
        }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar a senha');

      message.success('Senha atualizada com sucesso!');
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <EditProfileContainer role="form" aria-labelledby="edit-profile-title">
      <Title level={4} id="edit-profile-title">Editar Perfil</Title>
      <ProfileSection>
        <Title level={5}>Imagem de Perfil e Mensagem</Title>

        <Form layout="vertical">
          <Form.Item label="Upload de Imagem de Perfil">
             <Upload
              name="profileImage"
              listType="picture"
              beforeUpload={() => false}
              onChange={onFileChange}
              aria-label="Envie sua imagem de perfil"
            >
              <Button icon={<UploadOutlined />}>Escolher Imagem</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Mensagem Personalizada" required>
            <Input.TextArea
              {...register('profileMessage', { required: 'Mensagem é obrigatória' })}
              aria-invalid={errors.profileMessage ? "true" : "false"}
              aria-describedby="profileMessageError"
              rows={4}
              placeholder="Escreva uma mensagem que aparecerá no seu perfil"
            />
            {errors.profileMessage && (
              <ErrorMessage id="profileMessageError">{errors.profileMessage.message}</ErrorMessage>
            )}
          </Form.Item>
        </Form>
      </ProfileSection>
      <FormContainer>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Nome" required>
            <Input 
              {...register('firstName', { required: 'Campo obrigatório' })} 
              aria-invalid={errors.firstName ? "true" : "false"} 
              aria-describedby="firstNameError"
            />
            {errors.firstName && <ErrorMessage id="firstNameError">{errors.firstName.message}</ErrorMessage>}
          </Form.Item>
          <Form.Item label="Sobrenome" required>
            <Input 
              {...register('lastName', { required: 'Campo obrigatório' })} 
              aria-invalid={errors.lastName ? "true" : "false"} 
              aria-describedby="lastNameError"
            />
            {errors.lastName && <ErrorMessage id="lastNameError">{errors.lastName.message}</ErrorMessage>}
          </Form.Item>
          <Form.Item label="Estado" required>
            <Input 
              {...register('state', { required: 'Campo obrigatório' })} 
              aria-invalid={errors.state ? "true" : "false"} 
              aria-describedby="stateError"
            />
            {errors.state && <ErrorMessage id="stateError">{errors.state.message}</ErrorMessage>}
          </Form.Item>
          <Form.Item label="Cidade" required>
            <Input 
              {...register('city', { required: 'Campo obrigatório' })} 
              aria-invalid={errors.city ? "true" : "false"} 
              aria-describedby="cityError"
            />
            {errors.city && <ErrorMessage id="cityError">{errors.city.message}</ErrorMessage>}
          </Form.Item>
          <Form.Item label="Data de Nascimento" required>
            <Input 
              {...register('birthDate', { required: 'Campo obrigatório' })} 
              aria-invalid={errors.birthDate ? "true" : "false"} 
              aria-describedby="birthDateError"
            />
            {errors.birthDate && <ErrorMessage id="birthDateError">{errors.birthDate.message}</ErrorMessage>}
          </Form.Item>
          <Form.Item label="Email" required>
            <Input 
              type="email" 
              {...register('email', { required: 'Campo obrigatório' })} 
              aria-invalid={errors.email ? "true" : "false"} 
              aria-describedby="emailError"
            />
            {errors.email && <ErrorMessage id="emailError">{errors.email.message}</ErrorMessage>}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" aria-label="Atualizar Perfil">
              Atualizar Perfil
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>

      <Title level={4}>Trocar Senha</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmitPassword)}>
        <Form.Item label="Nova Senha" required>
          <Input.Password 
            {...register('newPassword', { required: 'Campo obrigatório' })} 
            aria-invalid={errors.newPassword ? "true" : "false"} 
            aria-describedby="newPasswordError"
          />
          {errors.newPassword && <ErrorMessage id="newPasswordError">{errors.newPassword.message}</ErrorMessage>}
        </Form.Item>
        <Form.Item label="Confirmar Nova Senha" required>
          <Input.Password 
            {...register('confirmPassword', { required: 'Campo obrigatório' })} 
            aria-invalid={errors.confirmPassword ? "true" : "false"} 
            aria-describedby="confirmPasswordError"
          />
          {errors.confirmPassword && <ErrorMessage id="confirmPasswordError">{errors.confirmPassword.message}</ErrorMessage>}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" aria-label="Trocar Senha">
            Trocar Senha
          </Button>
        </Form.Item>
      </Form>
    </EditProfileContainer>
  );
};

export default EditProfile;
