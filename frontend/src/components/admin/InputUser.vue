<template>
    <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <Form @submit="submitUser" :validation-schema="userFormSchema">
                        <div class="row">
                            <div class="col-lg-6 form-group">
                                <label for="name">Tên</label>
                                <Field class="form-control" id="name" name="name" v-model="userLocal.name" type="text" />
                                <ErrorMessage class="error-feedback" name="name" />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="auth">Phân quyền</label>
                                <Field class="form-control " name="auth" v-model="userLocal.isAdmin" as="select">
                                    <option :value="false">User</option>
                                    <option :value="true">Admin</option>
                                </Field>
                                <ErrorMessage class="error-feedback" name="auth" />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="phone">Số điện thoại</label>
                                <Field class="form-control" id="phone" name="phone" v-model="userLocal.phone" type="text" />
                                <ErrorMessage class="error-feedback" name="phone" />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="email">Email</label>

                                <Field class="form-control" id="email" name="email" v-model="userLocal.email"
                                    type="text" />
                                <ErrorMessage class="error-feedback" name="email" />
                            </div>

                            <div class=" col-12 form-group">
                                <label for="password">Mật khẩu:</label>
                                <Field class="form-control" id="password" name="password"  
                                :type="showPassword ? 'text' : 'password'" v-model="password" />
                                <button class="btn position-absolute" type="button" 
                                    @click="toggleShowPassword" style="right: 15px; top: 32px;">
                                    <i v-if="showPassword" class="fa-solid fa-eye"></i>
                                    <i v-else class="fa-solid fa-eye-slash"></i>
                                </button>
                                <ErrorMessage class="error-feedback" name="password" />
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="" class="btn btn-primary">Lưu</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import UserService from '@/services/user.service';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ['submit:user'],
    props: {
        user: { type: Object, required: true },
        modalId: { type: String, required: true },
        title: { type: String, required: true }
    },
    watch: {
        user: {
            handler(newVal) {
                this.userLocal = { ...newVal };
            },
            deep: true
        }
    },
    data() {
        return {
            showPassword: false,
            password: "",
            userLocal: { ...this.user },
            userFormSchema: yup.object().shape({
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

                // 're-password': yup.string()
                //                     .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
                //                     .max(16, "Mật khẩu có tối đa 16 kí tự.",),

                // password: yup.string()
                //                     .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
                //                     .max(16, "Mật khẩu có tối đa 16 kí tự.",)
                //                     .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
            }),
        };
    },
    methods: {
        submitUser() {
            const { _id, password, ...userData } = this.userLocal;
            if(this.password != "" && this.password != null){
                userData.password = this.password;
            } 
            this.$emit('submit:user', userData);
            this.$emit('close');
        },
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        },
    },

};
</script>
  

<style>

.btn:focus {
    outline: none !important;
    box-shadow: none !important;
}
</style>