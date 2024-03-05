<template>
  <div class="container">
    <h2>Đăng nhập</h2>
    <Form @submit="login" :validation-schema="validationSchema">
      <div class="form-group">
        <label for="email">Email:</label>
        <Field type="email" class="form-control" id="email" v-model="email" name="email" />
        <ErrorMessage class="error-feedback" name="email" />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu:</label>
        <Field type="password" class="form-control" id="password" v-model="password" name="password" />
        <ErrorMessage class="error-feedback" name="password" />
      <div v-if="loginError" class="error-feedback mt-2">{{ loginError }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Đăng nhập</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import UserService from '@/services/user.service';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      email: '',
      password: '',
      validationSchema: yup.object().shape({
        email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: yup.string().min(6, 'Mật khẩu có its nhất 6 kí tự.').max(16, "Mật khẩu có tối đa 16 kí tự.").required('Vui lòng nhập mật khẩu'),
      }),
      loginError: null,
    };
  },
  methods: {
    async login() {
      try {
        const user = {email: this.email, password: this.password}
        const result =  await UserService.login(user);

        if(result){
          const token = result.token;
          await localStorage.setItem('token', token);
          const userData = await UserService.getByEmail(this.email);
          this.$store.commit('SET_USER',  userData, token);
          console.log(userData);
          
          this.$router.push('/');
        } else {
          this.loginError = 'Sai thông tin tài khoản'; 
        }
        
      } catch (error) {
        console.error('Đăng nhập thất bại:', error);
        this.loginError = 'Sai thông tin tài khoản. Vui lòng nhập lại';
        // Xử lý lỗi nếu cần
      }
    },
  },
};
</script>

<style scoped>
/* Định dạng CSS của component */
</style>
