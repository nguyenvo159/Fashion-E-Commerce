<template>
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    {{ message }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary" @click="confirmAction(idToDelete)"
                        data-dismiss="modal">Xác nhận </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        modalId: { type: String, required: true },
        title: { type: String, default: "Thông báo" },
        message: { type: String, required: true },
        confirmAction: { type: Function, required: true },
        idToDelete: { type: String },
    }
};
</script>
  
<style scoped></style>