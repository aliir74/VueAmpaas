<template>
  <v-app id="example-8" dark toolbar>
    <main>
      <v-container fill-height>
        <v-layout row wrap>
          <v-flex xs3 ma-0>
            <v-card light @click="showModal(0)" role="button">
              <div class="alert success pa-1 elevation-9" dir="rtl">
                <strong class="ampaas-text">کشور</strong>
              </div>
              <bar-chart :chart-data="groups[0]" :update="update" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(1)" role="button">
              <div class="alert success pa-1 elevation-9" dir="rtl">
                <strong class="ampaas-text">کشور</strong>
              </div>
              <bar-chart :chart-data="groups[1]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(2)" role="button">
              <div class="alert red pa-1 elevation-9" dir="rtl">
                <strong class="ampaas-text">کشور</strong>
              </div>
              <bar-chart :chart-data="groups[2]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(3)" role="button">
              <div class="alert success pa-1 elevation-9" dir="rtl">
                <strong class="ampaas-text">کشور</strong>
              </div>
              <bar-chart :chart-data="groups[3]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(4)" role="button">
              <div class="alert success pa-1 elevation-9" dir="rtl">
                <strong class="ampaas-text">کشور</strong>
              </div>
              <bar-chart :chart-data="groups[4]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(5)" role="button">
              <div class="alert success pa-1 elevation-9" dir="rtl">
                <strong class="ampaas-text">کشور</strong>
              </div>
              <bar-chart :chart-data="groups[5]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(6)" role="button">
              <div class="alert success pa-1 elevation-9" dir="rtl">
                <strong class="ampaas-text">کشور</strong>
              </div>
              <bar-chart :chart-data="groups[6]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card light @click="showModal(7)" role="button">
              <div class="alert success pa-1 elevation-9 border-0" dir="rtl">
                <strong class="ampaas-text">کشور</strong>
              </div>
              <bar-chart :chart-data="groups[7]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs12 mb-2>
            <v-btn fab dark small class="indigo" @click="addProcess()">
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-dialog v-model="dialog" persistent width="450px">
          <v-card light>
            <div class="alert success pa-2 elevation-9 border-0" dir="rtl">
              <strong class="ampaas-text">کشور</strong>
            </div>
            <bar-chart :chart-data="modalChartData" :update="updateModal" :options="modalOptions"></bar-chart>
            <v-card-actions light>
              <v-spacer></v-spacer>
              <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="addProcessDialog" persistent width="450px" dir="rtl">
            <v-card dark>
              <v-card-text dir="rtl">
                <v-container>
                  <v-layout row>
                    <v-flex mr-4>
                      <v-checkbox v-bind:label="'ساخت شاخص جدید'" v-model="newIndicator" dark></v-checkbox>
                    </v-flex>
                    <v-flex mr-4>
                      <v-checkbox v-bind:label="'ذخیره شاخص جدید'" v-model="saveIndicator" dark :disabled="!newIndicator"></v-checkbox>
                    </v-flex>
                  </v-layout>
                  <v-text-field dir="rtl"
                                name="input-1"
                                label="نام شاخص جدید"
                                v-model="indicatorName"
                                :disabled="!newIndicator || !saveIndicator"
                  ></v-text-field>
                  <v-layout row>
                    <v-flex>
                      <v-select
                        v-bind:items="processes"
                        v-model="selectedProcess"
                        label="روند ها"
                        dark
                        item-value="value"
                        :disabled="newIndicator"
                      ></v-select>
                    </v-flex>
                    <v-flex>
                      <v-select
                        v-bind:items="countries"
                        v-model="selectedCountry"
                        label="کشور"
                        dark
                        item-value="value"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <v-expansion-panel>
                    <v-expansion-panel-content>
                      <div slot="header">تغییر آنی</div>
                      <v-card>
                        <v-card-text class="">
                          <v-expansion-panel>
                            <v-expansion-panel-content v-for="(item,i) in indicatorNames" :key="i">
                              <div slot="header">{{item}}</div>
                              <v-card>
                                <v-card-text class="">
                                  <v-container fluid>
                                    <v-layout row>
                                      <v-flex xs2>
                                        <v-text-field dir="ltr" v-model="tmpProcess.immediate[i]" type="number" :disabled="!newIndicator"></v-text-field>
                                      </v-flex>
                                      <v-flex xs10>
                                        <v-slider v-model="tmpProcess.immediate[i]" :step="1" :min="-100" :max="100" :disabled="!newIndicator" snap thumb-label dark></v-slider>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                              </v-card>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                      <div slot="header">تغییر تدریجی</div>
                      <v-card>
                        <v-card-text class="">
                          <v-expansion-panel>
                            <v-expansion-panel-content v-for="(item,i) in indicatorNames" :key="i">
                              <div slot="header">{{item}}</div>
                              <v-card>
                                <v-card-text class="">
                                  <v-container fluid>
                                    <v-layout row>
                                      <v-flex xs2>
                                        <v-text-field :disabled="!newIndicator" dir="ltr" label="زمان شروع" v-model="tmpProcess.gradual[i].startTime" type="number"></v-text-field>
                                      </v-flex>
                                      <v-flex xs2>
                                        <v-text-field :disabled="!newIndicator" dir="ltr" label="دوره زمانی" v-model="tmpProcess.gradual[i].period" type="number"></v-text-field>
                                      </v-flex>
                                      <v-flex xs2>
                                        <v-text-field :disabled="!newIndicator" dir="ltr" label="تکرار" v-model="tmpProcess.gradual[i].repeat" type="number"></v-text-field>
                                      </v-flex>
                                      <v-flex xs2>
                                        <v-text-field :disabled="!newIndicator" dir="ltr" v-model="tmpProcess.gradual[i].value" type="number"></v-text-field>
                                      </v-flex>
                                      <v-flex xs4>
                                        <v-slider :disabled="!newIndicator" v-model="tmpProcess.gradual[i].value" :step="1" :min="-100" :max="100" snap thumb-label dark></v-slider>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                              </v-card>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                </v-container>
              </v-card-text>
              <v-card-actions light>
                <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="saveProcess" :disabled="!newIndicator || (newIndicator && !saveIndicator)">ذخیره</v-btn>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="addProcessDialog = false" :disabled="!newIndicator || (newIndicator && !saveIndicator)">ذخیره و اعمال</v-btn>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="addProcessDialog = false" :disabled="(newIndicator && saveIndicator)">اعمال</v-btn>
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
        newIndicator: true,
        saveIndicator: true,
        test: true,
        testValue: -50,
        drawer: null,
        mini: false,
        right: null,
        indicatorNames: ['نیروهای انتظامی و دفاع', 'مالی و اقتصادی', 'سیاست خارجی و دیپلماسی', 'بهداشت و آموزش', 'دادگستری و اطلاعات', 'کشاورزی و صنعت', 'عمران و آبادانی', 'رضایت اجتماعی'],
        groups: [
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
            datasets: [
              {
                label: 'گروه ۱',
                backgroundColor: 'red',
                data: [1, 2, 3, 4, 5, 6, 10, 20]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
            datasets: [
              {
                label: 'گروه ۲',
                backgroundColor: 'blue',
                data: [1, 2, 3, 4, 5, 6, 10, 20]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
            datasets: [
              {
                label: 'گروه ۳',
                backgroundColor: 'green',
                data: [1, 2, 3, 4, 5, 6, 10, 20]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
            datasets: [
              {
                label: 'گروه ۴',
                backgroundColor: 'black',
                data: [1, 2, 3, 4, 5, 6, 10, 20]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
            datasets: [
              {
                label: 'گروه ۵',
                backgroundColor: 'yellow',
                data: [1, 2, 3, 4, 5, 6, 10, 20]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
            datasets: [
              {
                label: 'گروه ۶',
                backgroundColor: '',
                data: [1, 2, 3, 4, 5, 6, 10, 20]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
            datasets: [
              {
                label: 'گروه ۷',
                backgroundColor: 'orange',
                data: [1, 2, 3, 4, 5, 6, 10, 20]
              }
            ]
          },
          {
            labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
            datasets: [
              {
                label: 'گروه ۸',
                backgroundColor: 'purple',
                data: [1, 2, 3, 4, 5, 6, 10, 20]
              }
            ]
          }
        ],
        countries: [
          {
            name: 'کشور ۱',
            text: 'کشور ۱',
            value: 0,
            indicators: [1, 2, 3, 4, 5, 6, 7, 8],
            processes: []
          },
          {
            name: 'کشور ۲',
            text: 'کشور ۲',
            value: 1,
            indicators: [1, 2, 3, 4, 5, 6, 7, 8],
            processes: []
          },
          {
            name: 'کشور ۳',
            text: 'کشور ۳',
            value: 2,
            indicators: [1, 2, 3, 4, 5, 6, 7, 8],
            processes: []
          },
          {
            name: 'کشور ۴',
            text: 'کشور ۴',
            value: 3,
            indicators: [1, 2, 3, 4, 5, 6, 7, 8],
            processes: []
          },
          {
            name: 'کشور ۵',
            text: 'کشور ۵',
            value: 4,
            indicators: [1, 2, 3, 4, 5, 6, 7, 8],
            processes: []
          },
          {
            name: 'کشور ۶',
            text: 'کشور ۶',
            value: 5,
            indicators: [1, 2, 3, 4, 5, 6, 7, 8],
            processes: []
          },
          {
            name: 'کشور ۷',
            text: 'کشور ۷',
            value: 6,
            indicators: [1, 2, 3, 4, 5, 6, 7, 8],
            processes: []
          },
          {
            name: 'کشور ۸',
            text: 'کشور ۸',
            value: 7,
            indicators: [1, 2, 3, 4, 5, 6, 7, 8],
            processes: []
          }
        ],
        processes: [
          {
            text: 'روند ۱',
            value: 0,
            immediate: [0, 1, 2, 3, 4, 5, 6, 7],
            gradual: [
              {
                value: 1,
                period: 2,
                repeat: 3,
                startTime: 4
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              }
            ]
          },
          {
            text: 'روند ۲',
            value: 1,
            immediate: [0, -1, -2, -3, -4, -5, -6, -7],
            gradual: [
              {
                value: -1,
                period: -2,
                repeat: -3,
                startTime: -4
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              },
              {
                value: 0,
                period: 0,
                repeat: 0,
                startTime: 0
              }
            ]
          }
        ],
        defaultProcess: {
          text: 'دیفالت',
          value: -1,
          immediate: [0, 0, 0, 0, 0, 0, 0, 0],
          gradual: [
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            }
          ]
        },
        tmpProcess: {
          text: 'روند ۲',
          value: 1,
          immediate: [0, -1, -2, -3, -4, -5, -6, -7],
          gradual: [
            {
              value: -1,
              period: -2,
              repeat: -3,
              startTime: -4
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            },
            {
              value: 0,
              period: 0,
              repeat: 0,
              startTime: 0
            }
          ]
        },
        indicatorName: '',
        selectedProcess: -1,
        selectedCountry: 0,
        update: false,
        dialog: false,
        addProcessDialog: true,
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
        this.modalChartData = this.groups[x]
        this.updateModal = !this.updateModal
        this.dialog = !this.dialog
      },
      addProcess: function () {
        this.tmpProcess = JSON.parse(JSON.stringify(this.defaultProcess))
        this.indicatorName = ''
        this.selectedProcess = -1
        this.selectedCountry = 0
        this.addProcessDialog = true
      },
      saveProcess: function () {
        var newobj = JSON.parse(JSON.stringify(this.tmpProcess))
        if (this.indicatorName === '') {
          this.$error('نام شاخص جدید را انتخاب نکرده اید')
          return
        }
        newobj.text = this.indicatorName
        newobj.value = this.processes.length
        this.processes.push(newobj)
        this.addProcessDialog = false
      }
    },
    watch: {
      selectedProcess: function (val) {
        this.tmpProcess = JSON.parse(JSON.stringify(this.processes[val]))
      }
    }
  }
</script>

<style>
  .ampaas-text {
    margin-right: auto !important;
    margin-left: auto !important;
  }

  .red {
    background-color: #ff0709;
  }

  .alert {
    border-width: 0px !important;
  }

  label {
    //direction: rtl !important;
  }

  .input-group label{
    direction: rtl !important;
    text-align: right;
    width: 100%;
    transform-origin: top right;
  }

  .input-group--text-field label{
    //right: 0 !important;
    max-width: 100%;
  }

  .input-group__input {
    direction: rtl !important;
  }

  .expansion-panel__header::after {
    content: "" !important;
  }

  .expansion-panel__header {
    padding-left: 0px !important;
    padding-right: 1rem;
  }
</style>
