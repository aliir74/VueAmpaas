<template>
  <v-app id="example-8" dark toolbar>
    <main>
      <v-container fill-height dir="rtl">
        <v-layout row wrap dir="rtl">
          <v-flex xs3 ma-0 v-for="(item, i) in countries" dir="rtl">
            <v-card light @click="showModal(i)" role="button">
              <div class="alert pa-1 elevation-9" :class="{ 'red': countries[i].ampaas, 'success': !countries[i].ampaas }" dir="rtl">
                <strong class="ampaas-text">{{item.name}}</strong>
              </div>
              <bar-chart :chart-data="countries[i].chartData" :update="update[i]" :options="options"></bar-chart>
            </v-card>
          </v-flex>
          <v-flex xs12 mb-2>
            <v-btn fab dark small class="indigo" @click.native="addProcess">
              <v-icon dark>add</v-icon>
            </v-btn>
            <v-btn fab dark small class="indigo" @click.native="panelDialog = true">
              <v-icon>event</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-dialog v-model="dialog" persistent width="450px">
          <v-card light>
            <div class="alert pa-2 elevation-9 border-0" :class="{ 'red': modalAmpaas, 'success': !modalAmpaas }" dir="rtl">
              <strong class="ampaas-text">{{modalCountryName}}</strong>
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
                      <!--<v-checkbox v-bind:label="'ذخیره شاخص جدید'" v-model="saveIndicator" dark :disabled="!newIndicator"></v-checkbox>-->
                    </v-flex>
                  </v-layout>
                  <v-text-field dir="rtl"
                                name="input-1"
                                label="نام شاخص جدید"
                                v-model="indicatorName"
                                :disabled="!newIndicator"
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
                          <v-flex xs3>
                            <v-text-field :disabled="!newIndicator" dir="ltr" label="دوره زمانی" v-model="tmpProcess.period" type="number"></v-text-field>
                          </v-flex>
                          <v-expansion-panel>
                            <v-expansion-panel-content v-for="(item,i) in indicatorNames" :key="i">
                              <div slot="header">{{item}}</div>
                              <v-card>
                                <v-card-text class="">
                                  <v-container fluid>
                                    <v-layout row>
                                      <v-flex xs3>
                                        <v-text-field :disabled="!newIndicator" dir="ltr" label="تکرار ۲" v-model="tmpProcess.gradual[i].repeat2" type="number"></v-text-field>
                                      </v-flex>
                                      <v-flex xs3>
                                        <v-text-field :disabled="!newIndicator" dir="ltr" label="مقدار ۲" v-model="tmpProcess.gradual[i].value2" type="number"></v-text-field>
                                      </v-flex>
                                      <v-flex xs3>
                                        <v-text-field :disabled="!newIndicator" dir="ltr" label="تکرار ۱" v-model="tmpProcess.gradual[i].repeat1" type="number"></v-text-field>
                                      </v-flex>
                                      <v-flex xs3>
                                        <v-text-field :disabled="!newIndicator" dir="ltr" label="مقدار ۱" v-model="tmpProcess.gradual[i].value1" type="number"></v-text-field>
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
                <v-btn class="blue--text darken-1" flat="flat" @click.native="addProcessDialog = false">انصراف</v-btn>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="saveProcess" :disabled="!newIndicator">ذخیره</v-btn>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="runAndSaveProcess" :disabled="!newIndicator">ذخیره و اعمال</v-btn>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="runProcess(processes[selectedProcess]._id)" :disabled="newIndicator">اعمال</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="panelDialog" persistent width="950px" dir="rtl">
          <v-card dark>
            <v-card-text dir="rtl">
              <v-container>
                <v-layout row>
                  <v-flex v-for="(item, i) in 4" xs3 mb-3>
                    <v-card>
                      <v-card-text>
                        {{countries[i].name}}
                        <v-checkbox v-bind:label="'آمپاس!!!'" v-model="countries[i].ampaas" dark @change="changeAmpaas(i)"></v-checkbox>
                        <v-select
                          v-bind:items="countries[i].processes"
                          v-model="deleteProcess[i]"
                          item-value="value"
                          label="روند ها"
                          single-line
                          bottom
                        ></v-select>
                        <v-btn fab dark small class="red" @click="deleteProcessFunc(i)">
                          <v-icon>block</v-icon>
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex v-for="(item, i) in 4" xs3>
                    <v-card>
                      <v-card-text>
                        {{countries[4+i].name}}
                        <v-checkbox v-bind:label="'آمپاس!!!'" v-model="countries[4+i].ampaas" dark @change="changeAmpaas(4+i)"></v-checkbox>
                        <v-select
                          v-bind:items="countries[4+i].processes"
                          v-model="deleteProcess[4+i]"
                          label="روند ها"
                          item-value="value"
                          single-line
                          bottom
                        ></v-select>
                        <v-btn fab dark small class="red" @click="deleteProcessFunc(4+i)">
                          <v-icon>block</v-icon>
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions light>
              <v-spacer></v-spacer>
              <v-btn class="blue--text darken-1" flat="flat" @click.native="panelDialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  /* eslint-disable brace-style */

  import barChart from '~/components/barChart'

  export default {
    data () {
      return {
        modalCountryName: '',
        modalAmpaas: false,
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
                min: 0,
                max: 100
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
                min: 0,
                max: 100
              }
            }]
          }
        },
        newIndicator: true,
        saveIndicator: false,
        test: true,
        testValue: -50,
        drawer: null,
        mini: false,
        right: null,
        indicatorNames: ['نیروهای انتظامی و دفاع', 'مالی و اقتصادی', 'سیاست خارجی و دیپلماسی', 'بهداشت و آموزش', 'دادگستری و اطلاعات', 'کشاورزی و صنعت', 'عمران و آبادانی', 'رضایت اجتماعی'],
        countries: [
          {
            name: 'کشور ۱',
            text: 'کشور ۱',
            ampaas: false,
            value: 0,
            chartData:
              {
                labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
                datasets: [
                  {
                    label: 'گروه ۱',
                    backgroundColor: 'grey',
                    data: [1, 2, 3, 4, 5, 6, 10, 20]
                  }
                ]
              },
            processes: []
          },
          {
            name: 'کشور ۲',
            text: 'کشور ۲',
            value: 1,
            ampaas: false,
            chartData:
              {
                labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
                datasets: [
                  {
                    label: 'گروه ۲',
                    backgroundColor: 'blue',
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                  }
                ]
              },
            processes: []
          },
          {
            name: 'کشور ۳',
            text: 'کشور ۳',
            value: 2,
            ampaas: false,
            chartData:
              {
                labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
                datasets: [
                  {
                    label: 'گروه ۳',
                    backgroundColor: 'pink',
                    data: [1, 2, 3, 4, 5, 6, 10, 20]
                  }
                ]
              },
            processes: []
          },
          {
            name: 'کشور ۴',
            text: 'کشور ۴',
            value: 3,
            ampaas: false,
            chartData:
              {
                labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
                datasets: [
                  {
                    label: 'گروه ۴',
                    backgroundColor: 'red',
                    data: [1, 2, 3, 4, 5, 6, 10, 20]
                  }
                ]
              },
            processes: []
          },
          {
            name: 'کشور ۵',
            text: 'کشور ۵',
            value: 4,
            ampaas: false,
            chartData:
              {
                labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
                datasets: [
                  {
                    label: 'گروه ۵',
                    backgroundColor: 'lightgreen',
                    data: [1, 2, 3, 4, 5, 6, 10, 20]
                  }
                ]
              },
            processes: []
          },
          {
            name: 'کشور ۶',
            text: 'کشور ۶',
            value: 5,
            ampaas: false,
            chartData:
              {
                labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
                datasets: [
                  {
                    label: 'گروه ۶',
                    backgroundColor: 'green',
                    data: [1, 2, 3, 4, 5, 6, 10, 20]
                  }
                ]
              },
            processes: []
          },
          {
            name: 'کشور ۷',
            text: 'کشور ۷',
            value: 6,
            ampaas: false,
            chartData:
              {
                labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
                datasets: [
                  {
                    label: 'گروه ۷',
                    backgroundColor: 'yellow',
                    data: [1, 2, 3, 4, 5, 6, 10, 20]
                  }
                ]
              },
            processes: []
          },
          {
            name: 'کشور ۸',
            text: 'کشور ۸',
            value: 7,
            ampaas: false,
            chartData:
              {
                labels: ['نظامی', 'اقتصادی', 'دیپلماسی', 'به-آموز', 'دادگستری', 'صنعت', 'عمران', 'رضایت'],
                datasets: [
                  {
                    label: 'گروه ۸',
                    backgroundColor: 'orange',
                    data: [1, 2, 3, 4, 5, 6, 10, 20]
                  }
                ]
              },
            processes: []
          }
        ],
        processes: [
          {
            text: 'روند ۱',
            value: 0,
            immediate: [0, 1, 2, 3, 4, 5, 6, 7],
            period: 5,
            gradual: [
              {
                value1: 1,
                repeat1: 3,
                value2: 2,
                repeat2: 3
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              }
            ]
          },
          {
            text: 'روند ۲',
            value: 1,
            immediate: [0, -1, -2, -3, -4, -5, -6, -7],
            period: 5,
            gradual: [
              {
                value1: -1,
                repeat1: 3,
                value2: -2,
                repeat2: 5
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              },
              {
                value1: 0,
                repeat1: 0,
                value2: 0,
                repeat2: 0
              }
            ]
          }
        ],
        defaultProcess: {
          text: 'دیفالت',
          value: -1,
          immediate: [0, 0, 0, 0, 0, 0, 0, 0],
          period: 5,
          gradual: [
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            }
          ]
        },
        tmpProcess: {
          text: 'روند ۲',
          value: 1,
          immediate: [0, 0, 0, 0, 0, 0, 0, 0],
          period: 5,
          gradual: [
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            },
            {
              value1: 0,
              repeat1: 0,
              value2: 0,
              repeat2: 0
            }
          ]
        },
        indicatorName: '',
        selectedProcess: -1,
        selectedCountry: 0,
        polling: null,
        update: [{t: false}, {t: false}, {t: false}, {t: false}, {t: false}, {t: false}, {t: false}, {t: false}],
        dialog: false,
        addProcessDialog: false,
        panelDialog: false,
        modalChartData: null,
        updateModal: false,
        deleteProcess: [-1, -1, -1, -1, -1, -1, -1, -1]
      }
    },
    components: {
      barChart
    },
    methods: {
      testFunc: function () {
        this.countries[0].chartData.datasets[0].data[0] += 10
        // this.update = !this.update
        var newobj = this.update
        newobj.k = !newobj.k
        this.update = JSON.parse(JSON.stringify(newobj))
      },
      showModal: function (x) {
        this.modalChartData = this.countries[x].chartData
        this.updateModal = !this.updateModal
        this.modalCountryName = this.countries[x].name
        this.modalAmpaas = this.countries[x].ampaas
        this.dialog = !this.dialog
      },
      addProcess: function () {
        console.log('default process', this.defaultProcess)
        console.log('tmp process', this.tmpProcess)
        this.indicatorName = ''
        this.selectedProcess = -1
        // run in selectedProcess watcher :this.tmpProcess = JSON.parse(JSON.stringify(this.defaultProcess))
        this.selectedCountry = 0
        this.addProcessDialog = true
        console.log('hello')
      },
      saveProcess: async function () {
        var newobj = JSON.parse(JSON.stringify(this.tmpProcess))
        if (this.indicatorName === '') {
          this.$error('نام شاخص جدید را انتخاب نکرده اید')
          return
        }
        newobj.text = this.indicatorName
        newobj.value = this.processes.length
        var fields = {
          obj: newobj
        }
        try {
          newobj = await this.$axios.post('process', fields)
          this.processes.push(newobj)
          this.$success('hey!')
        }
        catch (err) {
          this.$error(err)
        }
        this.addProcessDialog = false
      },
      runAndSaveProcess: async function () {
        var newobj = JSON.parse(JSON.stringify(this.tmpProcess))
        if (this.indicatorName === '') {
          this.$error('نام شاخص جدید را انتخاب نکرده اید')
          return
        }
        newobj.text = this.indicatorName
        newobj.value = this.processes.length
        var fields = {
          obj: newobj
        }
        try {
          newobj = (await this.$axios.post('process', fields)).data
          this.processes.push(newobj)
          this.selectedProcess = newobj.value
          console.log('newobj', newobj)
          this.runProcess(newobj._id)
          this.$success('hey!')
        }
        catch (err) {
          this.$error(err)
        }
      },
      runProcess: async function (prId) {
        const that = this
        console.log('bug', that.countries[that.selectedCountry].chartData)
        for (var i = 0; i < 8; i++) {
          that.countries[that.selectedCountry].chartData.datasets[0].data[i] += that.tmpProcess.immediate[i]
          if (that.countries[that.selectedCountry].chartData.datasets[0].data[i] > 100) {
            that.countries[that.selectedCountry].chartData.datasets[0].data[i] = 100
          } else if (that.countries[that.selectedCountry].chartData.datasets[0].data[i] < 0) {
            that.countries[that.selectedCountry].chartData.datasets[0].data[i] = 0
          }
        }
        this.updateChart(this.selectedCountry)
        const values = that.tmpProcess.gradual
        const index = that.selectedCountry
        var polling = setInterval(function () {
          // gradual changes
          var ended = 0
          for (var i = 0; i < 8; i++) {
            if (values[i].repeat1 > 0) {
              that.countries[index].chartData.datasets[0].data[i] += parseInt(values[i].value1)
              values[i].repeat1 -= 1
              // console.log(that.countries[index].chartData.datasets[0].data[i])
              if (that.countries[index].chartData.datasets[0].data[i] >= 100) {
                that.countries[index].chartData.datasets[0].data[i] = 100
                values[i].repeat1 = 0
              }
              if (that.countries[index].chartData.datasets[0].data[i] <= 0) {
                that.countries[index].chartData.datasets[0].data[i] = 0
                values[i].repeat1 = 0
              }
            } else if (values[i].repeat2 > 0) {
              that.countries[index].chartData.datasets[0].data[i] += parseInt(values[i].value2)
              values[i].repeat2 -= 1
              if (that.countries[index].chartData.datasets[0].data[i] >= 100) {
                that.countries[index].chartData.datasets[0].data[i] = 100
                values[i].repeat2 = 0
              }
              if (that.countries[index].chartData.datasets[0].data[i] <= 0) {
                that.countries[index].chartData.datasets[0].data[i] = 0
                values[i].repeat2 = 0
              }
            } else {
              ended += 1
            }
          }
          that.updateChart(index)

          if (ended === 8) {
            // console.log(ended, 'clear interval')
            console.log(that.countries[index].processes)
            var a
            for (i = 0; i < that.countries[index].processes.length; i++) {
              if (that.countries[index].processes[i].value === polling) {
                a = i
                break
              }
            }
            // var a = that.countries[index].processes.indexOf(polling)
            that.countries[index].processes.splice(a, 1)
            // console.log(that.countries[index].processes)
            clearInterval(polling)
          }
        }, that.tmpProcess.period * 1000)
        let fields = {
          processId: prId,
          polling: polling
        }
        try {
          await this.$axios.post('country/process/' + this.countries[this.selectedCountry]._id, fields)
          this.countries[this.selectedCountry].processes.push({text: this.processes[this.selectedProcess].text, value: polling, id: prId})
          this.$success('hey!')
        }
        catch (err) {
          this.$error(err)
        }

        this.addProcessDialog = false
      },
      updateChart: async function (index) {
        var fields = {
          country: JSON.parse(JSON.stringify(this.countries[index].chartData.datasets[0].data))
        }
        try {
          await this.$axios.put('country/' + this.countries[index]._id, fields)
          this.$success('hey!!!!!!')
        }
        catch (err) {
          this.$error(err, 'k!!!!')
        }
        var obj = this.update[index]
        obj.t = !obj.t
        console.log('bef')
        this.$set(this.update, index, JSON.parse(JSON.stringify(obj)))
        console.log('af')
      },
      deleteProcessFunc: async function (index) {
        var a
        console.log(this.deleteProcess[index])
        for (var i = 0; i < this.countries[index].processes.length; i++) {
          if (this.countries[index].processes[i].value === this.deleteProcess[index]) {
            a = i
            break
          }
        }
        console.log(this.countries[index].processes[a])
        // var a = this.countries[index].processes.indexOf(this.deleteProcess[index])
        var fields = {
          id: this.countries[index].processes[a].id,
          polling: this.countries[index].processes[a].value
        }
        console.log('delete process function:', fields)
        try {
          await this.$axios.put('country/process/' + this.countries[index]._id, fields)
          clearInterval(this.countries[index].processes[a].value)
          this.countries[index].processes.splice(a, 1)
          this.$success('heyy delete')
        }
        catch (err) {
          this.$error(err)
        }
      },
      changeAmpaas: function (x) {
        var data = {
          ampaas: this.countries[x].ampaas
        }
        try {
          this.$axios.put('/country/ampaas/' + this.countries[x]._id, data)
          this.$success('hey!')
        }
        catch (err) {
          this.$error(err)
        }
      }
    },
    watch: {
      selectedProcess: function (val) {
        if (val !== -1) {
          this.tmpProcess = JSON.parse(JSON.stringify(this.processes[val]))
        } else {
          this.tmpProcess = JSON.parse(JSON.stringify(this.defaultProcess))
        }
      },
      newIndicator: function (val) {
        this.tmpProcess = JSON.parse(JSON.stringify(this.defaultProcess))
      }
    },
    mounted: async function () {
      try {
        this.countries = JSON.parse(JSON.stringify((await this.$axios.get('/country')).data))
        console.log(this.countries, 'country')
        for (var i = 0; i < this.countries.length; i++) {
          var obj = this.update[i]
          obj.t = !obj.t
          this.$set(this.update, i, JSON.parse(JSON.stringify(obj)))
        }
        this.$success('Get countries successfully')
      }
      catch (err) {
        this.$error('Err in getting countries')
      }
      try {
        this.processes = JSON.parse(JSON.stringify((await this.$axios.get('/process')).data))
        console.log(this.processes, 'processes')
        this.$success('Get processes successfully')
      }
      catch (err) {
        this.$error('Err in getting processes')
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

  .checkbox label {
    right: 8px;
  }
</style>
