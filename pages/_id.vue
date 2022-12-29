<template>
  <div class="create-account">
    <div class="form-create-account">
      <form novalidate class="md-layout">
        <md-card class="md-layout-item md-big">
          <md-card-header>
            <div class="md-title">Cập nhật tài khoản</div>
          </md-card-header>

          <md-card-content>
            <div class="list__img">
              <img
                v-if="accountData.gender === genders.MALE"
                src="../assets/images/avatar1.png"
                alt="avatar"
              />
              <img
                v-if="accountData.gender === genders.FEMALE"
                src="../assets/images/avatar-nu-cute.jpg"
                alt="avatar"
              />
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label>Tên tài khoản</label>
                  <md-input
                    v-model="accountData.account"
                    @focusout="accountNotEmptyValidate"
                  />
                </md-field>
                <div class="input__error">{{ error.account }}</div>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label>Tên</label>
                  <md-input
                    v-model="accountData.name"
                    @focusout="nameNotEmptyValidate"
                  />
                </md-field>
                <div class="input__error">{{ error.name }}</div>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-datepicker v-model="accountData.dob">
                  <label>Ngày sinh</label>
                </md-datepicker>
              </div>
            </div>
            <div class="md-layout">
              <div class="gender__layout">
                <label class="gender__label">Giới tính:</label>
                <div class="md-layout-item md-small-size-100">
                  <md-radio
                    v-model="accountData.gender"
                    :value="genders.MALE"
                    class="md-primary gender"
                    >Nam</md-radio
                  >
                  <md-radio
                    v-model="accountData.gender"
                    :value="genders.FEMALE"
                    class="md-primary gender"
                    >Nữ</md-radio
                  >
                </div>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label>Địa chỉ</label>
                  <md-input
                    v-model="accountData.address"
                    @focusout="addressNotEmptyValidate"
                  />
                </md-field>
                <div class="input__error">{{ error.address }}</div>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label>Email</label>
                  <md-input
                    v-model="accountData.email"
                    @focusout="emailNotEmptyValidate"
                  />
                </md-field>
                <div class="input__error">{{ error.email }}</div>
              </div>
            </div>
          </md-card-content>

          <md-card-actions>
            <div class="btn">
              <a href="/"
                ><md-button class="md-raised md-accent cancel"
                  >Hủy</md-button
                ></a
              >
              <a href="/">
                <md-button
                  class="md-raised md-primary save"
                  :disabled="!isValid"
                  >Lưu</md-button
                >
              </a>
            </div>
          </md-card-actions>
        </md-card>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AccountErrorInterface } from '~/types/AccountError.Interface';
import { getAccountDetailById } from '~/data/accounts';
import Genders from '~/untils/enums/Genders';
import {
  regexAccount,
  regexAddress,
  regexEmail,
  regexName,
} from '~/untils/validate';

export default Vue.extend({
  name: 'UpdateAccount',

  data() {
    return {
      accountData: {
        account: '',
        name: '',
        dob: '',
        gender: Genders.MALE,
        address: '',
        email: '',
      },
      error: {
        account: '',
        name: '',
        dob: '',
        gender: '',
        address: '',
        email: '',
      } as AccountErrorInterface,
    };
  },

  computed: {
    genders(): any {
      return Genders;
    },
    id(): number {
      return Number(this.$route.params.id ?? 0);
    },
    isValid(): boolean {
      return !!(
        this.isValidated &&
        this.accountData.account &&
        this.accountData.name &&
        this.accountData.dob &&
        this.accountData.gender &&
        this.accountData.address &&
        this.accountData.email &&
        !this.error.account &&
        !this.error.name &&
        !this.error.dob &&
        !this.error.gender &&
        !this.error.address &&
        !this.error.email
      );
    },

    isValidated(): boolean {
      return (
        this.accountData.account !== '' &&
        this.accountData.name !== '' &&
        this.accountData.dob != null &&
        this.accountData.address !== '' &&
        this.accountData.email !== ''
      );
    },
  },

  created() {
    const accountFromId = this.getAccountDetailById(this.id);
    if (accountFromId) {
      this.accountData = accountFromId;
    }
  },

  methods: {
    getAccountDetailById,
    accountNotEmptyValidate() {
      if (!this.accountData.account.trim()) {
        this.error.account = 'Tên tài khoản không được bỏ trống.';
      } else {
        const isValid = regexAccount.test(this.accountData.account);
        this.error.account = !isValid ? 'Tài khoản không hợp lệ.' : '';
      }
    },

    nameNotEmptyValidate() {
      if (!this.accountData.name.trim()) {
        this.error.name = 'Tên không được bỏ trống.';
      } else {
        const isValid = regexName.test(this.accountData.name);
        this.error.name = !isValid ? 'Tên không hợp lệ.' : '';
      }
    },

    addressNotEmptyValidate() {
      if (!this.accountData.address.trim()) {
        this.error.address = 'Địa chỉ không được bỏ trống.';
      } else {
        const isValid = regexAddress.test(this.accountData.address);
        this.error.address = !isValid ? 'Địa chỉ không hợp lệ.' : '';
      }
    },

    emailNotEmptyValidate() {
      if (!this.accountData.email.trim()) {
        this.error.email = 'Email không được bỏ trống.';
      } else {
        const isValid = regexEmail.test(this.accountData.email);
        this.error.email = !isValid ? 'Email không hợp lệ.' : '';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.form-create-account {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 600px;
}

.md-title {
  text-align: center;
}

.btn {
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.input__error {
  color: red;
}

.md-layout {
  width: 100%;
  padding: 0 30px;

  .md-title {
    font-weight: 700;
  }

  .gender__layout {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .gender__label {
      font-size: 16px;
      color: #757575;
    }

    .gender {
      color: #757575;
    }
  }
}

.md-radio.md-theme-default .md-radio-container {
  border-color: #c8c8c8;
}

.list__img {
  background-color: white;
  border-radius: 999px;
  width: 120px;
  height: 120px;
  overflow: hidden;
  object-fit: cover;
  display: block;
  margin: auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
