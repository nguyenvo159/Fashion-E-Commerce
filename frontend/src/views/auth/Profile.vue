<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div id="dv" class="col-xl-8 col-lg-10 col-11">
                <h2 class="mt-2 mb-5">Thông Tin Tài Khoản</h2>
                <div v-if="user" class="mb-5">
                    <Form @submit="update" :validation-schema="userFormSchema">
                        <div class="row justify-content-center">
                            <div class="col-lg-6 form-group">
                                <label for="name">Tên</label>
                                <Field class="form-control rounded-0" id="name" name="name" v-model="user.name"
                                    type="text" />
                                <ErrorMessage class="error-feedback" name="name" />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="auth">Quyền hạn</label>
                                <select class="form-control rounded-0 " name="auth" v-model="user.isAdmin" readonly
                                    disabled>
                                    <option :value="false">User</option>
                                    <option :value="true">Admin</option>
                                </select>
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="phone">Số điện thoại</label>
                                <Field class="form-control rounded-0" id="phone" name="phone" v-model="user.phone"
                                    type="text" />
                                <ErrorMessage class="error-feedback" name="phone" />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="email">Email</label>

                                <Field class="form-control rounded-0" id="email" name="email" v-model="user.email"
                                    type="text" disabled />
                                <ErrorMessage class="error-feedback" name="email" />
                                <div v-if="existsEmail">
                                    <p class="error-feedback">Email đã tồn tại</p>
                                </div>
                            </div>
                        </div>

                        <div class="text-right">
                            <button type="submit" class="btn btn-primary">Cập nhật</button>
                        </div>
                    </Form>
                    <hr>
                    <h5 class="mt-3 mb-3">Đổi mật khẩu</h5>
                    <Form @submit="changePassword" :validation-schema="passwordFormSchema">
                        <div class="row justify-content-center">
                            <div class=" col-12 form-group">
                                <label for="password">Mật khẩu:</label>
                                <Field class="form-control rounded-0" id="password" name="password" min="6" max="16"
                                    :type="showPassword[0] ? 'text' : 'password'" v-model="password" />
                                <button class="btn position-absolute" type="button" @click="toggleShowPassword(0)"
                                    style="right: 15px; top: 32px;">
                                    <i v-if="showPassword[0]" class="fa-solid fa-eye"></i>
                                    <i v-else class="fa-solid fa-eye-slash"></i>
                                </button>

                                <ErrorMessage class="error-feedback" :name="password ? 'password' : ''" />
                                <div v-if="!isPassword">
                                    <p class="error-feedback">Sai thông tin mật khẩu</p>
                                </div>
                            </div>

                            <div class=" col-12 form-group">
                                <label for="new-password">Mật khẩu mới:</label>
                                <Field class="form-control rounded-0" id="new-password" name="new-password" min="6"
                                    max="16" :type="showPassword[1] ? 'text' : 'password'" v-model="newPassword" />
                                <button class="btn position-absolute" type="button" @click="toggleShowPassword(1)"
                                    style="right: 15px; top: 32px;">
                                    <i v-if="showPassword[1]" class="fa-solid fa-eye"></i>
                                    <i v-else class="fa-solid fa-eye-slash"></i>
                                </button>

                                <ErrorMessage class="error-feedback" :name="newPassword ? 'new-password' : ''" />

                            </div>

                            <div class=" col-12 form-group">
                                <label for="re-password">Nhập lại mật khẩu:</label>
                                <Field class="form-control rounded-0" id="re-password" name="re-password" min="6"
                                    max="16" :type="showPassword[2] ? 'text' : 'password'" v-model="rePassword" />
                                <button class="btn position-absolute" type="button" @click="toggleShowPassword(2)"
                                    style="right: 15px; top: 32px;">
                                    <i v-if="showPassword[2]" class="fa-solid fa-eye"></i>
                                    <i v-else class="fa-solid fa-eye-slash"></i>
                                </button>

                                <ErrorMessage class="error-feedback" :name="rePassword ? 're-password' : ''" />

                            </div>
                        </div>
                        <div class="">
                            <button type="submit" class="btn btn-secondary">Đổi mật khẩu</button>
                        </div>
                    </Form>
                </div>
                <div v-else>
                    <p class="mt-5 mb-5">Tải thông tin tài khoản thất bại, thử lại sau.</p>
                </div>
            </div>
        </div>

        <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 99; right: 0; top: 80px;">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true"
                data-delay="1500">
                <div class="toast-header">
                    <strong class="mr-auto h5 p-2 text-warning">
                        <i class="fa-regular fa-circle-check "></i> &nbsp; Successfully,</strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                    <p class="text-muted p-2 m-0" style="font-size: large; width: 300px;">Đã cập nhật thành công.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import UserService from '@/services/user.service';
import bcrypt from 'bcryptjs';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            showPassword: [false, false, false],
            isPassword: true,
            existsEmail: false,
            password: "",
            newPassword: "",
            rePassword: "",
            user: this.$store.getters.getUser,
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
            }),
            passwordFormSchema: yup.object().shape({
                'new-password': yup.string()
                    .required('Mật khẩu là bắt buộc.')
                    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
                    .max(16, "Mật khẩu có tối đa 16 kí tự.",),
                're-password': yup.string()
                    .required('Mật khẩu là bắt buộc.')
                    .oneOf([yup.ref('new-password'), null], 'Mật khẩu không khớp'),

                password: yup.string()
                    .required('Mật khẩu là bắt buộc.')
                    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
                    .max(16, "Mật khẩu có tối đa 16 kí tự.",)
                    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
            }),
        };
    },
    mounted() {
        try {
            this.retrieveUser();
        } catch (error) {
            this.user = null;
            console.log(error);
        }
    },
    methods: {
        async retrieveUser() {
            try {
                const user = this.$store.getters.getUser;
                this.password = "";
                this.newPassword = "";
                this.rePassword = "";
                this.user = await UserService.getByEmail(user.email);
            } catch (error) {
                this.user = null;
                console.log(error);
            }
        },
        async update() {
            try {
                const user = { name: this.user.name, phone: this.user.phone };
                await UserService.update(this.user._id, user);
                const token = localStorage.getItem('token');
                this.$store.commit('SET_USER', this.user, token);

                $('#liveToast').toast('show');
                this.retrieveUser();
                this.$router.push('/profile');

            } catch (error) {
                console.log(error);
            }
        },
        async changePassword() {
            try {
                const password = this.user.password;
                const currentPassword = this.password;

                const isPass = bcrypt.compareSync(currentPassword, password);

                if (isPass) {
                    await UserService.update(this.user._id, { password: this.newPassword });
                    $('#liveToast').toast('show');
                    this.retrieveUser();
                } else {
                    this.isPassword = false;
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        },
        toggleShowPassword(index) {
            this.showPassword[index] = !this.showPassword[index];
        },
    },
}
</script>