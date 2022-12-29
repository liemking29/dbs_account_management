<template>
  <div class="_home-page">
    <div class="header">
      <div class="header__title">Dach sánh tài khoản</div>
      <div class="btn__add-user">
        <md-button class="md-raised md-primary" to="/create-account"
          >Thêm tài khoản</md-button
        >
      </div>
    </div>
    <div class="search-switch__container">
      <div>
        <input
          v-model="search"
          class="search__user"
          type="search"
          placeholder="Tìm kiếm"
        />
      </div>
      <div>
        <md-switch v-model="isListMode" class="md-primary"
          ><span v-if="!isListMode" class="toggle_switch">Card</span
          ><span v-if="isListMode" class="toggle_switch">List</span></md-switch
        >
      </div>
    </div>
    <div class="content">
      <div v-if="!isListMode">
        <div>
          <draggable
            v-model="accountList"
            class="content__user-card"
            ghost-class="ghost"
            @start="drag = true"
            @end="drag = false"
          >
            <div v-for="account in accountList" :key="account.id">
              <UserCard v-if="account" :data="account" @onConfirm="onDelete" />
            </div>
          </draggable>
        </div>
      </div>
      <div v-if="isListMode" class="content__user-list">
        <div class="user__list-title">
          <div class="list__name"><div>Name</div></div>
          <div class="title__list--container">
            <div class="list__email">Email</div>
            <div class="list__date">Ngày sinh</div>
            <div class="list__gender">Giới tính</div>
            <div class="list__address">Địa chỉ</div>
            <div class=""></div>
          </div>
        </div>
        <div>
          <draggable
            v-model="accountList"
            group="people"
            ghost-class="ghost"
            @start="drag = true"
            @end="drag = false"
          >
            <div v-for="account in accountList" :key="account.id">
              <UserList v-if="account" :data="account" @onConfirm="onDelete" />
            </div>
          </draggable>
        </div>
      </div>
      <div><Pagination :page="page" @change-page="onChangePage" /></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable';
import UserCard from '~/components/UserCard.vue';
import Pagination from '~/components/Pagination.vue';
import UserList from '~/components/UserList.vue';
import { accounts } from '~/data/accounts';
import { AccountInterface } from '~/types/Account.Interface';

export default Vue.extend({
  name: 'HomePage',

  components: { UserList, Pagination, UserCard, draggable },

  data() {
    return {
      accounts,
      isListMode: false,
      page: 1,
      search: '',
    };
  },

  computed: {
    accountList: {
      get(): AccountInterface[] {
        return this.accounts.filter((account: AccountInterface) => {
          return (
            (account.name.toLowerCase().includes(this.search.toLowerCase()) ||
              account.address
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              account.email.toLowerCase().includes(this.search.toLowerCase()) ||
              account.account
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              account.dob.toLowerCase().includes(this.search.toLowerCase())) &&
            !account.isDeleted
          );
        });
      },

      set(value: AccountInterface[]) {
        this.accounts = value;
      },
    },
  },

  watch: {
    page(value) {
      if (value) {
        this.$router.push({
          query: {
            page: value,
          },
        });
      }
    },
  },

  methods: {
    onChangePage(page: number) {
      this.page = page;
    },

    onDelete(id: number | string) {
      const acc = this.accounts.find(
        (account) => Number(account.id) === Number(id)
      );

      if (acc) {
        acc.isDeleted = true;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
._home-page {
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header__title {
      font-size: 20px;
      font-weight: 700;
    }
  }
}

.content {
  margin-top: 40px;

  .content__user-card {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 50px;
  }

  .content__user-list {
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
  }
}

.user__list-title {
  color: #757575;
  display: flex;
  align-items: center;
  border-top: solid 1px rgb(249 250 251);
  border-left: solid 1px rgb(249 250 251);
  border-right: solid 1px rgb(249 250 251);
  background-color: rgb(249 250 251);
  padding: 15px 40px;

  .user__list--container {
    width: 100%;
    display: flex;
    align-items: center;
  }
}

.list__name {
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

.title__list--container {
  width: 100%;
  display: flex;
  align-items: center;
}

.search-switch__container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 60px;

  .search__user {
    border-radius: 4px;
    opacity: 0.6;
    border: solid 1px #c8c8c8;
    padding-left: 10px;
    width: 240px;
    height: 40px;
    outline: none;
  }
}
</style>
