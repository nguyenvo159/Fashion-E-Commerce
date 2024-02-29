<template>
    <div class="container">
        <h2>Đăng ký</h2>
        <Form @submit="registerUser" :validation-schema="validationSchema">
            <div class="form-group">
                <label for="name">Họ và tên:</label>
                <Field type="text" class="form-control" id="name" v-model="user.name" name="name" />
                <ErrorMessage class="error-feedback" name="name" />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <Field type="email" class="form-control" id="email" v-model="user.email" name="email" />
                <ErrorMessage class="error-feedback" name="email" />
                <div v-if="isEmailExists" class="error-feedback">Email đã tồn tại.</div>
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu:</label>
                <Field type="password" class="form-control" id="password" v-model="user.password" name="password" />
                <ErrorMessage class="error-feedback" name="password" />
            </div>
            <div class="form-group">
                <label for="re-password">Nhập lại mật khẩu:</label>
                <Field type="password" class="form-control" id="re-password" name="re-password" />
                <ErrorMessage class="error-feedback" name="re-password" />
            </div>
            <button type="submit" class="btn btn-primary">Đăng ký</button>
        </Form>
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
                password: "",
                're-password': "",
            },
            isEmailExists: false,
            validationSchema: yup.object({
                name: yup.string().required("Vui lòng nhập họ và tên").min(2, "Tên có ít nhất 2 kí tự."),
                email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
                password: yup.string().required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu phải chứa ít nhất 6 ký tự").max(16, "Mật khẩu có tối đa 16 kí tự.",),
                're-password': yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
            })
        };
    },
    methods: {
        async registerUser() {
            try {
                const response = await UserService.register(this.user);

                console.log("Đăng ký thành công:", response);
            } catch (error) {
                console.error("Đăng ký thất bại:", error);
                if (error.response && error.response.status === 400 && error.response.data.message === "Email is already registered") {
                    this.isEmailExists = true;
                }
            }
        }
    }
};
</script>
  
<style>
/* CSS styles can be added here if needed */
</style>
  