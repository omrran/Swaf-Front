<template>
  <div class="pa-5">
    <h2>Update Product</h2>
    <v-text-field
      v-model="ProductName"
      label="Product Name"
      placeholder="Type something..."
      outlined
      clearable
      maxlength="50"
    ></v-text-field>

    <v-select
      v-model="SupplierId"
      :items="Suppliers.map((sup) => sup.id)"
      label="Supplier"
      outlined
    ></v-select>

    <v-text-field
      v-model="UnitPrice"
      label="Unit Price"
      type="number"
      step="0.01"
      outlined
    ></v-text-field>

    <v-btn depressed color="primary" class="mx-1" @click="UpdateProduct">
      Update
    </v-btn>
    <v-btn
      depressed
      color="secondary"
      @click="
        () => {
          this.$router.push('/list-products');
        }
      "
    >
      Cancel
    </v-btn>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "UpdateProduct",

  data() {
    return {
      ProductName: "",
      SupplierId: null,
      UnitPrice: null,
      Suppliers: [],
    };
  },
  methods: {
    UpdateProduct() {
      console.log("create new product");
      Axios.put(`http://127.0.0.1:8000/api/products/${this.$route.params.id}`, {
        ProductName: this.ProductName,
        SupplierId: this.SupplierId,
        UnitPrice: this.UnitPrice,
      })
        .then((response) => {
          // Handle the response
          console.log(response.data);
          this.$router.push("/list-products");
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    },
  },
  created() {
    Axios.get(
      `http://127.0.0.1:8000/api/products/${this.$route.params.id}`
    ).then((resp) => {
      this.ProductName = resp.data.ProductName;
      this.SupplierId = resp.data.SupplierId;
      this.UnitPrice = resp.data.UnitPrice;
    });
    Axios.get("http://127.0.0.1:8000/api/suppliers").then((resp) => {
      this.Suppliers = resp.data;
      console.log(resp.data);
    });
  },
};
</script>
