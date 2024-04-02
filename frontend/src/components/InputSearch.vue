<template>
    <div id="search-input" class="mb-4 w-50 input-group">
        <!-- <span class="h5 pr-3 m-0 d-flex align-items-center">Tìm kiếm </span> -->

        <input type="text" class="form-control rounded-0" placeholder="Nhập thông tin cần tìm..." :value="modelValue"
            @input="updateModelValue" @keyup.enter="submit" style="box-shadow: none;" />
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="submit">
                <i class="fas fa-search"></i> Tìm
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>