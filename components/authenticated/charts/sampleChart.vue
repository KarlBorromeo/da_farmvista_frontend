<template>
  <div>
    <apexchart id="bar" type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [{
        name: 'sales',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
      }],
      chartOptions: {
        chart: {
          type: 'bar'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      }
    };
  }
};
</script>

<style scoped>
#bar{
    width: 80vw;
}
</style>