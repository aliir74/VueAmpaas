<template>
  <v-app id="example-8" dark toolbar>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      :mini-variant="mini"
      dark
      overflow
      absolute
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.native.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon light>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid fill-height>
        <v-layout row wrap>
          <v-flex xs3 mb-2>
            <v-card light>
              <bar-chart></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light>
              <bar-chart></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light>
              <bar-chart></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light>
              <bar-chart></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light>
              <bar-chart></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light>
              <bar-chart></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light>
              <bar-chart></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light>
              <bar-chart></bar-chart>
            </v-card>
          </v-flex>

        </v-layout>
        <!--v-router-->
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import barChart from '~/components/barChart'

  export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'نمایش نمودارها', icon: 'dashboard' },
          { title: 'اضافه کردن کارت', icon: 'question_answer' }
        ],
        mini: false,
        right: null
      }
    },
    components: {
      barChart
    }
  }
</script>

<style>
</style>
