<template>
    <div class="container mt-5">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Month</th>
                <th scope="col">Pending</th>
                <th scope="col">Success</th>
                <th scope="col">Revenue</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">January</th>
                    <td>{{ jan.pending }}</td>
                    <td>{{ jan.success }}</td>
                    <td>{{ jan.revenue }}</td>
                </tr>
                <tr>
                    <th scope="row">February</th>
                    <td>{{ feb.pending }}</td>
                    <td>{{ feb.success }}</td>
                    <td>{{ feb.revenue }}</td>
                </tr>
                <tr>
                    <th scope="row">March</th>
                    <td>{{ mar.pending }}</td>
                    <td>{{ mar.success }}</td>
                    <td>{{ mar.revenue }}</td>
                </tr>
                <tr>
                    <th scope="row">April</th>
                    <td>{{ apr.pending }}</td>
                    <td>{{ apr.success }}</td>
                    <td>{{ apr.revenue }}</td>
                </tr>
                <tr>
                    <th scope="row">Mei</th>
                    <td>{{ mei.pending }}</td>
                    <td>{{ mei.success }}</td>
                    <td>{{ mei.revenue }}</td>
                </tr>
                <tr>
                    <th scope="row">June</th>
                    <td>{{ jun.pending }}</td>
                    <td>{{ jun.success }}</td>
                    <td>{{ jun.revenue }}</td>
                </tr>
                <tr>
                    <th scope="row">July</th>
                    <td>{{ jul.pending }}</td>
                    <td>{{ jul.success }}</td>
                    <td>{{ jul.revenue }}</td>
                </tr>
                <tr>
                    <th scope="row">August</th>
                    <td>{{ aug.pending }}</td>
                    <td>{{ aug.success }}</td>
                    <td>{{ aug.revenue }}</td>
                </tr>
                <tr>
                    <th scope="row">September</th>
                    <td>{{ sep.pending }}</td>
                    <td>{{ sep.success }}</td>
                    <td>{{ sep.revenue }}</td>
                </tr>
                <tr>
                    <th scope="row">October</th>
                    <td>{{ oct.pending }}</td>
                    <td>{{ oct.success }}</td>
                    <td>{{ oct.revenue }}</td>
                </tr>
                <tr>
                    <th scope="row">November</th>
                    <td>{{ nov.pending }}</td>
                    <td>{{ nov.success }}</td>
                    <td>{{ nov.revenue }}</td>
                </tr>
                <tr>
                    <th scope="row">December</th>
                    <td>{{ dec.pending }}</td>
                    <td>{{ dec.success }}</td>
                    <td>{{ dec.revenue }}</td>
                </tr>
            </tbody>
        </table>
        <p style="color:red">*revenue = total from (amount/transaction) - (tax/transaction(10%)) </p>
    </div>
</template>

<script>
import axios from '@/api/server.js'
export default {
    name: 'dashboard-revenue',
    data () {
        return {
            transactions: [],
            jan: {
                pending: 0,
                success: 0,
                revenue: 0
            },
            feb: {
                pending: 0,
                success: 0,
                revenue: 0
            },
            mar: {
                pending: 0,
                success: 0,
                revenue: 0
            },
            apr: {
                pending: 0,
                success: 0,
                revenue: 0
            },
            mei: {
                pending: 0,
                success: 0,
                revenue: 0
            },
            jun: {
                pending: 0,
                success: 0,
                revenue: 0
            },
            jul: {
                pending: 0,
                success: 0,
                revenue: 0
            },
            aug: {
                pending: 0,
                success: 0,
                revenue: 0
            },
            sep: {
                pending: 0,
                success: 0,
                revenue: 0
            },
            oct: {
                pending: 0,
                success: 0,
                revenue: 0
            },
            nov: {
                pending: 0,
                success: 0,
                revenue: 0
            },
            dec: {
                pending: 0,
                success: 0,
                revenue: 0
            },

        }
    },
    created () {
        let token = localStorage.getItem('token')
        axios.get('/transaction', { headers: { token } })
          .then(({ data }) => {
              this.transactions = data
              let pph 
              data.forEach(el => {
                  if(el.date == 1){
                      if(el.status == 'Pending'){
                          this.jan.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.jan.success ++
                          this.jan.revenue += el.amount - pph
                      }
                  }if(el.date == 2){
                      if(el.status == 'Pending'){
                          this.feb.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.feb.success ++
                          this.feb.revenue += el.amount - pph
                      }
                  }if(el.date == 3){
                      if(el.status == 'Pending'){
                          this.mar.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.mar.success ++
                          this.mar.revenue += el.amount - pph
                      }
                  }if(el.date == 4){
                      if(el.status == 'Pending'){
                          this.apr.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.apr.success ++
                          this.apr.revenue += el.amount - pph
                      }
                  }if(el.date == 5){
                      if(el.status == 'Pending'){
                          this.mei.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.mei.success ++
                          this.mei.revenue += el.amount - pph
                      }
                  }if(el.date == 6){
                      if(el.status == 'Pending'){
                          this.jun.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.jun.success ++
                          this.jun.revenue += el.amount - pph
                      }
                  }if(el.date == 7){
                      if(el.status == 'Pending'){
                          this.jul.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.jul.success ++
                          this.jul.revenue += el.amount - pph
                      }
                  }if(el.date == 8){
                      if(el.status == 'Pending'){
                          this.aug.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.aug.success ++
                          this.aug.revenue += el.amount - pph
                      }
                  }if(el.date == 9){
                      if(el.status == 'Pending'){
                          this.sep.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.sep.success ++
                          this.sep.revenue += el.amount - pph
                      }
                  }if(el.date == 10){
                      if(el.status == 'Pending'){
                          this.oct.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.oct.success ++
                          this.oct.revenue += el.amount - pph
                      }
                  }if(el.date == 11){
                      if(el.status == 'Pending'){
                          this.sep.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.sep.success ++
                          this.sep.revenue += el.amount - pph
                      }
                  }
                  if(el.date == 12){
                      if(el.status == 'Pending'){
                          this.dec.pending ++
                      }else if (el.status == 'Success'){
                          pph = (el.amount * 10) / 100
                          this.dec.success ++
                          this.dec.revenue += el.amount - pph
                      }
                  }
              })
          })
          .catch(err =>{
              console.log(err)
          })
    },
}
</script>

<style scoped>
.container {
    background-color: aliceblue
}
</style>
