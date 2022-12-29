<template>
  <div class="user__card">
    <div class="card__avatar">
      <div class="card__img">
        <img
          v-if="data.gender === genders.MALE"
          src="../assets/images/avatar1.png"
          alt="avatar"
        />
        <img
          v-if="data.gender === genders.FEMALE"
          src="../assets/images/avatar-nu-cute.jpg"
          alt="avatar"
        />
      </div>
    </div>
    <div class="card__content">
      <div class="card__name">{{ data.name }}</div>
      <div class="card__account">
        <i>( {{ data.account }} )</i>
      </div>
      <div class="card__date">{{ data.dob }}</div>
      <div class="card__email">{{ data.email }}</div>
      <div class="card__address">{{ data.address }}</div>
    </div>
    <div>
      <md-button href class="md-accent" @click="active = true">Xóa</md-button>
      <md-button :to="`/${data.id}`" class="md-primary">Cập nhật</md-button>
    </div>
    <div>
      <md-dialog-confirm
        :md-active.sync="active"
        md-title="Bạn có muốn xóa?"
        md-content="Khi bạn xóa thì nó sẽ mất hết dữ liệu, không biết bạn đã chắc chắn muốn xóa chưa?<br>Nếu chưa thì bạn hãy bấm vào nút <strong>đóng</strong>."
        md-confirm-text="Đồng ý"
        md-cancel-text="Đóng"
        @md-cancel="onCancel"
        @md-confirm="onConfirm"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Genders from '~/untils/enums/Genders';

export default Vue.extend({
  name: 'UserCard',

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    active: false,
  }),

  computed: {
    genders() {
      return Genders;
    },
  },
  methods: {
    onConfirm() {
      this.$emit('onConfirm', this.data.id);
    },
    onCancel() {
      this.active = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.user__card {
  padding: 40px 40px 20px 40px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: fit-content;
  border: solid 1px #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .card__avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    .card__img {
      background-color: white;
      border-radius: 999px;
      width: 50px;
      height: 50px;
      overflow: hidden;
      object-fit: cover;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .card__content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: center;
    color: #9e9e9e;

    .card__name {
      font-size: 20px;
      font-weight: 500;
      color: #151515;
    }
  }
}
</style>
