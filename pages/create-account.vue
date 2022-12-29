<template>
  <div class="create-account">
    <div class="form-create-account">
      <form novalidate class="md-layout">
        <md-card class="md-layout-item md-big">
          <md-card-header>
            <div class="md-title">Tạo tài khoản</div>
          </md-card-header>

          <md-card-content>
            <div class="list__img">
              <img
                v-if="gender === genders.MALE"
                src="../assets/images/avatar1.png"
                alt="avatar"
              />
              <img
                v-if="gender === genders.FEMALE"
                src="../assets/images/avatar-nu-cute.jpg"
                alt="avatar"
              />
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label>Tên tài khoản</label>
                  <md-input
                    v-model="account"
                    autocomplete="given-name"
                    @focusout="validateAccount"
                  />
                </md-field>
                <div class="input__error">{{ error.account }}</div>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label>Tên</label>
                  <md-input v-model="name" @focusout="validateName" />
                </md-field>
                <div class="input__error">{{ error.name }}</div>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100">
                <md-datepicker
                  v-model="dob"
                  @md-closed="datePickerClosed"
                  @md-open="datePickerOpen"
                >
                  <label>Ngày sinh</label>
                </md-datepicker>
                <div class="input__error">{{ error.dob }}</div>
              </div>
            </div>
            <div class="md-layout">
              <div class="gender__layout">
                <label class="gender__label">Giới tính:</label>
                <div class="md-layout-item md-small-size-100">
                  <md-radio
                    v-model="gender"
                    :value="genders.MALE"
                    class="md-primary gender"
                    >Nam</md-radio
                  >
                  <md-radio
                    v-model="gender"
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
                    v-model="address"
                    autocomplete="given-name"
                    @focusout="validateAddress"
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
                    v-model="email"
                    autocomplete="given-name"
                    @focusout="validateEmail"
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
              <md-button
                class="md-raised md-primary save"
                :disabled="!isValid"
                @click="submit"
                >Lưu</md-button
              >
            </div>
          </md-card-actions>
        </md-card>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  regexAccount,
  regexAddress,
  regexEmail,
  regexName,
} from '~/untils/validate';
import { AccountErrorInterface } from '~/types/AccountError.Interface';
import Genders from '~/untils/enums/Genders';

export default Vue.extend({
  name: 'CreateAccount',
  data() {
    return {
      account: '',
      name: '',
      dob: null,
      gender: Genders.MALE,
      address: '',
      email: '',
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

    isValid(): boolean {
      return (
        this.isValidated &&
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
        this.account !== '' &&
        this.name !== '' &&
        this.dob !== null &&
        this.address !== '' &&
        this.email !== ''
      );
    },
  },

  watch: {
    account: {
      handler(value) {
        if (value.trim()) {
          this.error.account = '';
        } else {
          this.error.account = 'Tên tài khoản không được bỏ trống.';
        }
      },
    },

    name: {
      handler(value) {
        if (value.trim()) {
          this.error.name = '';
        } else {
          this.error.name = 'Tên không được bỏ trống.';
        }
      },
    },

    address: {
      handler(value) {
        if (value.trim()) {
          this.error.name = '';
        } else {
          this.error.name = 'Địa chỉ không được bỏ trống.';
        }
      },
    },

    email: {
      handler(value) {
        if (value.trim()) {
          this.error.name = '';
        } else {
          this.error.name = 'Email không được bỏ trống.';
        }
      },
    },
  },
  methods: {
    submit() {
      return this.$router.push('/');
    },

    validateAccount() {
      if (!this.account.trim()) {
        this.error.account = 'Tên tài khoản không được bỏ trống.';
      } else {
        const isValid = regexAccount.test(this.account);
        this.error.account = !isValid ? 'Tài khoản không hợp lệ.' : '';
      }
    },

    validateName() {
      if (!this.name.trim()) {
        this.error.name = 'Tên không được bỏ trống.';
      } else {
        const isValid = regexName.test(this.name);
        this.error.name = !isValid ? 'Tên không hợp lệ.' : '';
      }
    },

    validateAddress() {
      if (!this.address.trim()) {
        this.error.address = 'Địa chỉ không được bỏ trống.';
      } else {
        const isValid = regexAddress.test(this.address);
        this.error.address = !isValid ? 'Địa chỉ không hợp lệ.' : '';
      }
    },

    validateEmail() {
      if (!this.email.trim()) {
        this.error.email = 'Email không được bỏ trống.';
      } else {
        const isValid = regexEmail.test(this.email);
        this.error.email = !isValid ? 'Email không hợp lệ.' : '';
      }
    },

    datePickerClosed() {
      if (this.dob) {
        this.error.dob = '';
      } else {
        this.error.dob = 'Ngày sinh không được bỏ trống.';
      }
    },git remote add origin https://github.com/liemking29/dbs_account_management.git

    datePickerOpen() {
      this.error.dob = '';
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
