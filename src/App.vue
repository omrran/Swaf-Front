<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app fixed>
      <v-list dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          @click="navigateTo(item.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Swaf Tech</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      drawer: true,
      menuItems: [
        { title: "List Products", icon: "mdi-home", route: "/list-products" },
        {
          title: "List Orders",
          icon: "mdi-information",
          route: "/list-orders",
        },
        // Add more menu items as needed
      ],
    };
  },
  methods: {
    navigateTo(route) {
      // Perform navigation logic here
      // For example, using Vue Router:
      this.$router.push(route);
    },
  },
};
</script>
