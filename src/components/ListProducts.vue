<template>
  <div class="pa-5">
    <v-btn
      depressed
      color="primary"
      @click="
        () => {
          this.$router.push('/create-product');
        }
      "
    >
      Add New
    </v-btn>
    <v-simple-table class="mx-5">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Product Name</th>
            <th class="text-left">Supplier Id</th>
            <th class="text-left">Unit Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.ProductName">
            <td>{{ item.ProductName }}</td>
            <td>{{ item.SupplierId }}</td>
            <td>{{ item.UnitPrice }}</td>
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
              <v-btn small color="red" dark @click="deleteProduct(item.id)">
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
  name: "ListProducts",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    deleteProduct(id) {
      Axios.delete(`http://127.0.0.1:8000/api/products/${id}`).then((resp) => {
        console.log(resp.data);
      });
    },
    goToUpdatingPage(id) {
      this.$router.push(`/update-product/${id}`);
    },
  },
  created() {
    console.log("created ");
    Axios.get("http://127.0.0.1:8000/api/products").then((resp) => {
      this.products = resp.data;
      console.log(resp.data);
    });
  },
};
</script>
