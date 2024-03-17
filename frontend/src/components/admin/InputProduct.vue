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
                    <Form @submit="submitProduct" :validation-schema="productFormSchema">
                        <div class="row">
                            <div class="col-lg-6 form-group">
                                <label for="name">Tên sản phẩm</label>
                                <Field class="form-control" name="name" v-model="productLocal.name" type="text"
                                    label="Tên sản phẩm" />
                                <ErrorMessage class="error-feedback" name="name" />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="category">Loại sản phẩm</label>
                                <Field class="form-control " name="category" v-model="productLocal.category" as="select"
                                    label="Loại sản phẩm">
                                    <option value="Shirt">Áo</option>
                                    <option value="Pant">Quần</option>
                                    <option value="Other">Khác</option>
                                </Field>
                                <ErrorMessage class="error-feedback" name="category" />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="price">Giá</label>
                                <Field class="form-control" name="price" v-model.number="productLocal.price" type="number"
                                    label="Giá sản phẩm" />
                                <ErrorMessage class="error-feedback" name="price" />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="inventory">Số lượng</label>

                                <Field class="form-control" name="inventory" v-model.number="productLocal.inventory"
                                    type="number" label="Số lượng" />
                                <ErrorMessage class="error-feedback" name="inventory" />
                            </div>

                            <div class=" col-12 form-group">
                                <label for="imgURL">Link ảnh</label>
                                <Field class="form-control" name="imgURL" v-model="productLocal.imgURL" type="text"
                                    label="Link ảnh" />
                                <ErrorMessage class="error-feedback" name="imgURL" />
                            </div>

                            <div class="col-12 form-group">
                                <label for="description">Mô tả</label>
                                <Field class="form-control" name="description" as="textarea" rows="5"
                                    v-model="productLocal.description" label="Mô tả" />
                                <ErrorMessage class="error-feedback" name="description" />
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

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ['submit:product'],
    props: {
        product: { type: Object, required: true },
        modalId: { type: String, required: true },
        title: { type: String, required: true }
    },
    watch: {
        product: {
            handler(newVal) {
                this.productLocal = { ...newVal };
            },
            deep: true
        }
    },
    data() {
        return {
            productLocal: { ...this.product },
            productFormSchema: yup.object().shape({
                name: yup.string().required('Tên phải có giá trị.').min(2, 'Tên phải ít nhất 2 ký tự.').max(50, 'Tên có nhiều nhất 50 ký tự.'),
                category: yup.string().required('Loại sản phẩm là bắt buộc.'),
                price: yup.number(),
                inventory: yup.number().min(1, "Số lượng tối thiểu là 1.").max(999, 'Không thể vượt quá 999.'),
                description: yup.string().max(1000, 'Mô tả tối đa 1000 ký tự.'),
                imgURL: yup.string().required('Link ảnh là bắt buộc.').matches(/\.(jpg|jpeg|png)$/, 'Link ảnh phải có định dạng hợp lệ (jpg, jpeg, png).'),
            }),
        };
    },
    methods: {
        submitProduct() {
            this.$emit('submit:product', this.productLocal);
            this.$emit('close');
        },
    },

};
</script>
  