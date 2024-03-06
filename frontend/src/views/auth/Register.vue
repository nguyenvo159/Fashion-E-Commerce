<template>
    <div class="container-fluid mb-5">
        <div class="row">
          
          <div class="mt-5 col-lg-6 row justify-content-center align-items-flex-start d-none d-lg-flex">
            <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" 
              class="img-fluid mb-3 pt-3 w-75">
            <h1 class="w-100 text-center">Create an Account</h1>
            <p class="w-75 font-italic text-muted text-center mb-0">Để truy cập đến giỏ hàng, đơn hàng của bạn. Khám phá thế giới mới với chúng tôi! Đăng ký để nhận cập nhật hàng ngày và những ưu đãi đặc biệt chỉ dành cho thành viên!</p>
                
          </div>

          <div class="mt-3 col-lg-6 row justify-content-center">
            <h2 class="text-center w-100 mb-3">ĐĂNG KÝ</h2>

            <div class="w-75">
                <Form @submit="registerUser" :validation-schema="validationSchema">
                    <div class="form-group">
                        <label for="name">Họ và tên:</label>
                        <Field type="text" class="form-control rounded-0" id="name" v-model="user.name" name="name" autocomplete="off" />
                        <ErrorMessage class="error-feedback" name="name" />
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <Field type="email" class="form-control rounded-0" id="email" v-model="user.email" name="email" autocomplete="off" />
                        <ErrorMessage class="error-feedback" name="email" />
                        <div v-if="isEmailExists" class="error-feedback">Email đã tồn tại.</div>
                    </div>
                    <div class="form-group">
                        <label for="phone">Số điện thoại:</label>
                        <Field type="text" class="form-control rounded-0" id="phone" v-model="user.phone" name="phone" autocomplete="off" />
                        <ErrorMessage class="error-feedback" name="phone" />
                    </div>
                    <div class="form-group">
                        <label for="password">Mật khẩu:</label>
                        <Field type="password" class="form-control rounded-0" id="password" v-model="user.password" name="password" autocomplete="off" />
                        <ErrorMessage class="error-feedback" name="password" />
                    </div>
                    <div class="form-group">
                        <label for="re-password">Nhập lại mật khẩu:</label>
                        <Field type="password" class="form-control rounded-0" id="re-password" name="re-password" autocomplete="off" />
                        <ErrorMessage class="error-feedback" name="re-password" />
                    </div>
                    <button type="submit" class="w-100 btn btn-primary">Đăng ký</button>
                </Form>
                <p class="mt-2">Bạn đã có tài khoản? <router-link :to="{name: 'Login'}">Đăng nhập</router-link></p>
            </div>
          </div>
        
    </div>
</div>
</template>
  
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UserService from "@/services/user.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            user: {
                name: "",
                email: "",
                phone:"",
                password: "",
                're-password': "",
            },
            isEmailExists: false,
            validationSchema: yup.object({
                name: yup.string()
                                    .required("Vui lòng nhập họ và tên")
                                    .min(2, "Tên có ít nhất 2 kí tự."),

                email: yup.string()
                                    .email("Email không hợp lệ")
                                    .required("Vui lòng nhập email"),

                phone: yup.string()
                                    .required("Vui lòng nhập số điện thoại")
                                    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa các chữ số")
                                    .min(9, "Số điện thoại phải có ít nhất 9 số")
                                    .max(11, "Số điện thoại có tối đa 11 số"),

                password: yup.string()
                                    .required("Vui lòng nhập mật khẩu")
                                    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
                                    .max(16, "Mật khẩu có tối đa 16 kí tự.",),

                're-password': yup.string()
                                    .required("Vui lòng nhập lại mật khẩu")
                                    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
            })
        };
    },
    methods: {
        async registerUser() {
            try {
                const emailExists = await UserService.checkEmail(this.user.email);
                if (emailExists.exists) {
                    this.isEmailExists = true;
                    return; 
                }

                const response = await UserService.register(this.user);
                console.log(response);

                if (response.success){
                    const user = {email: this.user.email, password: this.user.password};
                    const result =  await UserService.login(user);
                    if(result){
                        const token = result.token;
                        await localStorage.setItem('token', token);
                        const userData = await UserService.getByEmail(this.user.email);
                        this.$store.commit('SET_USER',  userData, token);
                        
                        this.$router.push('/');
                    } 
                }
            } catch (error) {
                console.error("Đăng ký thất bại:", error);
            }
        }
    }
};
</script>
  
<style>
.form-control{
    box-shadow: none !important;
    outline: none !important;
  }
</style>
  