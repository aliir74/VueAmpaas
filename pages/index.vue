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
      <v-container fill-height>
        <v-layout row wrap>
          <v-flex xs3 mb-2>
            <v-card light @click="showModal(0)" role="button">
              <bar-chart :chart-data="groups[0]" :update="update" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(1)" role="button">
              <bar-chart :chart-data="groups[1]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(2)" role="button">
              <bar-chart :chart-data="groups[2]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(3)" role="button">
              <bar-chart :chart-data="groups[3]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(4)" role="button">
              <bar-chart :chart-data="groups[4]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(5)" role="button">
              <bar-chart :chart-data="groups[5]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(6)" role="button">
              <bar-chart :chart-data="groups[6]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(7)" role="button">
              <bar-chart :chart-data="groups[7]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" persistent width="450px">
          <v-card light>
            <bar-chart :chart-data="modalChartData" :update="updateModal" :options="modalOptions"></bar-chart>
            <v-card-actions light>
              <v-spacer></v-spacer>
              <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import barChart from '~/components/barChart'

  export default {
    data () {
      return {
        options: {
          animation: {easing: 'easeOutBounce'},
          scales: {
            xAxes: [{
              barPercentage: 1
            }],
            yAxes: [{
              gridLines: {
                display: true
              },
              display: true,
              ticks: {
                suggestedMin: 0,
                suggestedMax: 100
              }
            }]
          }
        },
        modalOptions: {
          animation: false,
          scales: {
            xAxes: [{
              barPercentage: 1
            }],
            yAxes: [{
              gridLines: {
                display: true
              },
              display: true,
              ticks: {
                suggestedMin: 0,
                suggestedMax: 100
              }
            }]
          }
        },
        test: true,
        drawer: null,
        items: [
          { title: 'نمایش نمودارها', icon: 'dashboard' },
          { title: 'اضافه کردن کارت', icon: 'question_answer' }
        ],
        mini: false,
        right: null,
        groups: [
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران'],
            datasets: [
              {
                label: 'گروه ۱',
                backgroundColor: 'red',
                data: [1, 2, 3, 4, 5, 6, 10]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران'],
            datasets: [
              {
                label: 'گروه ۲',
                backgroundColor: 'blue',
                data: [1, 2, 3, 4, 5, 6, 10]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران'],
            datasets: [
              {
                label: 'گروه ۳',
                backgroundColor: 'green',
                data: [1, 2, 3, 4, 5, 6, 10]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران'],
            datasets: [
              {
                label: 'گروه ۴',
                backgroundColor: 'black',
                data: [1, 2, 3, 4, 5, 6, 10]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران'],
            datasets: [
              {
                label: 'گروه ۵',
                backgroundColor: 'yellow',
                data: [1, 2, 3, 4, 5, 6, 10]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران'],
            datasets: [
              {
                label: 'گروه ۶',
                backgroundColor: '',
                data: [1, 2, 3, 4, 5, 6, 10]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران'],
            datasets: [
              {
                label: 'گروه ۷',
                backgroundColor: 'orange',
                data: [1, 2, 3, 4, 5, 6, 10]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران'],
            datasets: [
              {
                label: 'گروه ۸',
                backgroundColor: 'purple',
                data: [1, 2, 3, 4, 5, 6, 10]
              }
            ]
          }
        ],
        update: false,
        dialog: false,
        modalChartData: null,
        updateModal: false
      }
    },
    components: {
      barChart
    },
    methods: {
      testFunc: function () {
        this.groups[0].datasets[0].data[0] += 10
        this.update = !this.update
        console.log(this.$children)
      },
      showModal: function (x) {
        console.log('hello')
        this.modalChartData = this.groups[x]
        this.updateModal = !this.updateModal
        this.dialog = !this.dialog
      }
    }
  }
</script>

<style>
</style>
