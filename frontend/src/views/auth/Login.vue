<template>
  <div class="container-fluid mb-5">
    <div class="row">
      
      <div class="mt-3 col-lg-6 row justify-content-center align-items-flex-start d-none d-lg-flex">
        <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg" alt="" 
          class="img-fluid mb-3 pt-3 w-75">
            
      </div>

      <div class="col-lg-6 row justify-content-center aligh-item-center">
        <h2 class="mt-5 text-center w-100">ĐĂNG NHẬP</h2>
        <div class="w-75">
          <Form @submit="login" :validation-schema="validationSchema">
            <div class="form-group">
              <label for="email">Email:</label>
              <Field type="email" class="form-control rounded-0" id="email" v-model="email" name="email" />
              <ErrorMessage class="error-feedback" name="email" />
            </div>
            <div class="form-group">
              <label for="password">Mật khẩu:</label>
              <Field type="password" class="form-control rounded-0" id="password" v-model="password" name="password" />
              <ErrorMessage class="error-feedback" name="password" />
            <div v-if="loginError" class="error-feedback mt-2">{{ loginError }}</div>
            </div>
            <button type="submit" class="w-100 btn btn-primary rounded-0">Đăng nhập</button>
          </Form>
          <p class="mt-2">Bạn chưa có tài khoản? <router-link :to="{name: 'Register'}">Đăng ký ngay</router-link></p>
        </div>
      </div>

    </div>
    
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
          // console.log(userData);
          
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
.form-control{
  box-shadow: none;
}
</style>
