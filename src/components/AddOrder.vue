<template>
  <div class="pa-5">
    <h2>Create New Order</h2>
    <v-row>
      <v-col col-8>
        <v-text-field
          v-model="OrderNumber"
          label="Order Number"
          type="number"
          step="1"
          outlined
        ></v-text-field>
      </v-col>

      <v-col col-4>
        <v-select
          v-model="CustomerId"
          :items="Customers.map((sup) => sup.id)"
          label="Customer"
          outlined
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <!-- here OrderDate Date -->
        Order Date
        <v-date-picker v-model="OrderDateDate"></v-date-picker>
      </v-col>
      <v-col>
        <!-- here OrderDate Time -->
        Order Time
        <v-time-picker v-model="OrderDateTime" ampm-in-title></v-time-picker>
      </v-col>
    </v-row>

    <v-text-field
      v-model="TotalAmount"
      label="Total Amount"
      type="number"
      step="1"
      outlined
    ></v-text-field>
    <!--ccccccccccccccccccccccccccccccccccccccccc  -->

    <h3>Order Items</h3>
    <v-row>
      <v-col>
        <v-select
          v-model="ProductId"
          :items="Products.map((sup) => sup.id)"
          label="Product"
          outlined
        ></v-select>
      </v-col>
      <v-col>
        <v-text-field
          v-model="UnitPrice"
          label="Unit Price"
          type="number"
          step="0.01"
          outlined
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="Quantity"
          label="Quantity"
          type="number"
          step="1"
          outlined
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn depressed color="primary" class="mx-1" @click="addOrderItem">
          Add Order Item
        </v-btn>
      </v-col>
    </v-row>

    <v-simple-table class="mx-5">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Product Id</th>
            <th class="text-left">Unit Price</th>
            <th class="text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orderItems" :key="index">
            <td>{{ item.ProductId }}</td>
            <td>{{ item.UnitPrice }}</td>
            <td>{{ item.Quantity }}</td>
            <td>
              <v-btn small color="red" dark @click="deleteOrderItem(index)">
                deletee
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-btn depressed color="primary" class="mx-1" @click="saveNewOrder">
      Save
    </v-btn>
    <v-btn
      depressed
      color="secondary"
      @click="
        () => {
          this.$router.push('/list-orders');
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
  name: "AddOrder",

  data() {
    return {
      OrderNumber: "",
      CustomerId: "",
      Customers: [], //to save all customer from api and use it in select
      OrderDateDate: "",
      OrderDateTime: "",
      TotalAmount: "",
      ProductId: "",
      Products: [], //to save all customer from api and use it in select
      UnitPrice: "",
      Quantity: "",
      orderItems: [],
      picker: null,
    };
  },
  computed: {
    CompleteOrderDate() {
      return `${this.OrderDateDate} ${this.OrderDateTime}`;
    },
  },
  methods: {
    saveNewOrder() {
      console.log("create new order");
      Axios.post("http://127.0.0.1:8000/api/orders", {
        OrderDate: this.CompleteOrderDate,
        OrderNumber: this.OrderNumber,
        CustomerId: this.CustomerId,
        TotalAmount: this.TotalAmount,
      }).then((response) => {
        // Handle the response
        console.log(response.data);
        //////////////////////////
        this.orderItems
          .forEach((item) => {
            Axios.post("http://127.0.0.1:8000/api/orders-items", {
              ProductId: item.ProductId,
              OrderId: response.data,
              UnitPrice: item.UnitPrice,
              Quantity: item.Quantity,
            })
              .then((response) => {
                // Handle the response
                console.log(response.data);
              })
              .catch((error) => {
                // Handle the error
                console.error(error);
              });

            ////////////////////////
            // this.$router.push("/list-products");
          })
          .catch((error) => {
            // Handle the error
            console.error(error);
          });
      });
    },
    addOrderItem() {
      this.orderItems.push({
        ProductId: this.ProductId,
        UnitPrice: this.UnitPrice,
        Quantity: this.Quantity,
      });
      console.log(this.orderItems);
    },
    deleteOrderItem(index) {
      this.orderItems.splice(index, 1);
    },
  },
  created() {
    //get all Customers
    Axios.get("http://127.0.0.1:8000/api/customers").then((resp) => {
      this.Customers = resp.data;
      console.log(resp.data);
    });

    //get all Products
    Axios.get("http://127.0.0.1:8000/api/products").then((resp) => {
      this.Products = resp.data;
      console.log(resp.data);
    });
  },
};
</script>
