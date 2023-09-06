import echarts from "echarts/types/dist/echarts"

//派单城市
export const getCityOption = (data1, data2, citys) => {
  function setMarkPoint() {
    let markData: any = []
    data1.map((item, index) => {
      data2.map((it, i) => {
        if (index == i && item >= data2[index]) {
          markData.push({
            value: "",
            xAxis: item,
            yAxis: index,
            symbolSize: 0.000001,
            symbolOffset: [0, '50%'],
            label: {
              formatter: '爆单',
              backgroundColor: '#E66037',
              borderRadius: 4,
              padding: [2, 3],
              height: 12,
              position: 'right',
              distance: 20,
              align: 'center',
              color: '#fff',
              fontSize: 10,
            },
          })
        }
      })
    })
    return markData
  }
  return {
    legend: {
      data: ['目标', '达成'],
      top: '-1%',
      left: '1.5%',
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        fontSize: 12,//字体大小
        color: 'rgba(211,231,255,.8)'//字体颜色
      }
    },
    xAxis: {
      // type: 'value',
      type: 'log',
      min: 1,
      logBase: 2,
      show: false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
      axisTick: { show: false },// 不显示坐标轴刻度线
      axisLine: { show: false, },// 不显示坐标轴线
      axisLabel: { show: false, },// 不显示坐标轴上的文字
      splitLine: { show: false },// 不显示网格线
    },
    yAxis: {
      type: 'category',
      axisTick: { show: false },// 不显示坐标轴刻度线
      axisLine: { show: false, },// 不显示坐标轴线
      axisLabel: {
        show: true,
        textStyle: {
          color: 'rgba(211, 231, 255, 0.6)',  //更改坐标轴文字颜色
          fontSize: 12      //更改坐标轴文字大小
        }
      },
      data: citys,
    },
    color: ['#37C9E6', 'rgba(55,201,230,0.25)'],
    grid: {
      left: 10,
      right: 25,
      top: 20,//拉伸距离顶部高度
      bottom: 10,//拉伸距离底部高度
      containLabel: true
    },
    series: [
      {
        name: '达成',
        data: data1,
        type: 'bar',
        barWidth: 10,
        barMinHeight: 6,
        itemStyle: {
          color: '#37C9E6',
          normal: {
            // 柱形图圆角，初始化效果
            barBorderRadius: [2, 2, 2, 2]
          }
        },
        label: {
          show: true,
          position: ['90%', '150%'],
          fontSize: 10,
          color: '#D3E7FF',
        },
        markPoint: {
          data: setMarkPoint()
        }
      },
      {
        name: '目标',
        data: data2,
        type: 'bar',
        barWidth: 10,
        barMinHeight: 6,
        itemStyle: {
          normal: {
            // 柱形图圆角，初始化效果
            barBorderRadius: [3, 3, 3, 3]
          }
        },
        label: {
          show: true,
          position: ['90%', '150%'],
          color: 'rgba(211,231,255,.6)',
          fontSize: 10
        },
        barGap: '-100%',//移动第二个柱子的位置实现重叠
        z: '-1',//改变这根柱子的层级使这根柱子在下面
      }
    ]
  }
}

export const getCityOption2 = () => {
  var xAxisData: any = [];
  var data1: any = [];
  for (var i = 0; i < 100; i++) {
    xAxisData.push('A' + i);
    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i) * 5);
  }
  return {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['偏移量']
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLabel: { show: false, },// 不显示坐标轴上的文字
        splitLine: { show: false },// 不显示网格线
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '偏移量',
        type: 'bar',
        data: data1,
        markLine: {
          data: [
            { type: 'average', name: 'Avg' },
            { type: 'median', name: 'Med' }
          ]
        }
      }
    ]
  }
}

export const getCityOption3 = (data1, data2, names) => {
  function setMarkPoint() {
    let markData: any = []
    names.map((item, index) => {
      if (item == '用户组(后端)') {
        markData.push({ name: '', value: item, xAxis: index, yAxis: data1[index] })
      }
    })
    console.log(markData);
    return markData
  }
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#fff'
        }
      }
    },
    legend: {
      data: ['负载率', '工时']
    },
    xAxis: [
      {
        type: 'category',
        data: names,
        axisPointer: {
          type: 'shadow'
        },
        axisTick: { show: false },// 不显示坐标轴刻度线
        axisLine: { show: false, },// 不显示坐标轴线
        axisLabel: { show: false, },// 不显示坐标轴上的文字
        splitLine: { show: false },// 不显示网格线
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '负载率',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} ml'
        },
        splitLine: { show: false },// 不显示网格线
      },
      {
        type: 'value',
        name: '工时',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} °C'
        },
      }
    ],
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        name: '负载率',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        markPoint: {
          data: setMarkPoint()
        },
        markLine: {
          data: [
            { type: 'average', name: '' }
          ]
        },
        itemStyle: {
          normal: {
            color: function () { return "#" + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16); }
          },
        },
        data: data1
      },
      {
        name: '工时',
        type: 'line',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' °C';
          }
        },
        markLine: {
          data: [
            { type: 'average', name: '' }
          ]
        },
        data: data2
      }
    ]
  };

}