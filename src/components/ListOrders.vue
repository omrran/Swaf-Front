<template>
  <div class="pa-5">
    <v-btn
      depressed
      color="primary"
      @click="
        () => {
          this.$router.push('/add-order');
        }
      "
    >
      Add New
    </v-btn>
    <v-simple-table class="mx-5">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Number</th>
            <th class="text-left">Customer</th>
            <th class="text-left">Date</th>
            <th class="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.OrderNumber">
            <td>{{ item.OrderNumber }}</td>
            <td>{{ item.CustomerId }}</td>
            <td>{{ item.OrderDate }}</td>
            <td>{{ item.TotalAmount }}</td>
            <td>
              <v-btn
                small
                color="green"
                dark
                class="mr-1"
                @click="goToUpdatingPage(item.id)"
              >
                modify
              </v-btn>
              <v-btn small color="red" dark @click="deleteOrder(item.id)">
                delete
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "ListOrders",
  data() {
    return {
      orders: null,
    };
  },
  methods: {
    deleteOrder(id) {
      Axios.delete(`http://127.0.0.1:8000/api/orders/${id}`).then((resp) => {
        console.log(resp.data);
      });
    },
    goToUpdatingPage(id) {
      this.$router.push(`/update-order/${id}`);
    },
  },
  created() {
    console.log("created ");
    Axios.get("http://127.0.0.1:8000/api/orders").then((resp) => {
      this.orders = resp.data;
      console.log(resp.data);
    });
  },
};
</script>
