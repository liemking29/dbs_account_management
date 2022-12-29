<template>
  <div class="user__list">
    <div class="list__avatar">
      <div class="list__img">
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
      <div>
        <div class="list__name">{{ data.name }}</div>
        <div class="list__account">{{ data.account }}</div>
      </div>
    </div>
    <div class="user__list--container">
      <div class="list__email">{{ data.email }}</div>
      <div class="list__date">{{ data.dob }}</div>
      <div class="list__gender">
        {{ data.gender === genders.MALE ? 'Male' : 'Female' }}
      </div>
      <div class="list__address">{{ data.address }}</div>
      <div class="list__btn">
        <md-button href class="md-accent" @click="active = true">Xóa</md-button>
        <md-button :to="`/${data.id}`" class="md-primary">Cập nhật</md-button>
      </div>
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
  name: 'UserList',

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
.user__list {
  display: flex;
  align-items: center;
  border-top: solid 1px #e8e8e8;
  border-left: solid 1px #e8e8e8;
  border-right: solid 1px #e8e8e8;
  padding: 10px 40px;

  &:last-child {
    border-bottom: solid 1px #e8e8e8;
  }

  .list__img {
    background-color: white;
    border-radius: 999px;
    width: 45px;
    height: 45px;
    overflow: hidden;
    object-fit: cover;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .list__account {
    color: #9e9e9e;
  }

  .list__name {
    font-weight: 500;
  }

  .list__avatar {
    width: 25%;
  }

  .list__email {
    width: 20%;
  }

  .list__date {
    width: 20%;
  }

  .list__gender {
    width: 10%;
  }

  .list__address {
    width: 25%;
  }

  .user__list--container {
    width: 100%;
    display: flex;
    align-items: center;
    color: #9e9e9e;
  }
}

.list__avatar {
  width: 25%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}
</style>
