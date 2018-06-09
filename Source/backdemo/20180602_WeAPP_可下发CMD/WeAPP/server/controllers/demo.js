const { mysql } = require('../qcloud')


async function recv_data(ctx) {
  let Sql_flag = ctx.query.Sql_flag
 // ctx.state.data =Sql_flag
  if (Sql_flag == "INSTER") {
    let OpenId = ctx.query.OpenId
    let UserInfo = ctx.query.Userinfo
    let DeviceNum = ctx.query.DevNum
    let DevKey = ctx.query.DevKey

    var newdev = {
      DeviceNum: DeviceNum,
      DeviceKey: DevKey,
      OpenId: OpenId,
      userinfo: UserInfo
    }
    await mysql("UserDev").insert(newdev)
    // 查
    // var res = await mysql("UserDev").where({ id }).first()
    //var res = await mysql('UserDev').where({
    //  id: '2',
    //}).first()
    // 改
    //  await mysql("Book").update({ price: 66 }).where({ id })
    // 删
    //await mysql("Book").del().where({ id })
    ctx.state.data = "Inster success"
  } else if (Sql_flag == "SELE") {

    let OpenId = ctx.query.OpenId
    var res = await mysql('UserDev').where({
      OpenId: OpenId,
    }).first()
    // 改
    //  await mysql("Book").update({ price: 66 }).where({ id })
    // 删
    //await mysql("Book").del().where({ id })
    ctx.state.data = res
  } else if (Sql_flag == "DEL"){
    let OpenId = ctx.query.OpenId
    let UserInfo = ctx.query.Userinfo
    let DeviceNum = ctx.query.DevNum
    let DevKey = ctx.query.DevKey
    await mysql("UserDev").del().where({ OpenId,DeviceNum })
    ctx.state.data = "Del success"

  }else{
    ctx.state.data = "sql fail" + ctx.query.Sql_flag
  }
}
async function Partest(ctx){
  let Sql_flag = ctx.query.Sql_flag
  let OpenId = ctx.query.OpenId
  let UserInfo = ctx.query.Userinfo
  let DeviceNum = ctx.query.DevNum
  let DevKey = ctx.query.DevKey
  var st = "INSTER"
  if(Sql_flag === st){
    ctx.state.data = "===="+Sql_flag + "  " + OpenId + "  " + UserInfo + "  " + DeviceNum + "  " + DevKey
  }else{
    ctx.state.data = Sql_flag + "  " + OpenId + "  " + UserInfo + "  " + DeviceNum + "  " + DevKey
  }
 

} 

module.exports = {
  recv_data,
  Partest


}