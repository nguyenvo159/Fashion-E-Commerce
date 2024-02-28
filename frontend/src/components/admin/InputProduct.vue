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
                    <!-- <Form @submit="submitProduct" :validation-schema="productFormSchema">
                        <div class="form-group">
                            <label for="name">Tên sản phẩm</label>
                            <Field name="name" type="text" class="form-control" v-model="productLocal.name" />
                            <ErrorMessage name="name" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <label for="category">Loại sản phẩm</label>
                            <Field name="category" as="select" class="form-control" v-model="productLocal.category">
                                <option value="" disabled hidden>Chọn loại sản phẩm</option>
                                <option value="Shirt">Áo</option>
                                <option value="Pant">Quần</option>
                                <option value="Other">Khác</option>
                            </Field>
                            <ErrorMessage name="category" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <label for="price">Giá</label>
                            <Field name="price" type="number" class="form-control" v-model="productLocal.price" />
                            <ErrorMessage name="price" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <label for="inventory">Số lượng</label>
                            <Field name="inventory" type="number" class="form-control" v-model="productLocal.inventory" />
                            <ErrorMessage name="inventory" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <label for="imgURL">Link ảnh</label>
                            <Field name="imgURL" type="text" class="form-control" v-model="productLocal.imgURL" />
                            <ErrorMessage name="imgURL" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="description">Mô tả</label>
                            <Field name="description" as="textarea" class="form-control"
                                v-model="productLocal.description" />
                            <ErrorMessage name="description" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <button class="btn btn-primary">Lưu</button>

                        </div>
                    </Form> -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:product"],
    props: {
        product: { type: Object, required: true },
        modalId: { type: String, required: true },
        title: { type: String, required: true }
    },

    data() {
        const productFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            category: yup
                .string()
                .required("Loại sản phẩm là bắt buộc."),
            price: yup
                .number(),
            inventory: yup
                .number()
                .max(999, "Không thể vượt quá 999."),

            description: yup.string().max(1000, "Địa chỉ tối đa 1000 ký tự."),
            imgURL: yup
                .string()
                .required("Link ảnh là bắt buộc.")
                .matches(/\.(jpg|jpeg|png)$/, "Link ảnh phải có định dạng hợp lệ (jpg, jpeg, png)."),
        });
        return {
            productLocal: this.product,
            productFormSchema,

        };
    },
    methods: {
        submitProduct() {
            this.$emit("submit:product", this.productLocal);
        },

    },

};
</script>                                 